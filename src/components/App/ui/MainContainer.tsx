import { Box } from "@mui/material";
import { ReactNode } from "react";
import { ID_TIMER } from "../../Svg/Svg";

export function MainContainer({
  children,
  document,
  onTimerClick,
}: {
  onTimerClick: () => void;
  children: ReactNode;
  document: Document;
}) {
  const ID_MAIN = "main";
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // クリック位置がタイマー外の場合は何もしない
    const isMain = document.getElementById(ID_MAIN) === e.target;
    const isTimer = document
      .getElementById(ID_TIMER)
      ?.contains(e.target as Node);
    if (!isMain && !isTimer) return;

    onTimerClick();
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
      onClick={handleClick}
    >
      {children}
    </Box>
  );
}
