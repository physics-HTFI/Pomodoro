import { useAtomValue, useSetAtom } from "jotai";
import { atomTimer } from "../../atoms/atomTimer/atomTimer";
import { atomPipWindow } from "../../atoms/atomPipWindow";

export function useClick() {
  const toggle = useSetAtom(atomTimer.toggle);
  const pip = useAtomValue(atomPipWindow);

  return { onTimerClick: toggle, document: pip?.document ?? document };
}
