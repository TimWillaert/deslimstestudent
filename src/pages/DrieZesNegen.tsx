import { useEffect, useState } from "react";
import getLocalStorageData from "../helpers/getLocalStorageData";
import Participant from "../types/Participant";
// @ts-expect-error no module declaration
import useKeypress from "react-use-keypress";

export default function DrieZesNegen() {
  const [data, setData] = useState<Participant[]>(getLocalStorageData());
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [currentParticipant, setCurrentParticipant] = useState(0);
  const [currentTries, setCurrentTries] = useState(0);

  useKeypress("j", () => {
    if (currentQuestion % 3 == 0) {
      setData((prevData) => {
        return prevData.map((participant) => {
          if (participant.id === currentParticipant) {
            return {
              ...participant,
              score: participant.score + 10,
            };
          } else {
            return participant;
          }
        });
      });
    }
    setCurrentQuestion((prev) => {
      if (prev == 12) {
        return 12;
      } else {
        return prev + 1;
      }
    });
    setCurrentTries(0);
  });

  useKeypress("f", () => {
    setCurrentTries((prev) => prev + 1);
    setCurrentParticipant((currentIndex) => {
      if (currentIndex == data.length - 1) {
        return data[0].id;
      } else {
        return data[currentIndex + 1].id;
      }
    });
    if (currentTries == 2) {
      setCurrentQuestion((prev) => {
        if (prev == 12) {
          return 12;
        } else {
          return prev + 1;
        }
      });
      setCurrentTries(0);
    }
  });

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(data));
  }, [data]);

  return (
    <div className="w-screen h-screen flex flex-col">
      <div className="flex flex-row w-screen h-1/2">
        <div className="bg-green-500 h-full w-1/2 border-r-4 border-blue-900"></div>
        <div className="bg-green-500 h-full w-1/2 border-l-4 border-blue-900"></div>
      </div>
      <div className="bg-red-600 w-screen h-1/2 border-t-8 border-blue-900 flex flex-col justify-center gap-20">
        <div className="flex flex-row self-center gap-32">
          {data.map((participant) => (
            <div
              key={participant.name}
              className={`flex flex-col items-center gap-3 ${
                currentParticipant == participant.id
                  ? "text-white"
                  : "text-white/50"
              }`}
            >
              <p className="font-bold text-xl">
                {participant.name.toUpperCase()}
              </p>
              <p className="text-lg">{participant.score - 60}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-row self-center gap-20">
          {Array.from({ length: 12 }, (_, i) => (
            <p
              className={`text-xl ${
                currentQuestion == i + 1 ? "text-white" : "text-white/50"
              }`}
            >
              {i + 1}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
