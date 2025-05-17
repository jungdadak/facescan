import Image from "next/image";

import MainBtn from "@/components/btn/MainBtn";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <img
        src="/bg/main.png"
        alt=""
        className="absolute inset-0 top-5 -z-10 mx-auto h-full max-w-xl object-contain"
      />

      <h1
        className={`mx-auto mt-40 h-[78px] w-[304px] text-center text-[28px] leading-[39.2px] font-bold tracking-[-0.56px]`}
      >
        나의 표정으로
        <br />
        감정을 분석하고 싶다면?
      </h1>

      <figure
        className={
          "mx-auto mt-16 flex h-[280px] w-[234px] items-center justify-center rounded-4xl border-2 border-white/10 bg-white/10"
        }
        aria-labelledby="question-caption"
      >
        <Image src={"/icon/question.png"} alt={""} width={126} height={140} />
        <figcaption id="question-caption" className="sr-only">
          귀여운 물음표 아이콘
        </figcaption>
      </figure>

      <MainBtn>테스트하기</MainBtn>
    </main>
  );
}
