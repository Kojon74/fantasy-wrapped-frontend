import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function GET( // TODO: Change to arrow
  req: NextRequest,
  { params }: { params: { leagueKey: string } }
) {
  const leagueKey = params.leagueKey;

  const session = await getServerSession(authOptions);
  if (!session || !session.access_token) {
    throw new Error("Unauthorized");
  }

  const headers = {
    Authorization: `Bearer ${session.access_token}`,
    "X-Refresh-Token": session.refresh_token,
  };

  const response = await fetch(`http://127.0.0.1:8000/wrapped/${leagueKey}`, {
    headers,
    cache: "no-cache", // TODO: Maybe remove
  });

  if (!response.ok) throw new Error("HTTP status " + response.status);
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const reader = response.body.getReader();

      async function push() {
        const { done, value } = await reader.read();
        if (done) {
          controller.close();
          return;
        }

        // Convert backend data to SSE format
        const sseData = `data: ${new TextDecoder().decode(value)}\n\n`;
        controller.enqueue(encoder.encode(sseData));

        push(); // Continue reading the stream
      }

      push(); // Start reading from backend stream
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "Transfer-Encoding": "chunked", // Important for streaming
    },
  });
}
