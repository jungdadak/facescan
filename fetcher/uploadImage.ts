export const BE_URL = process.env.NEXT_PUBLIC_BE_URL || "http://localhost:8080";

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
    formData.append("file", image);

    const res = await fetch(BE_URL + "/face", {
      method: "PATCH",
      body: formData,
    });

    if (!res.ok) {
      throw new Error("Upload failed");
    }

    return await res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}
