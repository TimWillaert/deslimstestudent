import getLocalStorageData from "../helpers/getLocalStorageData";
import Participant from "../types/Participant";

function Overview() {
  const data: Participant[] = getLocalStorageData();

  return (
    <div className="w-screen h-screen flex flex-col">
      <div className="h-1/2 bg-green-500"></div>
      <div className="h-1/2 scoreboard border-t-8 border-horizontal flex items-center justify-center">
        <div className="flex gap-32">
          {data.map((participant) => (
            <div
              key={participant.name}
              className="flex flex-col items-center text-white gap-5"
            >
              <p className="font-bold text-3xl">
                {participant.name.toUpperCase()}
              </p>
              <div
                className={`w-16 h-10 rounded-[90%] pill pill-red shadow-circle flex items-center justify-center`}
              >
                <p className="text-2xl font-bold p-3">{participant.score}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Overview;
