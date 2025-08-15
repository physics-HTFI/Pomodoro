import { useSetAtom } from "jotai";
import { atomTimer } from "../../atoms/atomTimer/atomTimer";
import { modelPip } from "../pip/model/modelPip";

export function useClick() {
  const toggle = useSetAtom(atomTimer.toggle);
  const { pipDocument } = modelPip.useValues();

  return { onTimerClick: toggle, document: pipDocument ?? document };
}
