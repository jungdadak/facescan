export interface IEmotionScoreDetail {
  value: number;
  uiValue: number;
  rank: number;
}

export interface IUserFullDetailAnalysis {
  userId: string;
  name: string;
  analyzedPhotoPath: string;
  analyzedAt: string;
  overallRank: number;
  scores: {
    happiness: IEmotionScoreDetail;
    fatigue: IEmotionScoreDetail;
    depression: IEmotionScoreDetail;
  };
  similarity?: number;
}

export interface IFaceProcessingResult {
  detailAnalysis: IUserFullDetailAnalysis;
  nickname: string;
  similarity: number;
}

export async function uploadImage(
  image: File,
): Promise<IFaceProcessingResult | null> {
  try {
    const formData = new FormData();
    formData.append("image", image);

    const res = await fetch("/api/upload", {
      method: "PATCH",
      body: formData,
    });

    if (!res.ok) throw new Error("업로드 실패");

    return await res.json();
  } catch (error) {
    console.error("uploadImage error:", error);
    return null;
  }
}
