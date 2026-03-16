const STORAGE_KEYS = {
  dailyAlexa: "cirion-wheel-daily-alexa",
};

const WHEEL_SEGMENTS = [
  {
    id: "special-1",
    type: "special",
    label: ["Special", "Gift"],
    prize: "a Cirion special gift",
  },
  {
    id: "no-luck-1",
    type: "noLuck",
    label: ["Not this", "time"],
  },
  {
    id: "replay-1",
    type: "replay",
    label: ["Spin", "Again"],
  },
  {
    id: "no-luck-2",
    type: "noLuck",
    label: ["Not this", "time"],
  },
  {
    id: "special-2",
    type: "special",
    label: ["Special", "Gift"],
    prize: "a Cirion special gift",
  },
  {
    id: "no-luck-3",
    type: "noLuck",
    label: ["Not this", "time"],
  },
  {
    id: "alexa-1",
    type: "alexa",
    label: ["Alexa", "of the Day"],
    prize: "an Amazon Alexa",
  },
  {
    id: "replay-2",
    type: "replay",
    label: ["Spin", "Again"],
  },
];

const state = {
  screen: "home",
  spinCount: 0,
  currentRotation: 0,
  isSpinning: false,
  activeOutcome: null,
  celebrationTimer: null,
  returnTimer: null,
  returnCountdownTimer: null,
  audioContext: null,
};

const elements = {
  screens: {
    home: document.querySelector("#homeScreen"),
    wheel: document.querySelector("#wheelScreen"),
  },
  startTrigger: document.querySelector("#startTrigger"),
  wheelButton: document.querySelector("#wheelButton"),
  wheelRotor: document.querySelector("#wheelRotor"),
  wheelLabels: document.querySelector("#wheelLabels"),
  statusNote: document.querySelector("#statusNote"),
  playAgainButton: document.querySelector("#playAgainButton"),
  backHomeButton: document.querySelector("#backHomeButton"),
  overlay: document.querySelector("#overlay"),
  overlayEyebrow: document.querySelector("#overlayEyebrow"),
  overlayTitle: document.querySelector("#overlayTitle"),
  overlayDescription: document.querySelector("#overlayDescription"),
  overlayActionButton: document.querySelector("#overlayActionButton"),
  celebration: document.querySelector("#celebration"),
};

function init() {
  renderWheelLabels();
  bindEvents();
  showScreen("home");
}

function bindEvents() {
  elements.startTrigger.addEventListener("click", () => {
    unlockAudio();
    clearReturnTimers();
    hideOverlay();
    resetRound();
    showScreen("wheel");
    setStatusNote(getReadyMessage());
    window.requestAnimationFrame(() => elements.wheelButton.focus());
  });

  elements.wheelButton.addEventListener("click", () => {
    unlockAudio();
    handleSpin();
  });

  elements.playAgainButton.addEventListener("click", () => {
    unlockAudio();
    clearReturnTimers();
    hideOverlay();
    resetRound();
    setStatusNote(getReadyMessage("Ready for another spin."));
    window.requestAnimationFrame(() => elements.wheelButton.focus());
  });

  elements.backHomeButton.addEventListener("click", () => {
    finalizeRoundAndReturn();
  });

  elements.overlayActionButton.addEventListener("click", handleOverlayAction);
}

function renderWheelLabels() {
  const fragment = document.createDocumentFragment();

  WHEEL_SEGMENTS.forEach((segment, index) => {
    const label = document.createElement("div");
    label.className = "wheel-label";
    label.style.setProperty("--index", String(index));
    label.innerHTML = segment.label.map((line) => `<span>${line}</span>`).join("");
    fragment.appendChild(label);
  });

  elements.wheelLabels.replaceChildren(fragment);
}

function handleSpin() {
  if (state.isSpinning) {
    return;
  }

  clearReturnTimers();
  hideOverlay();

  const candidates = WHEEL_SEGMENTS.map((segment, index) => ({ segment, index })).filter(
    ({ segment }) => canLandOnSegment(segment),
  );

  if (!candidates.length) {
    setStatusNote("No available outcomes were found. Tap Play Again to reset the wheel.");
    return;
  }

  const chosen = candidates[Math.floor(Math.random() * candidates.length)];
  state.spinCount += 1;
  state.isSpinning = true;
  state.activeOutcome = chosen.segment;

  elements.wheelButton.classList.add("is-disabled");
  setStatusNote(`Spin ${state.spinCount}: the wheel is spinning...`);

  const desiredRotation = getDesiredRotationForSegment(chosen.index);
  const currentNormalized = normalizeAngle(state.currentRotation);
  let delta = desiredRotation - currentNormalized;

  if (delta < 0) {
    delta += 360;
  }

  const extraTurns = 5 + Math.floor(Math.random() * 2);
  state.currentRotation += extraTurns * 360 + delta;
  elements.wheelRotor.style.transition =
    "transform var(--spin-duration) cubic-bezier(0.14, 0.8, 0.18, 1)";
  elements.wheelRotor.style.transform = `rotate(${state.currentRotation}deg)`;

  window.setTimeout(() => {
    state.isSpinning = false;
    elements.wheelButton.classList.remove("is-disabled");
    handleSpinOutcome(chosen.segment);
  }, 5500);
}

