import { atomWithStorage } from "jotai/utils";

/**
 * 設定された値は`LocalStrage`に保存される
 */
export const atomDeviceId = atomWithStorage("deviceID", "", undefined, {
  getOnInit: true,
});
