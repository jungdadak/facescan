export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
      <div className="animate-pulse text-xl font-semibold">로딩중임...</div>
      <img
        src={"/icon/question.png"}
        className={"animate-spin object-contain"}
      />
    </div>
  );
}
