import { useEffect, useMemo, useState } from "react";
import Participant from "../types/Participant";
import getLocalStorageData from "../helpers/getLocalStorageData";
import json from "../data.json";
// @ts-expect-error no module declaration
import useKeypress from "react-use-keypress";
import { useParams } from "react-router-dom";
import CollectiefGeheugenAnswer from "../components/CollectiefGeheugenAnswer";
import correctAudio from "../audio/correct.wav";
import pasAudio from "../audio/pas.wav";

export default function CollectiefGeheugen() {
  const params = useParams();
  const puzzle = json.collectief_geheugen[parseInt(params.number!) - 1];

  const [data, setData] = useState<Participant[]>(getLocalStorageData());
  const [solved, setSolved] = useState<string[]>([]);
  const [unsolved, setUnsolved] = useState<string[]>([]);

  const [countdown, setCountdown] = useState<number>(0);

  const participantOrder = useMemo(() => {
    const sorted = data.sort((a, b) => a.score - b.score);
    const hasntStartedIndex = sorted.findIndex(
      (participant) => !participant.startedFilm
    );

    if (hasntStartedIndex !== -1) {
      const hasntStartedElement = sorted.splice(hasntStartedIndex, 1)[0];
      sorted.unshift(hasntStartedElement);
    }

    return sorted;
  }, []);
  const [participantsPlayed, setParticipantsPlayed] = useState<number>(1);

  const [currentParticipant, setCurrentParticipant] = useState<Participant>(
    participantOrder[0]
  );
  const [currentScore, setCurrentScore] = useState<number>(
    currentParticipant.score
  );

  const sortedArray = useMemo(() => {
    const sortedData = [...data];
    return sortedData.sort((a, b) => (b.id < a.id ? 1 : -1));
  }, [data]);

  const gameOver = useMemo(() => {
    return participantsPlayed > data.length || solved.length >= puzzle.length;
  }, [participantsPlayed, solved]);

  useKeypress("a", () => {
    if (!gameOver) {
      setSolved([...solved, puzzle[0]]);
    } else {
      setUnsolved([...unsolved, puzzle[0]]);
    }
    correctAnswer();
  });

  useKeypress("b", () => {
    if (!gameOver) {
      setSolved([...solved, puzzle[1]]);
    } else {
      setUnsolved([...unsolved, puzzle[1]]);
    }
    correctAnswer();
  });

  useKeypress("c", () => {
    if (!gameOver) {
      setSolved([...solved, puzzle[2]]);
    } else {
      setUnsolved([...unsolved, puzzle[2]]);
    }
    correctAnswer();
  });

  useKeypress("d", () => {
    if (!gameOver) {
      setSolved([...solved, puzzle[3]]);
    } else {
      setUnsolved([...unsolved, puzzle[3]]);
    }
    correctAnswer();
  });

  useKeypress("e", () => {
    if (!gameOver) {
      setSolved([...solved, puzzle[4]]);
    } else {
      setUnsolved([...unsolved, puzzle[4]]);
    }
    correctAnswer();
  });

  useKeypress("p", () => {
    stop();
  });

  const stop = () => {
    clearInterval(countdown);
    if (gameOver) {
      return;
    }
    if (participantOrder[participantsPlayed]) {
      setCurrentParticipant(participantOrder[participantsPlayed]);
      setCurrentScore(participantOrder[participantsPlayed].score);
    }
    setParticipantsPlayed(participantsPlayed + 1);
    const audio = new Audio(pasAudio);
    audio.play();
  };

  const correctAnswer = () => {
    if (gameOver) return;
    const solvedAnswers = solved.length;
    const points = (solvedAnswers + 1) * 10;
    setCurrentScore(currentScore + points);
    setData((prevData) => {
      return prevData.map((participant) => {
        if (participant.id === currentParticipant.id) {
          return {
            ...participant,
            score: participant.score + points,
          };
        } else {
          return participant;
        }
      });
    });
    const audio = new Audio(correctAudio);
    audio.play();
  };

  useEffect(() => {
    const id = setInterval(() => {
      setCurrentScore((prev) => {
        return prev - 1 < 0 ? 0 : prev - 1;
      });

      setData((prevData) => {
        return prevData.map((participant) => {
          if (participant.id === currentParticipant.id) {
            return {
              ...participant,
              score: participant.score - 1 < 0 ? 0 : participant.score - 1,
            };
          } else {
            return participant;
          }
        });
      });
    }, 1000);
    setCountdown(id);

    return () => clearInterval(id);
  }, [currentParticipant]);

  useEffect(() => {
    if (solved.length == puzzle.length) {
      stop();
    }
  }, [solved]);

  useEffect(() => {
    const newData = data.map((participant) => {
      if (participant.id === participantOrder[0].id) {
        return {
          ...participant,
          startedFilm: true,
        };
      } else {
        return participant;
      }
    });
    localStorage.setItem("data", JSON.stringify(newData));
  }, [data]);

  if (
    (params.number && parseInt(params.number) < 1) ||
    (params.number && parseInt(params.number) > 3)
  ) {
    return <div className="font-mono">Invalid parameter</div>;
  }

  return (
    <div className="w-screen h-screen flex flex-row">
      <div className="w-1/2 puzzel border-r-8 border-vertical flex items-center">
        <div className="flex flex-col mx-32 gap-14">
          {puzzle.map((answer, index) => (
            <CollectiefGeheugenAnswer
              key={index}
              answer={answer}
              solved={solved}
              unsolved={unsolved.includes(answer)}
            />
          ))}
        </div>
      </div>
      <div className="flex-1 flex-col">
        <div className="h-1/2 bg-green-500 border-b-4 border-black relative">
          <div className="absolute -bottom-8 left-[50%] translate-x-[-50%] flex gap-28">
            {sortedArray.map((participant) => (
              <div
                key={participant.id}
                className={`${
                  participant.id == currentParticipant.id
                    ? "circle-blue"
                    : "circle-red"
                } shadow-circle text-white rounded-full w-14 h-14 flex items-center justify-center`}
              >
                <p className="text-2xl font-bold">{participant.score}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="h-1/2 bg-green-500 border-t-4 border-black">
          <p>{currentParticipant.name}</p>
        </div>
      </div>
    </div>
  );
}
