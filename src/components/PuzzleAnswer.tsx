export default function PuzzleAnswer({
  answer,
  index,
  solved,
  unsolved,
}: {
  answer: string;
  index: number;
  solved: boolean;
  unsolved: boolean;
}) {
  return (
    <div className="flex items-center">
      {solved ? (
        <>
          <div
            className={`w-11 h-8 rounded-[90%] bg-${index}-background shadow-puzzle flex items-center justify-center`}
          >
            <p className={`text-${index}-foreground font-bold`}>30</p>
          </div>
          <p className="ml-5 text-lg font-bold text-white uppercase text-shadow shadow-black">
            {answer}
          </p>
        </>
      ) : (
        <>
          {unsolved ? (
            <>
              <div
                className={`w-11 h-8 rounded-[90%] shadow-puzzle flex items-center justify-center`}
              >
                <p></p>
              </div>
              <p className="ml-5 text-lg font-bold text-white uppercase text-shadow shadow-black">
                {answer}
              </p>
            </>
          ) : (
            <>
              <div className="w-11 h-8 rounded-[90%] shadow-puzzle flex items-center justify-center">
                <p></p>
              </div>
              <p className="ml-5 text-lg font-bold text-black uppercase blur-sm">
                {answer}
              </p>
            </>
          )}
        </>
      )}
    </div>
  );
}
