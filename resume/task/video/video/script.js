const video = document.getElementById("video");

const rangeTime = document.querySelector(".rangeTime");
rangeTime.min = 0;

video.addEventListener("canplaythrough", function () {
  rangeTime.max = video.duration;
});

rangeTime.oninput = function () {
  video.currentTime = rangeTime.value;
}

video.addEventListener("timeupdate", function () {
  requestAnimationFrame(updateTimeAndRange);
});

function updateTimeAndRange() {
  rangeTime.value = video.currentTime;
  updateTimeLeft();
}

const rangeVolume = document.querySelector(".rangeVolume");
rangeVolume.min = 0;
rangeVolume.max = 1;
rangeVolume.step = 0.1;

rangeVolume.oninput = function () {
  video.volume = rangeVolume.value;
}

const playbackRate = document.getElementById("playbackRate");
playbackRate.innerText = video.playbackRate;

document.getElementById("volume_stop").onclick = function () {
  if (video.muted) {
    video.muted = false;
    this.src = "images/voice_on.png";
  } else {
    video.muted = true;
    this.src = "images/voice_off.png";
  }
}

document.getElementById("play").onclick = function () {
  if (video.paused) {
    video.play();
    this.src = "images/pause.png";
  } else {
    video.pause();
    this.src = "images/play.png";
  }
}

document.getElementById("slower").onclick = function () {
  if (video.playbackRate <= 1) {
    if (video.playbackRate === 1) {
      video.playbackRate = 0.75;
    } else if (video.playbackRate === 0.75) {
      video.playbackRate = 0.5;
    } else if (video.playbackRate === 0.5) {
      video.playbackRate = 1;
    }
  } else {
    video.playbackRate -= 1;
  }
  playbackRate.innerText = video.playbackRate;
}

document.getElementById("faster").onclick = function () {
  if (video.playbackRate >= 10) {
    video.playbackRate = 1;
  } else {
    if (video.playbackRate === 0.5) {
      video.playbackRate = 0.75;
    } else if (video.playbackRate === 0.75) {
      video.playbackRate = 1;
    } else {
      video.playbackRate += 1;
    }
  }
  playbackRate.innerText = video.playbackRate;
}

document.getElementById("back").onclick = function () {
  video.currentTime -= 5;
  if (video.currentTime < 0) video.currentTime = 0;
}

document.getElementById("next").onclick = function () {
  video.currentTime += 5;
  if (video.currentTime > video.duration) video.currentTime = video.duration;
}

document.getElementById("full").onclick = function () {
  video.requestFullscreen();
}

function updateTimeLeft() {
  const timer = document.getElementById("timer");
  const remainingTime = video.duration - video.currentTime;
  const minutes = Math.floor(remainingTime / 60);
  const seconds = Math.floor(remainingTime % 60);
  const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  timer.innerText = formattedTime;
}
