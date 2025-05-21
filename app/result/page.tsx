"use client";

import { useEffect } from "react";

import Image from "next/image";
import { useRouter } from "next/navigation";

import MainBtn from "@/components/btn/MainBtn";
import { useImageStore } from "@/store/imageStore";
import { useUserStore } from "@/store/userStore";

const scoreList = {
  happiness: "☺️ 행복지수",
  fatigue: "😟 피로지수",
  depression: "😢 우울지수",
} as const;

export default function Result() {
  const router = useRouter();
  const imageUrl = useImageStore((s) => s.imageUrl);
  const clearImageUrl = useImageStore((s) => s.clearImageUrl);

  const nickname = useUserStore((s) => s.nickname);
  const scores = useUserStore((s) => s.detailAnalysis?.scores);

  useEffect(() => {
    if (!imageUrl || !scores) {
      router.push("/");
    }
  }, [imageUrl, scores, router]);

  if (!imageUrl || !scores) return null;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <img
        src="/bg/sub.png"
        alt="배경2"
        className="absolute inset-0 -z-10 mx-auto h-full min-h-[813px] w-full object-cover md:max-w-xl"
      />
      <h1 className="mx-auto mt-3 w-[304px] text-center text-[28px] leading-[39.2px] font-bold tracking-[-0.56px] md:mt-16">
        나의 행복 랭킹은 {scores.happiness.rank}위!
      </h1>

      <section className="mx-auto mt-[26px] flex min-h-[440px] w-[304px] flex-col items-center rounded-4xl border-2 border-white/10 bg-white/10 px-6 pt-9 pb-8">
        <div className="relative aspect-square h-36 w-36 overflow-hidden rounded-full">
          <Image
            src={imageUrl}
            alt={"분석이미지"}
            fill
            className="object-cover"
          />
        </div>

        <h2 className="mt-5 text-2xl leading-[33.6px] font-semibold">
          {nickname}
        </h2>

        <hr className="mt-5 w-full border-t-2 border-white/20" />
        <div className="mt-6 flex w-full flex-col items-center justify-center gap-[14px]">
          {Object.entries(scoreList).map(([key, label]) => {
            const [emoji, ...rest] = label.split(" ");
            const text = rest.join(" ");

            return (
              <div
                key={key}
                className="mb-2 flex w-full items-center justify-between text-white/90"
              >
                {/* 이모지만 크게, 텍스트는 기본 크기 */}
                <span className="flex items-center">
                  <span className="mr-2 text-2xl">{emoji}</span>
                  <span className="text-base font-semibold">{text}</span>
                </span>

                <div className="flex items-center justify-center gap-2.5">
                  <span className="text-base font-semibold">
                    {scores?.[key as keyof typeof scores].uiValue}점
                  </span>
                  <span className="flex h-7 w-[35px] items-center justify-center rounded-[10px] bg-[#9562FF] pr-0.5 text-sm leading-[19.6px] tracking-[-0.28px]">
                    {scores?.[key as keyof typeof scores].rank}위
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <MainBtn
        onClick={() => {
          clearImageUrl();
          router.push("/");
        }}
        className={"mt-10"}
      >
        다시 도전하기
      </MainBtn>
    </main>
  );
}
