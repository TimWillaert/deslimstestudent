export default function PuzzleItem({
  text,
  index,
  solved,
  unsolved,
}: {
  text: string;
  index: number;
  solved: boolean;
  unsolved: boolean;
}) {
  return (
    <>
      {solved || unsolved ? (
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
