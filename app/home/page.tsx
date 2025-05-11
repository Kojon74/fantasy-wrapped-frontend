import UserHomeContent from "./UserHomeContent";
import xml2js from "xml2js";
import { Game } from "./types";
import { auth } from "@/auth";

const cleanGames = (games: any[]) =>
  games
    .map(
      (game) =>
        Object.fromEntries(
          Object.entries(game)
            .map(([key, value]) => [
              key,
              key !== "leagues" ? value[0] : cleanLeagues(value[0].league),
            ])
            .sort((a, b) => parseInt(b.season) - parseInt(a.season))
        ) as Game
    )
    .reverse();

const cleanLeagues = (leagues: any[]) =>
  leagues.map((league) =>
    Object.fromEntries(
      Object.entries(league).map(([key, value]) => [key, value[0]])
    )
  );

export default async function UserHomePage() {
  const session = await auth();

  if (!session || !session.access_token) return <p>Not logged in</p>;

  try {
    const fantasyLeaguesEndpoint =
      "https://fantasysports.yahooapis.com/fantasy/v2/users;use_login=1/games;game_codes=nhl/leagues/";
    const response = await fetch(fantasyLeaguesEndpoint, {
      headers: {
        Authorization: `Bearer ${session.access_token}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      console.log(response);

      throw new Error("Failed to fetch leagues");
    }
    const xml = await response.text();
    const parsedXml = await xml2js.parseStringPromise(xml);
    const gamesRaw = parsedXml.fantasy_content.users[0].user[0].games[0].game;
    const games = cleanGames(gamesRaw);
    console.log(
      "Games:",
      games.map((game) => game.leagues)
    );

    return <UserHomeContent games={games} />;
  } catch (error) {
    return <p>Error loading leagues {error.message}</p>;
  }
}
