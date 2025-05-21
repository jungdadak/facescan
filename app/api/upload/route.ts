import { BE_URL } from "@/constants/env";

export async function PATCH(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("image");

    if (!(file instanceof File)) {
      return new Response("file이 없습니다", { status: 400 });
    }

    const backendRes = await fetch(`${BE_URL}/face`, {
      method: "PATCH",
      body: formData,
    });

    if (!backendRes.ok) {
      const text = await backendRes.text();
      return new Response(text, { status: backendRes.status });
    }

    const data = await backendRes.json();
    return Response.json(data);
  } catch (err) {
    console.error("upload proxy error:", err);
    return new Response("업로드 실패", { status: 500 });
  }
}
