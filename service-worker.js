// 特に必要ないので何もしない。
// （キャッシュする場合はここでキャッシュに追加する。）
self.addEventListener("install", () => undefined);

// 必要なファイルはインターネット上から取得する。
// （キャッシュを用意している場合は、キャッシュから取得する処理を書く。）
self.addEventListener("fetch", (event) => {
  event.respondWith(fetch(event.request));
});
