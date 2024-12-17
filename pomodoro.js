const openClock = () => {
  const WORK_SEC = 25 * 60;
  const BREAK_SEC = 5 * 60;
  const WORK_COLOR = "#4fff81";
  const BREAK_COLOR = "#ff6363";

  const body = document.body;
  const style = document.createElement("style");
  const time = document.createElement("div");
  const loops = document.createElement("span");
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  const audio = document.createElement("audio");
  style.textContent =
    "body {margin:0; background:black; display:flex; height:100svh; justify-content:center; align-items:center; user-select:none;}" +
    "div {font-size:25svmin; font-family:impact;}" +
    "svg {width:100svmin; height:100svmin; position:fixed;}" +
    "span {color:white; position:fixed; bottom:0; left:0;}";
  svg.setAttribute("viewBox", "-1 -1 2 2");
  audio.src = "sound.mp3";
  body.append(style, svg, time, loops);

  // タイマー表示
  const timer = {
    interval: undefined,
    type: "work",
    sec: WORK_SEC,
    loops: 0,
  };
  update();
  body.addEventListener(window.ontouchstart ? "touch" : "click", toggleTimer);

  function toggleTimer() {
    if (timer.interval !== undefined) {
      clearInterval(timer.interval);
      timer.interval = undefined;
      update();
      return;
    }
    timer.interval = setInterval(() => {
      timer.sec -= 1;
      if (timer.sec <= 0) {
        const endWork = timer.type === "work";
        timer.type = endWork ? "break" : "work";
        timer.sec = endWork ? BREAK_SEC : WORK_SEC;
        timer.loops += endWork ? 1 : 0;
        audio.play();
      }
      update();
    }, 1000);
    update();
  }
  function update() {
    const working = timer.type === "work";
    const Θ = timer.sec / (working ? WORK_SEC : BREAK_SEC);
    const sign = timer.sec < 0 ? "-" : "";
    const min = Math.abs(Math.trunc(timer.sec / 60));
    const sec = `${Math.abs(timer.sec % 60)}`.padStart(2, "0");
    time.innerHTML = `${sign}${min}:${sec}`;
    time.style.color = working ? WORK_COLOR : BREAK_COLOR;
    time.style.opacity = svg.style.opacity =
      timer.interval === undefined ? 0.5 : 1;
    loops.innerHTML = `🍅×${timer.loops}`;
    svg.innerHTML =
      getPath(working ? Θ : 0, true) + getPath(working ? 1 : Θ, false);
  }
  function getPath(Θ, isWork) {
    if (Θ < 0.001) return "";
    const r = isWork ? 0.9 : 0.85;
    const width = isWork ? 0.06 : 0.01;
    const color = isWork ? WORK_COLOR : BREAK_COLOR;
    const style = `fill="none" stroke="${color}" stroke-width="${width}"`;
    if (Θ > 0.999) return `<circle cx="0" cy="0" r="${r}" ${style}/>`;
    return `<path d="M ${r * Math.sin(Math.min(0.999, Θ) * 2 * Math.PI)} ${
      -r * Math.cos(Math.min(0.999, Θ) * 2 * Math.PI)
    } A ${r} ${r} 0 ${Θ < 0.5 ? 0 : 1} 0 ${r * Math.cos(0.5 * Math.PI)} ${
      -r * Math.sin(0.5 * Math.PI)
    } ${Θ >= 0.999 ? "z" : ""}" ${style}/>`;
  }
};

openClock();
