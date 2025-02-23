import NextAuth, { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
  debug: true,
  // Configure one or more authentication providers
  providers: [
    {
      id: "yahoo",
      name: "Yahoo",
      type: "oauth",
      clientId: process.env.YAHOO_CONSUMER_KEY,
      clientSecret: process.env.YAHOO_CONSUMER_SECRET,
      wellKnown: "https://api.login.yahoo.com/.well-known/openid-configuration",
      authorization: {
        params: {
          client_id: process.env.YAHOO_CONSUMER_KEY,
          redirect_uri: process.env.REDIRECT_URI,
          response_type: "code",
        },
      },
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };
      },
      idToken: true,
      client: {
        authorization_signed_response_alg: "ES256",
        id_token_signed_response_alg: "ES256",
      },
    },
  ],
  callbacks: {
    async session({ session, token }) {
      // Send properties to the client, like an access_token and user id from a provider.
      (session as any).access_token = token.access_token;
      (session as any).refresh_token = token.refresh_token;

      return session;
    },
    async jwt({ account, token }) {
      if (account) {
        // First-time login, save the `access_token`, its expiry and the `refresh_token`
        return {
          ...token,
          access_token: account.access_token,
          refresh_token: account.refresh_token,
          expires_at: Date.now() + account.expires_in * 1000,
        };
      } else if (Date.now() < token.expires_at) {
        // Subsequent logins, but the `access_token` is still valid
        return token;
      } else {
        // Subsequent logins, but the `access_token` has expired, try to refresh it
        if (!token.refresh_token) throw new TypeError("Missing refresh_token");

        try {
          // The `token_endpoint` can be found in the provider's documentation. Or if they support OIDC,
          // at their `/.well-known/openid-configuration` endpoint.
          // i.e. https://accounts.google.com/.well-known/openid-configuration
          const response = await fetch(
            "https://api.login.yahoo.com/oauth2/get_token",
            {
              method: "POST",
              body: new URLSearchParams({
                client_id: process.env.YAHOO_CONSUMER_KEY!,
                client_secret: process.env.YAHOO_CONSUMER_SECRET!,
                grant_type: "refresh_token",
                refresh_token: token.refresh_token! as string,
              }),
            }
          );

          const tokensOrError = await response.json();

          if (!response.ok) throw tokensOrError;

          const newTokens = tokensOrError as {
            access_token: string;
            expires_in: number;
            refresh_token?: string;
          };

          return {
            ...token,
            access_token: newTokens.access_token,
            expires_at: Date.now() + newTokens.expires_in * 1000,
            // Some providers only issue refresh tokens once, so preserve if we did not get a new one
            refresh_token: newTokens.refresh_token
              ? newTokens.refresh_token
              : token.refresh_token,
          };
        } catch (error) {
          console.error("Error refreshing access_token", error);
          // If we fail to refresh the token, return an error so we can handle it on the page
          token.error = "RefreshTokenError";
          return token;
        }
      }
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
