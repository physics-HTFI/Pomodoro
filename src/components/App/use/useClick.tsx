import { useAtomValue, useSetAtom } from "jotai";
import { atomTimer } from "../../../atoms/atomTimer/atomTimer";
import { atomPipWindow } from "../../../atoms/atomPipWindow";

export function useClick() {
  const toggle = useSetAtom(atomTimer.toggle);
  const pip = useAtomValue(atomPipWindow);
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // クリック位置がタイマー外の場合は何もしない
    const doc = pip?.document ?? document;
    const isMain = doc.getElementById("main") === e.target;
    const isSvg = doc.getElementById("svg")?.contains(e.target as Node);
    if (!isMain && !isSvg) return;
    // タイマー開始／停止
    toggle();
  };
  return { handleClick };
}
