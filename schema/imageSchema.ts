import { z } from "zod";

export const imageSchema = z
  .instanceof(File)
  .refine((file) => file.type.startsWith("image/"), {
    message: "이미지 파일만 업로드 가능합니다.",
  })
  .refine((file) => file.size <= 5 * 1024 * 1024, {
    message: "파일 크기는 5MB를 초과할 수 없습니다.",
  });
