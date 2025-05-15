import { auth } from "@/auth";
import { NextRequest } from "next/server";

export const runtime = "edge"; // 'nodejs' is the default
export const dynamic = "force-dynamic";

const local = false;
const domain = local
  ? "http://localhost:8000"
  : "https://fantasy-warped-production.up.railway.app";

export async function GET( // TODO: Change to arrow
  req: NextRequest,
  { params }: { params: { leagueKey: string } }
) {
  const leagueKey = params.leagueKey;
  let response;

  if (leagueKey === "demo") {
    const demoLeagueKey = "427.l.97108";
    response = await fetch(`${domain}/wrapped/${demoLeagueKey}`, {
      cache: "no-cache", // Required, caching causes buffering
    });
  } else {
    const session = await auth();
    if (!session || !session.access_token) {
      throw new Error("Unauthorized");
    }

    const headers = {
      Authorization: `Bearer ${session.access_token}`,
      "X-Refresh-Token": session.refresh_token,
    };

    response = await fetch(`${domain}/wrapped/${leagueKey}`, {
      headers,
      cache: "no-cache", // Required, caching causes buffering
    });
  }

  if (!response.ok) throw new Error("HTTP status " + response.status);
  const encoder = new TextEncoder();
  const reader = response.body.getReader();
  const stream = new ReadableStream({
    async start(controller) {
      let buffer = "";

      async function push() {
        const { done, value } = await reader.read();
        if (done) {
          controller.close();
          return;
        }
        buffer += new TextDecoder().decode(value);
        if (buffer.endsWith("\n")) {
          controller.enqueue(encoder.encode(`data: ${buffer}\n\n`));
          buffer = "";
        }
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
