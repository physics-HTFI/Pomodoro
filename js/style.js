/**
 * style要素を返す
 */
export const getStyle = () => style;

//|
//| ローカル
//|

const style = document.createElement("style");
const buttonStyle = `
color: white;
position: fixed;
font-size: max(5svmin, 1rem);
&:hover {
  cursor: pointer;
  opacity: 0.5;
}
`;
style.textContent = `
#pomodoro-main {
  margin: 0;
  background: #202124;
  display: flex;
  height: 100svh;
  justify-content: center;
  align-items: center;
  user-select: none;
  flex-direction: column;
}
#pomodoro-svg {
  width: 100svmin;
  font-size: 3%;
  font-family: fantasy;
}
#pomodoro-counter {
  color: white;
  font-size: max(2svmin, 0.6rem);
  position: fixed;
  top: 0;
  left: 0;
  white-space: nowrap;
  width: 100%;
  & > div {
    padding-inline:8px;
  }
  &:hover {
    cursor:pointer; background:#334d;
  }
  & span:first-child {
    margin-left: 0;
    font-size: 1.2em;
  }
  & span+span {
    padding-left: 0.5em;
  }
  & .日 {color: salmon;}
  & .土 {color: deepskyblue;}
  & .月1 {color: salmon;}
  & .月7 {color: deepskyblue;}
  &:not(:hover) {
    & > #pomodoro-counter-週,
    & > #pomodoro-counter-月,
    & > #pomodoro-counter-年 {
      display:none;
    }
  }
}
#pomodoro-popup-button {
  bottom: 0;
  right: 0;
  ${buttonStyle}
}
#pomodoro-speaker-button {
  bottom: 0;
  right: 6svmin;
  ${buttonStyle}
}
#pomodoro-speaker-select {
  z-index: 1;
}
@media screen and (max-width: 600px) {
  #pomodoro-popup-button,
  #pomodoro-speaker-button {
    display: none;
  }
}
`;
