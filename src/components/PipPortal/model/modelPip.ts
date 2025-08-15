import { atom, useAtomValue, useSetAtom } from "jotai";

/**
 * ピクチャインピクチャ関連
 */
export const modelPip = {
  useValues,
  useCreatePipWindow,
};

//|
//| private
//|

const atomPipWindow = atom<Window>();

function useValues() {
  const pipWindow = useAtomValue(atomPipWindow);
  return {
    pipOpen: pipWindow !== undefined,
    pipDocument: pipWindow?.document,
    pipWindow,
  };
}

function useCreatePipWindow() {
  const setPipWindow = useSetAtom(atomPipWindow);
  return async () => {
    const pip = await createPipWindow(200, 200);
    pip.addEventListener("unload", () => setPipWindow(undefined));
    setPipWindow(pip);
  };
}

async function createPipWindow(width: number, height: number) {
  const pip = await window.documentPictureInPicture.requestWindow({
    width,
    height,
    disallowReturnToOpener: true,
  });
  pip.document.body.style.margin = "0";
  return pip;
}
