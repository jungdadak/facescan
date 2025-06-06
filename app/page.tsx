"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { Loader2, X } from "lucide-react";

import { RankTable } from "@/components/RankTable";
import MainBtn from "@/components/btn/MainBtn";
import { RankItem, getRank } from "@/fetcher/getRank";
import { uploadImage } from "@/fetcher/uploadImage";
import { cn } from "@/lib/cnUtil";
import { useImageStore } from "@/store/imageStore";
import { useUserStore } from "@/store/userStore";

export default function Home() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const [step, setStep] = useState<"intro" | "upload">("intro");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [ranking, setRanking] = useState<RankItem[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [disabled, setDisabled] = useState<boolean>(false);

  const { setImageUrl, clearImageUrl, imageUrl } = useImageStore();
  const { setUserResult, clearUser } = useUserStore();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const result = await getRank();
        setRanking(result);
      } catch (e) {
        console.error(e);
        setRanking([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const showIcon = ranking === null || ranking.length === 0;

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
    setDisabled(true);
    if (!imageFile) {
      setDisabled(false);
      return;
    }
    clearUser();

    if (process.env.NODE_ENV !== "development") {
      const result = await uploadImage(imageFile);

      if (result) {
        setUserResult(result);
        router.push("/loading");
      } else {
        alert("분석 실패");
        setDisabled(false);
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
        className="absolute inset-0 -z-10 mx-auto h-full w-full object-cover"
        loading="eager"
        fetchPriority="high"
      />
      <h1
        className={`mx-auto mt-5 h-[78px] w-[304px] text-center text-[28px] leading-[39.2px] font-bold tracking-[-0.56px] md:mt-[115px]`}
      >
        {imageUrl ? "" : stepConfig[step].message}
      </h1>
      <figure
        className={cn(
          "mx-auto mt-16 flex min-h-[280px] min-w-[234px] items-center justify-center rounded-4xl border-2 border-white/10 bg-white/5 backdrop-blur-2xl",

          step === "upload" && "invisible",
          !showIcon && "h-auto min-h-auto w-[304px] py-8",
        )}
        aria-labelledby="question-caption"
      >
        {showIcon ? (
          <>
            <Image
              src={"/icon/question.png"}
              alt=""
              width={126}
              height={140}
              className={cn("", loading && "animate-pulse")}
            />
            <figcaption id="question-caption" className="sr-only">
              귀여운 물음표 아이콘
            </figcaption>
          </>
        ) : (
          <RankTable data={ranking!} />
        )}
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
            "absolute bottom-0 mx-auto mt-16 flex w-full max-w-xl flex-col justify-center rounded-t-4xl border-t-2 border-white/10 bg-white/10"
          }
        >
          {/*상단 x 확인 버튼섹션*/}
          <div className="flex w-full items-center justify-between p-3">
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
              disabled={disabled}
              className={
                "rounded-sm p-2 text-lg font-semibold hover:cursor-pointer hover:bg-white/20"
              }
            >
              {disabled ? <Loader2 className={"animate-spin"} /> : "확인"}
            </button>
          </div>
          {/*사용자 이미지 섹션*/}
          <Image
            src={imageUrl}
            alt="preview"
            width={500}
            height={300}
            className="-ml-[1px] block w-[calc(100%+2px)] bg-black object-contain"
          />
        </div>
      )}
    </main>
  );
}
