/**
 * style要素を返す
 */
export const getStyle = () => style;

//|
//| ローカル
//|

const style = document.createElement("style");
const buttonStyle =
  "color:white; position:fixed; font-size:max(5svmin, 1rem); &:hover {cursor: pointer;}";
style.textContent =
  "#pomodoro-main {margin:0; background:#202124; display:flex; height:100svh; justify-content:center; align-items:center; user-select:none;}" +
  "#pomodoro-svg {width:100svmin; height:100svmin; position:fixed; font-size: 3%; font-family: fantasy;}" +
  "#pomodoro-popup-button, #pomodoro-speaker-button, #pomodoro-counter {}" +
  `#pomodoro-popup-button {bottom:0; right:0; ${buttonStyle}}` +
  `#pomodoro-counter {bottom:0; left:0; ${buttonStyle}}` +
  `#pomodoro-speaker-button {top:0; right:0; ${buttonStyle}}` +
  `#pomodoro-speaker-select {z-index: 1;}` +
  "@media screen and (max-width: 600px) { #pomodoro-popup-button, #pomodoro-speaker-button {display: none;} }" +
  "";