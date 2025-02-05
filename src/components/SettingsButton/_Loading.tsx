import { Dialog, DialogContent } from "@mui/material";

/**
 * デバイスの取得中のフォールバック
 */
export function Loading() {
  return (
    <Dialog open>
      <DialogContent>デバイスの取得中...</DialogContent>
    </Dialog>
  );
}
