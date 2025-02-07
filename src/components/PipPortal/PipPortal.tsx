import { createPortal } from "react-dom";
import { usePipPortal } from "./_usePipPortal";
import { StyleCache } from "./_StyleCache";

/**
 * ピクチャインピクチャ用のポータル（ReactコンポーネントをPiPに送った時に正常動作させるのに必要）
 */
export function PipPortal({ children }: { children: React.ReactNode }) {
  const { pipBody } = usePipPortal();

  children = <StyleCache>{children}</StyleCache>;

  // pipBodyが値を持っている場合、ChildrenをpipBodyに移動する。
  // pipBody === undefinedの場合、Childrenを本来の位置に表示する。
  if (pipBody) {
    return createPortal(children, pipBody);
  }
  return <>{children}</>;
}
