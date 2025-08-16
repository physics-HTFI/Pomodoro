import {
  Dialog as MuiDialog,
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
import { useDialog } from "./_useDialog";
import { Suspense } from "react";
import { useAtomValue } from "jotai";
import { atomOpenSettingsDialog } from "./model/atomOpenSettingsDialog";
import { Loading } from "./_Loading";

/**
 * 設定ボタンを押したときに現れる選択ダイアログ
 */
export function Dialog() {
  const open = useAtomValue(atomOpenSettingsDialog);
  if (!open) return null; // ダイアログを開くまでデバイスの取得を行わないようにする（オーディオアクセスを許可するかのダイアログが出るのを防ぐため）
  return (
    <Suspense fallback={<Loading />}>
      <SettingsDialog0 />
    </Suspense>
  );
}

function SettingsDialog0() {
  const {
    fileName,
    devices, // ここがSuspenseを引き起こす
    selectedIndex,
    selectFile,
    unselectFile,
    handleSelectSpeaker,
    handleClose,
  } = useDialog();

  return (
    <MuiDialog onClose={handleClose} open>
      <DialogTitle fontSize="medium">バックアップファイルの選択</DialogTitle>
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
                  selected={selectedIndex === i}
                  onClick={async () => await handleSelectSpeaker(d.deviceId)}
                >
                  <ListItemText primary={d.label} />
                </ListItemButton>
              </ListItem>
            ))}
        </List>
      </DialogContent>
    </MuiDialog>
  );
}
