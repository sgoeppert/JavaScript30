/* get the elements */
const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");
const fullscreen = player.querySelector(".fullscreen");

/* build the functions */
function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function updateButton() {
  toggle.textContent = video.paused ? "►" : "❚ ❚";
}

function skip() {
  const amount = parseFloat(this.dataset.skip);
  video.currentTime += amount;
}

function handleSlider() {
  const property = this.name;
  video[property] = this.value;
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

function toggleFullscreen() {
  // If the player is in fullscreen, exit fullscreen
  if (document.webkitFullscreenElement === player) {
    document.webkitExitFullscreen();
    return;
  }

  if (player.requestFullscreen) {
    player.requestFullscreen();
  } else if (player.webkitRequestFullscreen) {
    player.webkitRequestFullscreen();
  }
}
/* hook up events */
video.addEventListener("click", togglePlay);
toggle.addEventListener("click", togglePlay);

video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);

video.addEventListener("timeupdate", handleProgress);

skipButtons.forEach(button => button.addEventListener("click", skip));
ranges.forEach(slider => slider.addEventListener("change", handleSlider));
ranges.forEach(slider => slider.addEventListener("mousemove", handleSlider));

let mouseDown = false;
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", e => mouseDown && scrub(e));
progress.addEventListener("mousedown", () => (mouseDown = true));
progress.addEventListener("mouseup", () => (mouseDown = false));

fullscreen.addEventListener("click", toggleFullscreen);
