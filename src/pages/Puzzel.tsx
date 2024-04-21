import { useEffect, useMemo, useState } from "react";
import Participant from "../types/Participant";
import getLocalStorageData from "../helpers/getLocalStorageData";
import json from "../data.json";
import PuzzleItem from "../components/PuzzleItem";
import PuzzleAnswer from "../components/PuzzleAnswer";
import useKeypress from "react-use-keypress";
import { useParams } from "react-router-dom";

export default function Puzzel() {
  const params = useParams();
  const puzzle = json.puzzles[parseInt(params.number!) - 1];

  const [data, setData] = useState<Participant[]>(getLocalStorageData());
  const [solved, setSolved] = useState<string[]>([]);
  const [unsolved, setUnsolved] = useState<string[]>([]);

  const [countdown, setCountdown] = useState<number>(0);

  const participantOrder = useMemo(() => {
    return data.sort((a, b) => {
      if (!a.startedPuzzle && b.startedPuzzle) {
        return -1;
      }
      if (a.startedPuzzle && !b.startedPuzzle) {
        return 1;
      }
      return a.score - b.score;
    });
  }, []);
  const [participantsPlayed, setParticipantsPlayed] = useState<number>(1);

  const [currentParticipant, setCurrentParticipant] = useState<Participant>(
    participantOrder[0]
  );
  const [currentScore, setCurrentScore] = useState<number>(
    currentParticipant.score
  );

  const flattenedPuzzle = useMemo(
    () =>
      puzzle.flatMap((row, index) => {
        return row.values.map((value) => {
          return { value, answer: row.answer, index };
        });
      }),
    [puzzle]
  );
  const shuffledPuzzle = useMemo(
    () => [...flattenedPuzzle].sort(() => Math.random() - 0.5),
    [flattenedPuzzle]
  );

  const gameOver = useMemo(() => {
    return participantsPlayed > data.length || solved.length >= puzzle.length;
  }, [participantsPlayed, solved]);

  useKeypress("a", () => {
    if (!gameOver) {
      setSolved([...solved, puzzle[0].answer]);
    } else {
      setUnsolved([...unsolved, puzzle[0].answer]);
    }
    correctAnswer();
  });

  useKeypress("b", () => {
    if (!gameOver) {
      setSolved([...solved, puzzle[1].answer]);
    } else {
      setUnsolved([...unsolved, puzzle[1].answer]);
    }
    correctAnswer();
  });

  useKeypress("c", () => {
    if (!gameOver) {
      setSolved([...solved, puzzle[2].answer]);
    } else {
      setUnsolved([...unsolved, puzzle[2].answer]);
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
  };

  const correctAnswer = () => {
    if (gameOver) return;
    setCurrentScore(currentScore + 30);
    setData((prevData) => {
      return prevData.map((participant) => {
        if (participant.id === currentParticipant.id) {
          return {
            ...participant,
            score: participant.score + 30,
          };
        } else {
          return participant;
        }
      });
    });
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
          startedPuzzle: true,
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
      <div className="w-4/6 bg-red-600 border-r-8 border-blue-900">
        <div className="grid grid-cols-3 grid-rows-4 gap-2 mx-20 my-14">
          {shuffledPuzzle.map((cell, index) => (
            <PuzzleItem
              key={`${cell.value}-${index}`}
              text={cell.value}
              index={cell.index}
              solved={solved.includes(cell.answer)}
            />
          ))}
        </div>
        <div className="flex flex-col mx-20 gap-5">
          {puzzle.map((row, index) => (
            <PuzzleAnswer
              key={index}
              answer={row.answer}
              index={index}
              solved={solved.includes(row.answer)}
              unsolved={unsolved.includes(row.answer)}
            />
          ))}
        </div>
      </div>
      <div className="flex-1 flex-col">
        <div className="h-1/2 bg-green-500 border-b-4 border-blue-900 relative">
          <div className="bg-blue-900 text-white absolute bottom-5 left-5 rounded-full w-10 h-10 flex items-center justify-center">
            <p>{currentScore}</p>
          </div>
        </div>
        <div className="h-1/2 bg-green-500 border-t-4 border-blue-900">
          <p>{currentParticipant.name}</p>
        </div>
      </div>
    </div>
  );
}
