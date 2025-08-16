import { atom } from "jotai";

export const atomTicker = atom(() => new Ticker());

//|
//| private
//|

/**
 * 一定間隔で処理を行うためのクラス
 */
class Ticker {
  #id?: number;

  /** ティックの開始／停止を切り替える */
  toggle(
    interval: number,
    onToggleOff: () => void,
    onToggleOn: () => void,
    onTick: () => void
  ) {
    const isRunning = this.#id !== undefined;
    if (isRunning) {
      this.stop();
      onToggleOff();
    } else {
      this.#id = window.setInterval(onTick, interval);
      onToggleOn();
    }
  }

  /** ティックを停止する */
  stop() {
    clearInterval(this.#id);
    this.#id = undefined;
  }
}
