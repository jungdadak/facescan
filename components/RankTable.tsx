export interface RankItem {
  userId: string;
  name: string;
  photoPath: string;
  overallRank: number;
}

interface RankTableProps {
  data: RankItem[];
}

export const RankTable = ({ data }: RankTableProps) => {
  return (
    <div className="flex w-[258px] flex-col items-start gap-3 rounded-2xl bg-white/5 p-4 backdrop-blur-2xl">
      {data.map((user) => (
        <div key={user.userId} className="flex w-full items-center gap-2.5">
          <div className="h-[38px] w-[38px] overflow-hidden rounded-full bg-[#c4c4c4]">
            <img
              src={user.photoPath}
              alt={`${user.name} 사진`}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-1 items-center justify-between">
            <span className="text-base font-semibold text-white">
              {user.name}
            </span>
            <span className="rounded-[10px] bg-[#9561ff] px-2 py-1 text-sm font-semibold text-white">
              {user.overallRank}위
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
