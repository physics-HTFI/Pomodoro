import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  TextField,
} from "@mui/material";
import { Delete, Folder } from "@mui/icons-material";
import { useSettingsDialog } from "./useSettingsDialog";

/**
 * 設定ボタンを押したときに現れる選択ダイアログ
 */
export function SettingsDialog() {
  const {
    open,
    fileName,
    deviceId,
    devices,
    selectFile,
    unselectFile,
    handleSelectSpeaker,
    handleClickToClose,
    handleClose,
  } = useSettingsDialog();

  return (
    <Dialog onClose={handleClose} onClick={handleClickToClose} open={open}>
      <DialogTitle fontSize="medium">保存先ファイルの選択</DialogTitle>
      <DialogContent>
        <Stack direction="row" px={4}>
          <TextField variant="standard" value={fileName} sx={{ width: 300 }} />
          <IconButton color="primary" onClick={selectFile}>
            <Folder />
          </IconButton>
          <IconButton color="primary" onClick={unselectFile}>
            <Delete />
          </IconButton>
        </Stack>
      </DialogContent>
      <DialogTitle fontSize="medium">スピーカーの選択</DialogTitle>
      <DialogContent>
        <List dense disablePadding>
          {devices &&
            devices.map((d, i) => (
              <ListItem key={d.deviceId} value={d.deviceId}>
                <ListItemButton
                  selected={(!deviceId && i === 0) || deviceId === d.deviceId}
                  onClick={() => handleSelectSpeaker(d.deviceId)}
                >
                  <ListItemText primary={d.label} />
                </ListItemButton>
              </ListItem>
            ))}
        </List>
      </DialogContent>
    </Dialog>
  );
}
