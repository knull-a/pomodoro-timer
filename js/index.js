
const modeButtons = document.querySelector("#mode-buttons");

const mainButton = document.querySelector("#btn");

let interval;

const timer = {
  pomodoro: 25,
  shortBreak: 5,
  longBreak: 15,
  longBreakInterval: 4,
  sessions: 0,
};

mainButton.addEventListener("click", () => {
  const { action } = mainButton.dataset;
  action === "start" ? startTimer() : stopTimer();
});

document.addEventListener("DOMContentLoaded", () => {
  switchMode("pomodoro");
});

modeButtons.addEventListener("click", handleMode);

function handleMode(e) {
  const { mode } = e.target.dataset;
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
  // document.body.style.backgroundColor = `var(--${mode})`;
  updateClock();
}

function updateClock() {
  const { remainingTime } = timer;
  const minutes = `${remainingTime.minutes}`.padStart(2, "0");
  const seconds = `${remainingTime.seconds}`.padStart(2, "0");
  const min = document.querySelector("#minutes");
  const sec = document.querySelector("#seconds");
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

var player;

function onPlayerReady(event) {
  document.getElementById(ui.play).addEventListener("click", togglePlay);
  timeupdater = setInterval(initProgressBar, 100);
}

function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.ENDED) {
    document.getElementById(ui.play).classList.remove("pause");
    document.getElementById(ui.percentage).style.width = 0;
    document.getElementById(ui.currentTime).innerHTML = "00:00";
    player.seekTo(0, true);
  }
}

let ui = {
  play: "playAudio",
  audio: "audio",
  percentage: "percentage",
  seekObj: "seekObj",
  currentTime: "currentTime",
};

function togglePlay() {
  if (player.getPlayerState() === 1) {
    player.pauseVideo();
    document.getElementById(ui.play).classList.remove("pause");
  } else {
    player.playVideo();
    document.getElementById(ui.play).classList.add("pause");
  }
}


