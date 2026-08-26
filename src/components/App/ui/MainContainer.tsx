import { Box } from "@mui/material";
import { ReactNode } from "react";
import { ID_TIMER } from "../../Timer/Timer";

export function MainContainer({
  children,
  document,
  onToggleTimer,
  onToggleBreak,
}: {
  onToggleTimer?: () => void;
  onToggleBreak?: () => void;
  children: ReactNode;
  document?: Document;
}) {
  const ID_MAIN = "main";
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!onToggleTimer || !onToggleBreak || !document) return;

    // クリック位置がタイマー外の場合は何もしない
    const isMain = document.getElementById(ID_MAIN) === e.target;
    const isTimer = document
      .getElementById(ID_TIMER)
      ?.contains(e.target as Node);
    if (!isMain && !isTimer) return;

    const isLeftClick = e.button === 0;
    const isMiddleClick = e.button === 1;
    if (isLeftClick) onToggleTimer();
    if (isMiddleClick) onToggleBreak();
  };

  return (
    <Box
      id={ID_MAIN}
      sx={{
        background: "#202124",
        display: "flex",
        height: "100svh",
        justifyContent: "center",
        alignItems: "center",
        userSelect: "none",
        flexDirection: "column",
      }}
      // 左クリック
      onClick={handleClick}
      // 左クリック以外
      onAuxClick={handleClick}
    >
      {children}
    </Box>
  );
}
