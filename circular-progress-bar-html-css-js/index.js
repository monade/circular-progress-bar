const DIAMETER = 500;
const COLOR = "#ff0000";
const BORDER_WIDTH = 20;
const BACKGROUND_COLOR = '#ffffff';

let inputRef = null;
let rightBar = null;
let leftBar = null;
let rightProgress = null;
let leftProgress = null;
let circularRef = null;
let content = null;

function makeProgressBarInteractive() {
  inputRef = document.getElementsByTagName("input")[0];

  inputRef.addEventListener("input", updateCiruclarProgressBar);
  inputRef.value = 0;
}

function init() {
  circularRef = document.getElementsByClassName("circular")[0];

  circularRef.style.height = DIAMETER + "px";
  circularRef.style.width = DIAMETER + "px";

  content = document.getElementsByClassName("content")[0];
  content.style.height = DIAMETER - BORDER_WIDTH + "px";
  content.style.width = DIAMETER - BORDER_WIDTH + "px";
  content.style.backgroundColor = BACKGROUND_COLOR;

  rightBar = document.getElementsByClassName("bar")[0];
  leftBar = document.getElementsByClassName("bar")[1];
  rightProgress = document.getElementsByClassName("progress")[0];
  leftProgress = document.getElementsByClassName("progress")[1];

  rightBar.style.clip = `rect(0px, ${DIAMETER}px, ${DIAMETER}px, ${DIAMETER / 2}px)`;
  rightProgress.style.clip = `rect(0px, ${DIAMETER / 2}px, ${DIAMETER}px, 0px)`;

  leftBar.style.clip = `rect(0px, ${DIAMETER / 2}px, ${DIAMETER}px, 0px)`;
  leftProgress.style.clip = `rect(0px, ${DIAMETER}px, ${DIAMETER}px, ${DIAMETER / 2}px)`;

  rightProgress.style.backgroundColor = `${COLOR}`;
  leftProgress.style.backgroundColor = `${COLOR}`;

  makeProgressBarInteractive();
}

function updateCiruclarProgressBar(event) {
  const percentage = event.target.value / 100;
  rightProgress.style.transform = `rotate(${percentage < 0.5 ? percentage * 2 * 180 : 180}deg)`;
  leftProgress.style.transform = `rotate(${percentage > 0.5 ? percentage * 2 * 180 + 180 : 0}deg)`;

  content.firstElementChild.innerHTML = `${event.target.value}%`;
}

function docReady(fn) {
  if (document.readyState === "complete" || document.readyState === "interactive") {
    setTimeout(fn, 1);
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
}
docReady(init);
