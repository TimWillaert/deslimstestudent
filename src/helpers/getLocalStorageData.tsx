import json from "../data.json";
import Participant from "../types/Participant";

export default function getLocalStorageData(): Participant[] {
  const data = localStorage.getItem("data");
  if (data) {
    const parsedData: Participant[] = JSON.parse(data);
    parsedData.sort((a, b) => (b.id < a.id ? 1 : -1));
    return parsedData;
  } else {
    const initData: Participant[] = [
      {
        id: 0,
        name: json.participants[0],
        score: 60,
        startedPuzzle: false,
      },
      {
        id: 1,
        name: json.participants[1],
        score: 60,
        startedPuzzle: false,
      },
      {
        id: 2,
        name: json.participants[2],
        score: 60,
        startedPuzzle: false,
      },
    ];
    localStorage.setItem("data", JSON.stringify(initData));
    return initData;
  }
}
