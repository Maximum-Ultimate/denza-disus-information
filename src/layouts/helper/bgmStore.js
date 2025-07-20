let bgmAudio;

export function initBGM(bgmGame) {
  if (!bgmAudio) {
    bgmAudio = new Audio(bgmGame);
    bgmAudio.loop = true;
    bgmAudio.volume = 0.3;
  }
  return bgmAudio;
}

export function playBGM() {
  if (bgmAudio) {
    bgmAudio.play().catch(() => {});
  }
}

export function pauseBGM() {
  if (bgmAudio) {
    const fadeOut = setInterval(() => {
      if (bgmAudio.volume > 0.05) {
        bgmAudio.volume -= 0.05;
      } else {
        clearInterval(fadeOut);
        bgmAudio.pause();
        bgmAudio.volume = 0.3;
      }
    }, 50);
  }
}

export function stopBGM() {
  if (bgmAudio) {
    bgmAudio.pause();
    bgmAudio.currentTime = 0;
  }
}
