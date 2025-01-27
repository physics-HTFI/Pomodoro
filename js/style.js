/**
 * style要素を返す
 */
export const getStyle = () => style;

//|
//| ローカル
//|

const style = document.createElement("style");
const buttonStyle =
  "color:white; position:fixed; font-size:max(5svmin, 1rem); &:hover {cursor:pointer; opacity:0.5;}";
style.textContent =
  "#pomodoro-main {margin:0; background:#202124; display:flex; height:100svh; justify-content:center; align-items:center; user-select:none; flex-direction: column;}" +
  "#pomodoro-svg {width:100svmin; font-size: 3%; font-family: fantasy;}" +
  "#pomodoro-counter {color:white; font-size:max(2svmin, 0.6rem); align-self:start; white-space:nowrap; width: 100%;}" +
  "#pomodoro-counter > div {padding-inline:8px;}" +
  "#pomodoro-counter {&:hover {cursor:pointer; background:#2a2a2a}}" +
  "#pomodoro-counter span:first-child {margin-left: 0; font-size:1.2em;}" +
  "#pomodoro-counter span+span {padding-left: 0.5em;}" +
  "#pomodoro-counter .日 {color: salmon;}" +
  "#pomodoro-counter .土 {color: deepskyblue;}" +
  "#pomodoro-counter .月1 {color: salmon;}" +
  "#pomodoro-counter .月7 {color: deepskyblue;}" +
  `#pomodoro-popup-button {top:0; right:0; ${buttonStyle}}` +
  `#pomodoro-speaker-button {top:0; right:6svmin; ${buttonStyle}}` +
  "#pomodoro-speaker-select {z-index: 1;}" +
  "@media screen and (max-width: 600px) { #pomodoro-popup-button, #pomodoro-speaker-button {display: none;} }" +
  "";
