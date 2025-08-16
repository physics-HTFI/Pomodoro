import { Button, Dialog as MuiDialog, DialogTitle, Stack } from "@mui/material";

export function Dialog({
  open,
  onClose,
  onLoad,
}: {
  open: boolean;
  onLoad: () => Promise<void>;
  onClose: () => void;
}) {
  const handleOk = async () => {
    await onLoad();
    onClose();
  };
  return (
    <MuiDialog open={open}>
      <DialogTitle fontSize="medium">
        前回のファイルを使用しますか？
      </DialogTitle>
      <Stack direction="row" p={1} gap={1} justifyContent="end">
        <Button onClick={handleOk} variant="outlined">
          はい
        </Button>
        <Button onClick={onClose}>いいえ</Button>
      </Stack>
    </MuiDialog>
  );
}
