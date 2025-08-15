import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { useState } from "react";

/**
 * MUIのスタイルをこの要素の中で定義する。
 * デフォルトだと<head>の中で定義されるので、ピクチャインピクチャから参照できない。
 */
export function StyleCache({ children }: { children: React.ReactNode }) {
  const [ref, setRef] = useState<unknown>();
  const cache = createCache({
    key: "css",
    container: ref as Node | undefined,
    prepend: true,
  });

  return (
    <>
      <style ref={setRef} />
      {!!ref && <CacheProvider value={cache}>{children}</CacheProvider>}
    </>
  );
}
