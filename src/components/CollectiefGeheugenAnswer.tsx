export default function CollectiefGeheugenAnswer({
  answer,
  solved,
  unsolved,
}: {
  answer: string;
  solved: string[];
  unsolved: boolean;
}) {
  return (
    <div className="flex items-center">
      {solved.includes(answer) ? (
        <>
          <div
            className={`w-16 h-10 rounded-[90%]  pill pill-blue shadow-circle flex items-center justify-center`}
          >
            <p className={`text-0-foreground text-2xl font-bold p-3`}>
              {(solved.findIndex((x) => x == answer) + 1) * 10}
            </p>
          </div>
          <p className="ml-8 text-3xl font-bold text-white uppercase text-shadow shadow-black">
            {answer}
          </p>
        </>
      ) : (
        <>
          {unsolved ? (
            <>
              <div className="w-16 h-10 rounded-[90%] pill pill-clear shadow-circle flex items-center justify-center">
                <p></p>
              </div>
              <p className="ml-8 text-3xl font-bold text-white uppercase text-shadow shadow-black">
                {answer}
              </p>
            </>
          ) : (
            <>
              <div className="w-16 h-10 rounded-[90%] pill pill-clear shadow-circle flex items-center justify-center">
                <p></p>
              </div>
              <p className="ml-7 text-3xl font-bold text-black uppercase blur-md">
                {answer}
              </p>
            </>
          )}
        </>
      )}
    </div>
  );
}
