"use client";

import { useEffect } from "react";

import Image from "next/image";
import { useRouter } from "next/navigation";

import MainBtn from "@/components/btn/MainBtn";
import { cn } from "@/lib/cnUtil";
import { useImageStore } from "@/store/imageStore";
import { useUserStore } from "@/store/userStore";

export default function LoadingPage() {
  const router = useRouter();
  const imageUrl = useImageStore((s) => s.imageUrl);
  const nickname = useUserStore((s) => s.nickname);

  useEffect(() => {
    if (!imageUrl || !nickname) {
      router.push("/");
    }
  }, [imageUrl, nickname, router]);

  if (!imageUrl || !nickname) return null;

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center">
      <img
        src="/bg/main.png"
        alt=""
        className="absolute inset-0 -z-10 mx-auto h-full w-full object-cover"
        loading="eager"
        fetchPriority="high"
      />
      <h1 className="mx-auto mt-5 h-[78px] w-[304px] text-center text-[28px] leading-[39.2px] font-bold tracking-[-0.56px] md:mt-[115px]">
        {nickname}님의 감정을 <br /> 분석해 볼까요?
      </h1>
      <section
        className={cn(
          "mx-auto mt-16 flex h-[280px] w-[234px] flex-col items-center justify-center rounded-4xl border-2 border-white/10 bg-white/10",
        )}
      >
        <div className="relative h-[144px] w-[144px] overflow-hidden rounded-full">
          <Image src={imageUrl} alt="" fill className="object-cover" />
        </div>
        <h2 className="mt-5 text-[24px] font-semibold">{nickname}</h2>
      </section>

      <MainBtn
        onClick={() => {
          router.push("/result");
        }}
      >
        분석하기
      </MainBtn>
    </main>
  );
}
