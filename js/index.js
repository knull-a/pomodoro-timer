let modeButtons = document.querySelector("#js-mode-buttons");

let timer = {
  pomodoro: 1,
  shortBreak: 1,
  longBreak: 1,
  longBreakInterval: 4,
  sessions: 0,
};

let interval;

modeButtons.addEventListener("click", handleMode);

function handleMode(e) {
  let { mode } = e.target.dataset;
  if (!mode) return;
  switchMode(mode);
  stopTimer();
}

function switchMode(mode) {
  timer.mode = mode;
  timer.remainingTime = {
    total: timer[mode] * 60,
    minutes: timer[mode],
    seconds: 0,
  };
  document
    .querySelectorAll("button[data-mode]")
    .forEach((e) => e.classList.remove("active"));
  document.querySelector(`[data-mode="${mode}"]`).classList.add("active");
  document.body.style.backgroundColor = `var(--${mode})`;
  updateClock();
}

function updateClock() {
  let { remainingTime } = timer;
  let minutes = `${remainingTime.minutes}`.padStart(2, "0");
  let seconds = `${remainingTime.seconds}`.padStart(2, "0");
  let min = document.querySelector("#js-minutes");
  let sec = document.querySelector("#js-seconds");
  min.textContent = minutes;
  sec.textContent = seconds;

  const text = timer.mode === "pomodoro" ? "Time to work!" : "Take a break!";
  document.title = `${minutes}:${seconds} — ${text}`;
}

function startTimer() {
  let { total } = timer.remainingTime;
  const endTime = Date.parse(new Date()) + total * 1000;
  if (timer.mode === "pomodoro") timer.sessions++;
  mainButton.dataset.action = "stop";
  mainButton.textContent = "stop";
  mainButton.classList.add("active");
  interval = setInterval(() => {
    timer.remainingTime = getRemainingTime(endTime);
    updateClock();
    total = timer.remainingTime.total;
    if (total <= 0) {
      clearInterval(interval);
      switch (timer.mode) {
        case "pomodoro":
          if (timer.sessions % timer.longBreakInterval === 0) {
            switchMode("longBreak");
          } else {
            switchMode("shortBreak");
          }
          break;
        default:
          switchMode("pomodoro");
      }

      startTimer();
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(interval);

  mainButton.dataset.action = "start";
  mainButton.textContent = "start";
  mainButton.classList.remove("active");
}

function getRemainingTime(endTime) {
  const currentTime = Date.parse(new Date());
  const difference = endTime - currentTime;
  const total = Number.parseInt(difference / 1000, 10);
  const minutes = Number.parseInt((total / 60) % 60, 10);
  const seconds = Number.parseInt(total % 60, 10);
  return {
    total,
    minutes,
    seconds,
  };
}

const mainButton = document.getElementById("js-btn");
mainButton.addEventListener("click", () => {
  const { action } = mainButton.dataset;
  action === "start" ? startTimer() : stopTimer();
});

document.addEventListener("DOMContentLoaded", () => {
  switchMode("pomodoro");
});
