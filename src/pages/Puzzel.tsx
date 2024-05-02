import { useEffect, useMemo, useState } from "react";
import Participant from "../types/Participant";
import getLocalStorageData from "../helpers/getLocalStorageData";
import json from "../data.json";
import PuzzleItem from "../components/PuzzleItem";
import PuzzleAnswer from "../components/PuzzleAnswer";
// @ts-expect-error no module declaration
import useKeypress from "react-use-keypress";
import { useParams } from "react-router-dom";
import correctAudio from "../audio/correct.wav";
import pasAudio from "../audio/pas.wav";

// images om te preloaden
import button_blue from "../img/button_blue.png";
import pill_blue from "../img/pill_blue.png";
import button_dark_blue from "../img/button_dark_blue.png";
import pill_dark_blue from "../img/pill_dark_blue.png";
import button_light_blue from "../img/button_light_blue.png";
import pill_light_blue from "../img/pill_light_blue.png";



export default function Puzzel() {
  const params = useParams();
  const puzzle = json.puzzles[parseInt(params.number!) - 1];

  const [data, setData] = useState<Participant[]>(getLocalStorageData());
  const [solved, setSolved] = useState<string[]>([]);
  const [unsolved, setUnsolved] = useState<string[]>([]);

  const [countdown, setCountdown] = useState<number>(0);

  const participantOrder = useMemo(() => {
    const sorted = data.sort((a, b) => a.score - b.score);
    const hasntStartedIndex = sorted.findIndex(
      (participant) => !participant.startedPuzzle
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



  useKeypress("Enter", () => {
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
  });


  

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
    const audio = new Audio(pasAudio);
    audio.play();
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
    const audio = new Audio(correctAudio);
    audio.play();
  };

  const sortedArray = useMemo(() => {
    const sortedData = [...data];
    return sortedData.sort((a, b) => (b.id < a.id ? 1 : -1));
  }, [data]);

  



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

  useEffect(() => {
    //preload images
    const imageList = [
      button_blue,
      pill_blue,
      button_dark_blue,
      pill_dark_blue,
      button_light_blue,
      pill_light_blue,
    ];
    imageList.forEach((image) => {
      new Image().src = image;
    });
  }, []);

  if (
    (params.number && parseInt(params.number) < 1) ||
    (params.number && parseInt(params.number) > 3)
  ) {
    return <div className="font-mono">Invalid parameter</div>;
  }

  return (
    <div className="w-screen h-screen flex flex-row">
      <div className="w-4/6 puzzel border-r-8 border-vertical">
        <div className="grid grid-cols-3 grid-rows-4 gap-2 mx-20 my-14">
          {shuffledPuzzle.map((cell, index) => (
            <PuzzleItem
              key={`${cell.value}-${index}`}
              text={cell.value}
              index={cell.index}
              solved={solved.includes(cell.answer)}
              unsolved={unsolved.includes(cell.answer)}
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
        <div className="h-1/2 bg-green-500 border-b-4 border-black relative">
        <div className="absolute -bottom-[3rem] left-[50%] translate-x-[-50%] flex gap-14 ">
            {sortedArray.map((participant) => (
              <div key={participant.id} className="flex flex-col gap-4 text-gray-200 items-center justify-center text-shadow shadow-black "
              >
              <div
                className={`${
                  participant.id == currentParticipant.id
                    ? "circle-blue"
                    : "circle-red"
                } shadow-circle text-white rounded-full w-14 h-14 flex items-center justify-center`}
              >
                <p className="text-2xl font-bold">{participant.score}</p>

              </div >
              <p className={`${participant.id == currentParticipant.id ? 'text-white' : 'text-[#95b4cc]'}  text-[1.5rem] tracking-wider`} > {participant.name}</p>
              </div>
            ))}
        </div>  
        </div>
        <div className="h-1/2 bg-green-500 border-t-4 border-black">
  
      </div>
      </div>
    </div>
  );
}