function canLandOnSegment(segment) {
  if (segment.type === "alexa" && !isAlexaAvailable()) {
    return false;
  }

  if (segment.type === "replay" && state.spinCount >= 1) {
    return false;
  }

  return true;
}

function handleSpinOutcome(outcome) {
  switch (outcome.type) {
    case "noLuck":
      playResultSound("lose");
      showFinalOverlay({
        eyebrow: "Maybe next time",
        title: "Not this time",
        description: "Thanks for playing. Tap Play Again for a new spin.",
        statusMessage: "Not this time.",
      });
      break;

    case "replay":
      showOverlay({
        eyebrow: "Bonus spin",
        title: "Spin again",
        description: "You earned one extra spin. Tap the button below to spin again.",
        actionLabel: "Spin Again",
        actionMode: "replay",
      });
      setStatusNote("Bonus spin unlocked. Tap Spin Again to keep playing.");
      break;

    case "special":
      playResultSound("win");
      triggerCelebration();
      showFinalOverlay({
        eyebrow: "Winner",
        title: "You won a special gift",
        description: "Take your prize with the Cirion team.",
        statusMessage: "Winner! You got a Cirion special gift.",
      });
      break;

    case "alexa":
      markAlexaAsClaimed();
      playResultSound("win");
      triggerCelebration();
      showFinalOverlay({
        eyebrow: "Winner",
        title: "You won an Alexa",
        description: "Take your prize with the Cirion team.",
        statusMessage: "Winner! You got the Alexa of the Day.",
      });
      break;

    default:
      break;
  }
}

function showFinalOverlay({ eyebrow, title, description, statusMessage }) {
  showOverlay({
    eyebrow,
    title,
    description,
    actionLabel: "Play Again",
    actionMode: "playAgain",
  });
  scheduleReturnHome(statusMessage);
}

function showOverlay({ eyebrow, title, description, actionLabel, actionMode }) {
  elements.overlay.hidden = false;
  elements.overlayEyebrow.textContent = eyebrow;
  elements.overlayTitle.textContent = title;
  elements.overlayDescription.textContent = description;
  elements.overlayActionButton.hidden = false;
  elements.overlayActionButton.textContent = actionLabel;
  elements.overlayActionButton.dataset.mode = actionMode;
}

function hideOverlay() {
  elements.overlay.hidden = true;
  elements.overlayActionButton.hidden = true;
  elements.overlayActionButton.textContent = "";
  elements.overlayActionButton.dataset.mode = "";
}

function handleOverlayAction() {
  const mode = elements.overlayActionButton.dataset.mode;

  clearReturnTimers();
  hideOverlay();

  if (mode === "replay") {
    setStatusNote("Extra spin ready. Tap the wheel to spin again.");
    return;
  }

  if (mode === "playAgain") {
    resetRound();
    setStatusNote(getReadyMessage("Ready for another spin."));
    window.requestAnimationFrame(() => elements.wheelButton.focus());
  }
}

function scheduleReturnHome(baseMessage) {
  clearReturnTimers();

  const totalSeconds = 5;
  let secondsRemaining = totalSeconds;
  updateReturnCountdownMessage(baseMessage, secondsRemaining);

  state.returnCountdownTimer = window.setInterval(() => {
    secondsRemaining -= 1;

    if (secondsRemaining <= 0) {
      window.clearInterval(state.returnCountdownTimer);
      return;
    }

    updateReturnCountdownMessage(baseMessage, secondsRemaining);
  }, 1000);

  state.returnTimer = window.setTimeout(() => {
    finalizeRoundAndReturn();
  }, totalSeconds * 1000);
}

function updateReturnCountdownMessage(baseMessage, secondsRemaining) {
  const label = secondsRemaining === 1 ? "second" : "seconds";
  setStatusNote(
    `${baseMessage} Tap Play Again or wait ${secondsRemaining} ${label} to go back to the start screen.`,
  );
}

function finalizeRoundAndReturn() {
  clearReturnTimers();
  hideOverlay();
  resetRound();
  showScreen("home");
}

