import { useAtom } from "jotai";
import { useCallback } from "react";
import { atomPipWindow } from "../../atoms/atomPipWindow";

export function usePipPopupButton() {
  const [pipWindow, setPipWindow] = useAtom(atomPipWindow);
  const handleClick = useCallback(async () => {
    const pip = await window.documentPictureInPicture.requestWindow({
      width: 200,
      height: 200,
      disallowReturnToOpener: true,
    });
    copyCss(document, pip.document);
    setPipWindow(pip);
    pip.addEventListener("unload", () => {
      setPipWindow(undefined);
    });
  }, [setPipWindow]);

  const hidden = pipWindow !== undefined;
  return {
    hidden,
    handleClick,
  };
}

/**
 * cssをPiPにコピーする
 */
function copyCss(from: Document, to: Document) {
  [...from.styleSheets].forEach((styleSheet) => {
    const style = document.createElement("style");
    style.textContent = [...styleSheet.cssRules]
      .map((rule) => rule.cssText)
      .join("");
    to.head.appendChild(style);
  });
}
