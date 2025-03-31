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

  const session = await auth();
  if (!session || !session.access_token) {
    throw new Error("Unauthorized");
  }

  const headers = {
    Authorization: `Bearer ${session.access_token}`,
    "X-Refresh-Token": session.refresh_token,
  };

  const response = await fetch(`${domain}/wrapped/${leagueKey}`, {
    headers,
    cache: "no-cache", // TODO: Maybe remove
  });

  if (!response.ok) throw new Error("HTTP status " + response.status);
  const encoder = new TextEncoder();
  const reader = response.body.getReader();
  const stream = new ReadableStream({
    async start(controller) {
      console.log("START", response.body);
      let buffer = "";

      async function push() {
        const { done, value } = await reader.read();
        if (done) {
          controller.close();
          return;
        }
        buffer += new TextDecoder().decode(value);
        console.log("Buffer:", buffer);

        if (buffer.endsWith("\n")) {
          controller.enqueue(encoder.encode(`data: ${buffer}\n\n`));
          buffer = "";
        }

        // Convert backend data to SSE format
        // console.log("SSE Data:", value.byteLength);
        // const sseData = `data: ${new TextDecoder().decode(value)}\n\n`;
        // console.log("SSE Data:", sseData);

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
