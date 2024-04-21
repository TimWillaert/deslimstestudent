import getLocalStorageData from "../helpers/getLocalStorageData";
import Participant from "../types/Participant";

function Overview() {
  const data: Participant[] = getLocalStorageData();

  return (
    <div className="w-screen h-screen flex flex-col">
      <div className="h-1/2 bg-green-500"></div>
      <div className="h-1/2 bg-red-600 border-t-8 border-blue-900 flex items-center justify-center">
        <div className="flex gap-32">
          {data.map((participant) => (
            <div
              key={participant.name}
              className="flex flex-col items-center text-white gap-3"
            >
              <p className="font-bold text-xl">
                {participant.name.toUpperCase()}
              </p>
              <p className="text-lg">{participant.score}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Overview;
