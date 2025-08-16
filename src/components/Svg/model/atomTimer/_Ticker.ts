/**
 * 一定間隔で処理を行うためのクラス
 */
export class Ticker {
  #id?: number;

  /** ティックの開始／停止を切り替える */
  toggle(
    interval: number,
    handleToggleOff: () => void,
    handleToggleOn: () => void,
    handleTick: () => void
  ) {
    const isRunning = this.#id !== undefined;
    if (isRunning) {
      this.stop();
      handleToggleOff();
    } else {
      this.#id = window.setInterval(handleTick, interval);
      handleToggleOn();
    }
  }

  /** ティックを停止する */
  stop() {
    clearInterval(this.#id);
    this.#id = undefined;
  }
}
