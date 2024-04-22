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
  const getPillClass = (index: number) => {
    switch (index) {
      case 0:
        return "pill-blue";
      case 1:
        return "pill-light-blue";
      case 2:
        return "pill-dark-blue";
      default:
        break;
    }
  };

  return (
    <div className="flex items-center">
      {solved ? (
        <>
          <div
            className={`w-16 h-10 rounded-[90%] pill ${getPillClass(
              index
            )} shadow-circle flex items-center justify-center`}
          >
            <p className={`text-${index}-foreground text-2xl font-bold p-3`}>
              30
            </p>
          </div>
          <p className="ml-7 text-2xl font-bold text-white uppercase text-shadow shadow-black">
            {answer}
          </p>
        </>
      ) : (
        <>
          {unsolved ? (
            <>
              <div
                className={`w-16 h-10 rounded-[90%] pill pill-clear shadow-circle flex items-center justify-center`}
              >
                <p></p>
              </div>
              <p className="ml-7 text-2xl font-bold text-white uppercase text-shadow shadow-black">
                {answer}
              </p>
            </>
          ) : (
            <>
              <div className="w-16 h-10 rounded-[90%] pill pill-clear shadow-circle flex items-center justify-center">
                <p></p>
              </div>
              <p className="ml-7 text-2xl font-bold text-black uppercase blur-md">
                {answer}
              </p>
            </>
          )}
        </>
      )}
    </div>
  );
}
