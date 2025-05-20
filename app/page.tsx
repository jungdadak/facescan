"use client";

import { ChangeEvent, useRef, useState } from "react";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { X } from "lucide-react";

import MainBtn from "@/components/btn/MainBtn";
import { uploadImage } from "@/fetcher/uploadImage";
import { cn } from "@/lib/cnUtil";
import { useImageStore } from "@/store/imageStore";
import { useUserStore } from "@/store/userStore";

export default function Home() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const [step, setStep] = useState<"intro" | "upload">("intro");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const { setImageUrl, clearImageUrl, imageUrl } = useImageStore();
  const { setUserResult, clearUser } = useUserStore();
  const stepConfig = {
    intro: {
      message: (
        <>
          나의 표정으로
          <br />
          감정을 분석하고 싶다면?
        </>
      ),
    },
    upload: {
      message: "이미지를 선택해주세요",
    },
  } as const;

  const handleInputOpen = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.click();
    }
    clearImageUrl();
    setStep("upload");
  };

  const handleFileChanged = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      setStep("intro");
      return;
    }

    setImageFile(file);

    const blob = URL.createObjectURL(file);
    setImageUrl(blob);
    setStep("upload");
  };

  const handleCheckWhoYR = async () => {
    if (!imageFile) return;
    clearUser();

    if (process.env.NODE_ENV !== "development") {
      const result = await uploadImage(imageFile);

      if (result) {
        setUserResult(result);
        router.push("/loading");
      } else {
        alert("분석 실패");
      }
    } else {
      setUserResult({
        nickname: "이주빈",
        similarity: 99,
        detailAnalysis: {
          userId: "zubin",
          name: "이주빈",
          analyzedPhotoPath: "/zubin.webp",
          analyzedAt: new Date().toISOString(),
          overallRank: 1,
          scores: {
            happiness: { value: 90, uiValue: 90, rank: 1 },
            fatigue: { value: 5, uiValue: 5, rank: 10 },
            depression: { value: 2, uiValue: 2, rank: 20 },
          },
        },
      });
      router.push("/loading");
    }
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center">
      <img
        src="/bg/main.png"
        alt=""
        className="absolute inset-0 -z-10 mx-auto h-full max-w-xl object-contain"
      />
      <h1
        className={`mx-auto mt-[115px] h-[78px] w-[304px] text-center text-[28px] leading-[39.2px] font-bold tracking-[-0.56px]`}
      >
        {stepConfig[step].message}
      </h1>
      <figure
        className={cn(
          "mx-auto mt-16 flex h-[280px] w-[234px] items-center justify-center rounded-4xl border-2 border-white/10 bg-white/10",
          imageUrl && "invisible",
        )}
        aria-labelledby="question-caption"
      >
        <Image src={"/icon/question.png"} alt={""} width={126} height={140} />
        <figcaption id="question-caption" className="sr-only">
          귀여운 물음표 아이콘
        </figcaption>
      </figure>

      <MainBtn onClick={handleInputOpen}>나도 참여하기</MainBtn>

      <input
        ref={inputRef}
        type={"file"}
        accept="image/*"
        className={"hidden"}
        onChange={(e) => handleFileChanged(e)}
      />

      {imageUrl && (
        <div
          className={
            "absolute bottom-0 mx-auto mt-16 flex w-full max-w-[437px] flex-col justify-center rounded-t-4xl border-2 border-white/10 bg-white/10 pb-12"
          }
        >
          {/*상단 x 확인 버튼섹션*/}
          <div className="flex w-full items-center justify-between p-6">
            <X
              size={32}
              onClick={() => {
                setStep("intro");
                clearImageUrl();
              }}
              className={"rounded-full hover:cursor-pointer hover:bg-white/20"}
            />
            <button
              type={"button"}
              onClick={handleCheckWhoYR}
              className={
                "rounded-sm p-2 text-lg font-medium hover:cursor-pointer hover:bg-white/20"
              }
            >
              확인
            </button>
          </div>
          {/*사용자 이미지 섹션*/}
          <Image
            src={imageUrl}
            alt="preview"
            width={400}
            height={300}
            className="max-h-[80%] min-h-[50%] w-full object-cover"
          />
        </div>
      )}
    </main>
  );
}
