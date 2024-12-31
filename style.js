/**
 * style要素を返す
 */
export const getStyle = () => style;

//|
//| ローカル
//|

const style = document.createElement("style");
style.textContent =
  "#pomodoro-main {margin:0; background:#202124; display:flex; height:100svh; justify-content:center; align-items:center; user-select:none;}" +
  "#pomodoro-svg {width:100svmin; height:100svmin; position:fixed; font-size: 3%; font-family: fantasy;}" +
  "#pomodoro-popup-button {position:fixed; bottom:0; right:0; font-size:5svmin; &:hover {cursor: pointer;}}" +
  "#pomodoro-counter {color:white; position:fixed; bottom:0; left:0; font-size:5svmin; &:hover {cursor: pointer;}}";
