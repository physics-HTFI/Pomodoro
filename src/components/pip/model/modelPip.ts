import { atom, useAtomValue, useSetAtom } from "jotai";

/**
 * ピクチャインピクチャ関連
 */
export const modelPip = {
  /** pipウィンドウやpipモードになっているかを取得する */
  useValues,
  /** pipウィンドウを生成する */
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
    if (!pip) return;
    pip.addEventListener("unload", () => setPipWindow(undefined));
    setPipWindow(pip);
  };
}

async function createPipWindow(width: number, height: number) {
  try {
    const pip = await window.documentPictureInPicture.requestWindow({
      width,
      height,
      disallowReturnToOpener: true,
    });
    pip.document.body.style.margin = "0";
    return pip;
  } catch {
    alert("PiPウィンドウが開けませんでした");
    return undefined;
  }
}
