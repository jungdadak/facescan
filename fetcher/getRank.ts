export interface RankItem {
  userId: string;
  name: string;
  photoPath: string;
  overallRank: number;
}

export async function getRank(): Promise<RankItem[]> {
  try {
    const res = await fetch("/api/rank");
    if (!res.ok) throw new Error("랭킹 조회 실패");
    return await res.json();
  } catch (error) {
    console.error("getRank error:", error);
    return [];
  }
}
