const modeButtons = document.querySelector("#mode-buttons");
const mainButton = document.querySelector("#btn");
const menuButton = document.querySelector("#menu");
const closeMenuButton = document.querySelector("#menu-close");

const folderMenu = document.querySelector("#menu-opened");

const audiosList = document.querySelectorAll("#footer-audios img");
const backgroundsList = document.querySelectorAll("#footer-backgrounds img");

const timer = {
  pomodoro: 25,
  shortBreak: 5,
  longBreak: 15,
  longBreakInterval: 4,
  sessions: 0,
};

let interval;

let player;

let ui = {
  play: "playAudio",
  audio: "audio",
};

mainButton.addEventListener("click", () => {
  const { action } = mainButton.dataset;
  const audio = new Audio('./audio/click.wav');
  audio.play()
  action === "start" ? startTimer() : stopTimer();
});

modeButtons.addEventListener("click", handleMode);

menuButton.addEventListener("click", openMenu);

document.addEventListener("DOMContentLoaded", () => {
  switchMode("pomodoro");
});

closeMenuButton.addEventListener("click", () => {
  folderMenu.classList.add("none")
});

audiosList.forEach(el => {
  el.addEventListener("click", () => {
    player.loadVideoById(String(el.dataset.id));
  });
});

backgroundsList.forEach(el => {
  el.addEventListener("click", () => {
    let app = document.querySelector(".app")
    let backgroundSource = el.src
    app.style.background = `url('${backgroundSource}') no-repeat`;
    app.style.backgroundSize = "cover";
    document.documentElement.style.setProperty('--color-primary', `${el.dataset.id}`) 
  })
});

function handleMode(e) {
  const { mode } = e.target.dataset;
  if (!mode) return;
  switchMode(mode);
  stopTimer();
};

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
};

function updateClock() {
  const { remainingTime } = timer;
  const minutes = `${remainingTime.minutes}`.padStart(2, "0");
  const seconds = `${remainingTime.seconds}`.padStart(2, "0");
  const min = document.querySelector("#minutes");
  const sec = document.querySelector("#seconds");
  const text = timer.mode === "pomodoro" ? "Time to work!" : "Take a break!";

  min.textContent = minutes;
  sec.textContent = seconds;
  document.title = `${minutes}:${seconds} — ${text}`;
};

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
};

function stopTimer() {
  clearInterval(interval);
  mainButton.dataset.action = "start";
  mainButton.textContent = "start";
  mainButton.classList.remove("active");
};

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
  }
};

(function setupPlayer() {
  var tag = document.createElement("script");

  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName("script")[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
})();

function onYouTubeIframeAPIReady() {
  player = new window.YT.Player("player", {
    height: "360",
    width: "640",
    videoId: "jfKfPfyJRdk",
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
      
    },
  })
};

function onPlayerReady(event) {
  document.getElementById(ui.play).addEventListener("click", togglePlay);
};

function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.ENDED) {
    document.getElementById(ui.play).classList.remove("pause");
    player.seekTo(0, true);
  }
};

function togglePlay() {
  if (player.getPlayerState() === 1) {
    player.pauseVideo();
    document.getElementById(ui.play).classList.remove("pause");
  } else {
    player.playVideo();
    document.getElementById(ui.play).classList.add("pause");
  }
};

function openMenu() {
  folderMenu.classList.remove("none");
  // add blur filter at background (body)
};

function changeAudio(e) {
  const elems = document.querySelectorAll('.footer__audio-active');
  [].forEach.call(elems, function(el) {
    el.classList.remove('footer__audio-active');
  });
  e.target.classList.add("footer__audio-active");
};

function changeBackground(e) {
  const elems = document.querySelectorAll(".footer__background-active");
  [].forEach.call(elems, function (el) {
    el.classList.remove("footer__background-active");
  });
  e.target.classList.add("footer__background-active");
};

function openTab(e, tabName) {
  const tabsContainer = document.querySelectorAll(".footer__container");
  const menuTabs = document.querySelectorAll(".footer__tabs");
  tabsContainer.forEach(el => {
    el.classList.add("none");
  });
  menuTabs.forEach(el => {
    el.classList.remove("menu-active");
  });
  document.getElementById(tabName).classList.remove("none");
  e.currentTarget.classList.add("menu-active");
};


