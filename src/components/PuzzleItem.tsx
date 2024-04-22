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
          className={`h-24 flex items-center justify-center rounded-sm shadow-puzzle button button-${index}`}
        >
          <p
            className={`text-${index}-foreground uppercase font-bold text-2xl mx-5 text-center`}
          >
            {text}
          </p>
        </div>
      ) : (
        <div className="h-24 flex items-center justify-center rounded-sm shadow-puzzle">
          <p className="shadow-black text-white uppercase font-bold text-2xl text-shadow mx-5 text-center">
            {text}
          </p>
        </div>
      )}
    </>
  );
}
