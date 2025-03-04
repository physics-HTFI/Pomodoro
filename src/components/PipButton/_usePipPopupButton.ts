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
    setPipWindow(pip);
    pip.document.body.style.margin = "0";
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
