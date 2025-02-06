import { IconButton } from "@mui/material";

export function Icon({
  icon,
  onClick,
}: {
  icon: JSX.Element;
  onClick: () => void;
}) {
  return (
    <IconButton sx={{ color: "white" }} size="small" onClick={onClick}>
      {icon}
    </IconButton>
  );
}
