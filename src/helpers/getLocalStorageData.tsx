import json from "../data.json";
import Participant from "../types/Participant";

export default function getLocalStorageData(): Participant[] {
  const data = localStorage.getItem("data");
  if (data) {
    return JSON.parse(data);
  } else {
    const initData: Participant[] = [
      {
        name: json.participants[0],
        score: 60,
      },
      {
        name: json.participants[1],
        score: 60,
      },
      {
        name: json.participants[2],
        score: 60,
      },
    ];
    localStorage.setItem("data", JSON.stringify(initData));
    return initData;
  }
}
