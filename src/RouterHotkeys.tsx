import React from "react";
// @ts-expect-error no module declaration
import useKeypress from "react-use-keypress";

export default function RouterHotkeys({ children }: React.PropsWithChildren) {
  useKeypress("1", () => {
    window.location.href = "/";
  });

  useKeypress("2", () => {
    window.location.href = "/369";
  });

  useKeypress("3", () => {
    window.location.href = "/puzzel/1";
  });

  useKeypress("4", () => {
    window.location.href = "/puzzel/2";
  });

  useKeypress("5", () => {
    window.location.href = "/puzzel/3";
  });

  useKeypress("6", () => {
    window.location.href = "/collectiefgeheugen/1";
  });

  useKeypress("7", () => {
    window.location.href = "/collectiefgeheugen/2";
  });

  useKeypress("8", () => {
    window.location.href = "/collectiefgeheugen/3";
  });

  return children;
}
