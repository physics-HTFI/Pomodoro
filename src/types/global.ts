// JavaScriptの試験的な機能を使っているので、それらの型を設定しておく。
declare global {
  interface FileSystemFileHandle {
    requestPermission: (options?: {
      mode?: "read" | "write" | "readwrite";
    }) => Promise<PermissionState>;
    // https://developer.mozilla.org/ja/docs/Web/API/FileSystemHandle/requestPermission
  }

  interface AudioContext {
    setSinkId: (id: string) => Promise<unknown>;
    // https://developer.mozilla.org/ja/docs/Web/API/AudioContext/setSinkId

    sinkId: string;
    // https://developer.mozilla.org/ja/docs/Web/API/AudioContext/sinkId
  }
}
