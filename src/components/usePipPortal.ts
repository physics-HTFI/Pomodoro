import { useAtomValue } from "jotai";
import { atomPipWindow } from "../atoms/atomPipWindow";

export function usePipPortal() {
  const pip = useAtomValue(atomPipWindow);

  const pipBody = pip?.document?.body;
  return { pipBody };
}
