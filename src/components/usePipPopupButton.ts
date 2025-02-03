import { useAtom } from "jotai";
import { useCallback } from "react";
import { atomPipWindow } from "../atoms/atomPipWindow";

export function usePipPopupButton() {
  const [pipWindow, setPipWindow] = useAtom(atomPipWindow);
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.stopPropagation();
      const target = document.getElementById("pomodoro");
      if (!target) return;
      window.documentPictureInPicture
        .requestWindow({
          width: 200,
          height: 200,
          disallowReturnToOpener: true,
        })
        .then((pip) => {
          copyCss(document, pip.document);
          setPipWindow(pip);
          pip.addEventListener("unload", () => {
            setPipWindow(undefined);
          });
        });
    },
    [setPipWindow]
  );

  const hidden = pipWindow !== undefined;
  return {
    hidden,
    handleClick,
  };
}

function copyCss(from: Document, to: Document) {
  [...from.styleSheets].forEach((styleSheet) => {
    const style = document.createElement("style");
    style.textContent = [...styleSheet.cssRules]
      .map((rule) => rule.cssText)
      .join("");
    to.head.appendChild(style);
  });
}

/**
 * `documentPictureInPicture`関連の型エラーを防ぐ
 */
declare global {
  interface Window {
    documentPictureInPicture: {
      requestWindow: (options?: unknown) => Promise<Window>;
    };
  }
}
