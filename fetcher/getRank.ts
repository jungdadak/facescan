export interface RankItem {
  userId: string;
  name: string;
  photoPath: string;
  overallRank: number;
}

export async function getRank(): Promise<RankItem[]> {
  try {
    const res = await fetch("/face/ranking");
    if (!res.ok) {
      throw new Error("랭킹 데이터를 불러오지 못했습니다");
    }
    return await res.json();
  } catch (error) {
    console.error("getRanking error:", error);
    return [];
  }
}
