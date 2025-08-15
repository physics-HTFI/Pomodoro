import { createPortal } from "react-dom";
import { StyleCache } from "./ui/StyleCache";
import { ReactNode } from "react";
import { modelPip } from "./model/modelPip";

/**
 * ピクチャインピクチャ用のポータル（ReactコンポーネントをPiPに送った時に正常動作させるのに必要）
 */
export function PipPortal({ children }: { children: ReactNode }) {
  const { pipDocument } = modelPip.useValues();

  children = <StyleCache>{children}</StyleCache>;

  // pipBodyが値を持っている場合、childrenをpipBodyに移動する。
  // pipBody === undefinedの場合、childrenを本来の位置に表示する。
  if (pipDocument) return createPortal(children, pipDocument.body);
  return children;
}
