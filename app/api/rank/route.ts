import { BE_URL } from "@/constants/env";

export async function GET() {
  try {
    console.log(`${BE_URL}/face/ranking`);

    const res = await fetch(`${BE_URL}/face/ranking`);

    if (!res.ok) {
      const text = await res.text();
      return new Response(text, { status: res.status });
    }

    const data = await res.json();
    return Response.json(data);
  } catch (err) {
    console.error("rank proxy error:", err);
    return new Response("백엔드 통신 실패", { status: 500 });
  }
}
