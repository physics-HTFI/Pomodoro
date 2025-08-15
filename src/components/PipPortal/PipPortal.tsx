import { createPortal } from "react-dom";
import { usePipPortal } from "./PipPortal.use";
import { StyleCache } from "./ui/StyleCache";
import { ReactNode } from "react";

/**
 * ピクチャインピクチャ用のポータル（ReactコンポーネントをPiPに送った時に正常動作させるのに必要）
 */
export function PipPortal({ children }: { children: ReactNode }) {
  const { pipBody } = usePipPortal();

  children = <StyleCache>{children}</StyleCache>;

  // pipBodyが値を持っている場合、childrenをpipBodyに移動する。
  // pipBody === undefinedの場合、childrenを本来の位置に表示する。
  if (pipBody) return createPortal(children, pipBody);
  return children;
}