function clearReturnTimers() {
  if (state.returnTimer) {
    window.clearTimeout(state.returnTimer);
    state.returnTimer = null;
  }

  if (state.returnCountdownTimer) {
    window.clearInterval(state.returnCountdownTimer);
    state.returnCountdownTimer = null;
  }
}

function resetRound() {
  state.spinCount = 0;
  state.activeOutcome = null;
  state.isSpinning = false;
  state.currentRotation = 0;
  clearCelebration();
  elements.wheelButton.classList.remove("is-disabled");
  elements.wheelRotor.style.transition = "none";
  elements.wheelRotor.style.transform = "rotate(0deg)";
  window.requestAnimationFrame(() => {
    elements.wheelRotor.style.transition = "";
  });
}

function showScreen(screenName) {
  state.screen = screenName;
  document.body.dataset.screen = screenName;

  Object.entries(elements.screens).forEach(([name, screen]) => {
    screen.classList.toggle("screen--active", name === screenName);
  });
}

function setStatusNote(message) {
  elements.statusNote.textContent = message;
}

function getReadyMessage(prefix = "Tap Spin to play.") {
  if (!isAlexaAvailable()) {
    return `${prefix} The Alexa of the Day has already been claimed.`;
  }

  return prefix;
}

function getTodayKey() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function readDailyAlexa() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.dailyAlexa);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    return null;
  }
}

function isAlexaAvailable() {
  const dailyAlexa = readDailyAlexa();
  return !dailyAlexa || dailyAlexa.date !== getTodayKey();
}

function markAlexaAsClaimed() {
  const payload = {
    date: getTodayKey(),
    claimedAt: new Date().toISOString(),
  };

  localStorage.setItem(STORAGE_KEYS.dailyAlexa, JSON.stringify(payload));
}

function getDesiredRotationForSegment(segmentIndex) {
  const segmentSize = 360 / WHEEL_SEGMENTS.length;
  const targetAngle = segmentIndex * segmentSize + segmentSize / 2;
  return 360 - targetAngle;
}

function normalizeAngle(angle) {
  return ((angle % 360) + 360) % 360;
}

function triggerCelebration() {
  clearCelebration();
  elements.celebration.hidden = false;

  const colors = [
    ["#ff2ac3", "#ffd1f5"],
    ["#48d8ff", "#c8f7ff"],
    ["#1d4eff", "#d6e0ff"],
    ["#ffffff", "#ff7dd7"],
  ];

  for (let index = 0; index < 10; index += 1) {
    const burst = document.createElement("span");
    const [primary, accent] = colors[index % colors.length];
    burst.className = "firework-burst";
    burst.style.left = `${10 + Math.random() * 80}%`;
    burst.style.top = `${12 + Math.random() * 56}%`;
    burst.style.setProperty("--firework-color", primary);
    burst.style.setProperty("--firework-accent", accent);
    burst.style.setProperty("--delay", `${index * 120}ms`);
    elements.celebration.appendChild(burst);
  }

  state.celebrationTimer = window.setTimeout(() => {
    clearCelebration();
  }, 2200);
}

function clearCelebration() {
  if (state.celebrationTimer) {
    window.clearTimeout(state.celebrationTimer);
    state.celebrationTimer = null;
  }

  elements.celebration.hidden = true;
  elements.celebration.replaceChildren();
}

function unlockAudio() {
  const AudioContextConstructor = window.AudioContext || window.webkitAudioContext;

  if (!AudioContextConstructor) {
    return;
  }

  if (!state.audioContext) {
    state.audioContext = new AudioContextConstructor();
  }

  if (state.audioContext.state === "suspended") {
    state.audioContext.resume().catch(() => {});
  }
}

function playResultSound(kind) {
  if (!state.audioContext) {
    return;
  }

  const now = state.audioContext.currentTime + 0.02;

  if (kind === "win") {
    playTone(now, 523.25, 0.14, "sine", 0.07);
    playTone(now + 0.12, 659.25, 0.16, "sine", 0.08);
    playTone(now + 0.26, 783.99, 0.22, "triangle", 0.09);
    return;
  }

  playTone(now, 240, 0.16, "sawtooth", 0.06);
  playTone(now + 0.14, 180, 0.22, "triangle", 0.05);
}

function playTone(startTime, frequency, duration, type, peakGain) {
  const oscillator = state.audioContext.createOscillator();
  const gainNode = state.audioContext.createGain();

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, startTime);
  gainNode.gain.setValueAtTime(0.0001, startTime);
  gainNode.gain.exponentialRampToValueAtTime(peakGain, startTime + 0.01);
  gainNode.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

  oscillator.connect(gainNode);
  gainNode.connect(state.audioContext.destination);

  oscillator.start(startTime);
  oscillator.stop(startTime + duration + 0.02);
}

init();
