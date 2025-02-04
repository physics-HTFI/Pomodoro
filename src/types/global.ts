// JavaScriptの試験的な機能を使っているので、それらの型を設定しておく。
declare global {
  interface FileSystemFileHandle {
    requestPermission: (options?: {
      mode?: "read" | "write" | "readwrite";
    }) => Promise<PermissionState>;
  }

  interface AudioContext {
    setSinkId: (id: string) => Promise<unknown>;
    sinkId: string;
  }
}
