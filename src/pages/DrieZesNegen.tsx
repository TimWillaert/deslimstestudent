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
      if (prev == 9) {
        return 9;
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
        if (prev == 9) {
          return 9;
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
        <div className="bg-green-500 h-full w-1/2 border-r-4 border-black"></div>
        <div className="bg-green-500 h-full w-1/2 border-l-4 border-black"></div>
      </div>
      <div className="scoreboard w-screen h-1/2 border-t-8 border-horizontal flex flex-col justify-center gap-14">
        <div className="flex flex-row self-center gap-32">
          {data.map((participant) => (
            <div
              key={participant.name}
              className="flex flex-col items-center gap-3 text-white"
            >
              <p className="font-bold text-3xl">
                {participant.name.toUpperCase()}
              </p>
              <div
                className={`w-16 h-10 rounded-[90%] ${
                  participant.id == currentParticipant
                    ? "pill pill-blue"
                    : "pill pill-red"
                } shadow-circle flex items-center justify-center`}
              >
                <p className="text-2xl font-bold p-3">{participant.score}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-row self-center gap-10">
          {Array.from({ length: 9 }, (_, i) => (
            <div
              key={i}
              className={`${
                currentQuestion == i + 1 && "circle-red shadow-circle"
              } w-12 h-12 rounded-full flex items-center justify-center`}
            >
              <p
                className={`text-2xl font-bold ${
                  currentQuestion == i + 1 ? "text-white" : "text-white/40"
                }`}
              >
                {i + 1}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
