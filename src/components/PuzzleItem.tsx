export default function PuzzleItem({
  text,
  index,
  solved,
}: {
  text: string;
  index: number;
  solved: boolean;
}) {
  return (
    <>
      {solved ? (
        <div
          className={`h-24 flex items-center justify-center rounded-sm shadow-puzzle bg-${index}-background`}
        >
          <p className={`text-${index}-foreground uppercase font-bold`}>
            {text}
          </p>
        </div>
      ) : (
        <div className="h-24 flex items-center justify-center rounded-sm shadow-puzzle">
          <p className="text-white uppercase font-bold text-shadow shadow-black">
            {text}
          </p>
        </div>
      )}
    </>
  );
}
