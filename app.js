const STORAGE_KEYS = {
  dailyAlexa: "cirion-wheel-daily-alexa",
  language: "cirion-wheel-language",
};

const DEFAULT_SPIN_DURATION_MS = 3683;

const WHEEL_SEGMENTS = [
  { id: "special-1", type: "special" },
  { id: "no-luck-1", type: "noLuck" },
  { id: "replay-1", type: "replay" },
  { id: "no-luck-2", type: "noLuck" },
  { id: "special-2", type: "special" },
  { id: "no-luck-3", type: "noLuck" },
  { id: "alexa-1", type: "alexa" },
  { id: "replay-2", type: "replay" },
];

const COPY = {
  en: {
    pageTitle: "Cirion Prize Wheel",
    languageToggle: "PT-BR",
    languageToggleAria: "Switch language to Portuguese (Brazil)",
    homeEyebrow: "Cirion interactive experience",
    homeTitle: "Tap the logo to play",
    homeCopy: "Spin the wheel and instantly see if you win.",
    startAria: "Start the Cirion prize wheel",
    logoAlt: "Cirion logo",
    wheelEyebrow: "Cirion Prize Wheel",
    wheelTitle: "Tap the wheel to spin",
    spinAria: "Spin the wheel",
    spinLabel: "SPIN",
    segmentLabels: {
      special: ["SPECIAL", "GIFT"],
      noLuck: ["NOT THIS", "TIME"],
      replay: ["SPIN", "AGAIN"],
      alexa: ["ALEXA", "OF THE DAY"],
    },
    overlay: {
      defaultEyebrow: "Result",
      defaultTitle: "Round result",
      maybeNextEyebrow: "Maybe next time",
      noLuckTitle: "NOT THIS TIME",
      noLuckDescription: "Thanks for playing. Tap Play Again for a new spin.",
      bonusEyebrow: "Bonus spin",
      spinAgainTitle: "SPIN AGAIN",
      spinAgainDescription: "You earned one extra spin. Tap the button below to spin again.",
      winnerEyebrow: "Winner",
      specialTitle: "YOU WON A SPECIAL GIFT",
      specialDescription: "Take your prize with the Cirion team.",
      alexaTitle: "YOU WON AN ALEXA",
      alexaDescription: "Take your prize with the Cirion team.",
      playAgainAction: "PLAY AGAIN",
      spinAgainAction: "SPIN AGAIN",
    },
    status: {
      ready: "Tap Spin to play.",
      readyNoAlexa: "Tap Spin to play. The Alexa of the Day has already been claimed.",
      noOutcomes: "No available outcomes were found.",
      spinning: "Spin {count}: the wheel is spinning...",
    },
  },
  "pt-BR": {
    pageTitle: "Roleta de Prêmios Cirion",
    languageToggle: "EN",
    languageToggleAria: "Mudar idioma para inglês",
    homeEyebrow: "Experiência interativa Cirion",
    homeTitle: "Toque na logo para jogar",
    homeCopy: "Gire a roleta e descubra na hora se você ganhou.",
    startAria: "Começar a roleta de prêmios da Cirion",
    logoAlt: "Logo da Cirion",
    wheelEyebrow: "Roleta de Prêmios Cirion",
    wheelTitle: "Toque na roleta para girar",
    spinAria: "Girar a roleta",
    spinLabel: "GIRE",
    segmentLabels: {
      special: ["BRINDE", "ESPECIAL"],
      noLuck: ["NÃO FOI", "DESSA VEZ"],
      replay: ["GIRE", "NOVAMENTE"],
      alexa: ["ALEXA", "DO DIA"],
    },
    overlay: {
      defaultEyebrow: "Resultado",
      defaultTitle: "Resultado da rodada",
      maybeNextEyebrow: "Talvez na próxima",
      noLuckTitle: "NÃO FOI DESSA VEZ",
      noLuckDescription: "Obrigado por jogar. Toque em Jogar de Novo para tentar mais uma vez.",
      bonusEyebrow: "Nova chance",
      spinAgainTitle: "GIRE NOVAMENTE",
      spinAgainDescription: "Você ganhou uma rodada extra. Toque no botão abaixo para girar de novo.",
      winnerEyebrow: "Vencedor",
      specialTitle: "VOCÊ GANHOU UM BRINDE ESPECIAL",
      specialDescription: "Retire seu prêmio com a equipe da Cirion.",
      alexaTitle: "VOCÊ GANHOU UMA ALEXA",
      alexaDescription: "Retire seu prêmio com a equipe da Cirion.",
      playAgainAction: "JOGAR DE NOVO",
      spinAgainAction: "GIRAR DE NOVO",
    },
    status: {
      ready: "Toque em GIRE para jogar.",
      readyNoAlexa: "Toque em GIRE para jogar. A Alexa do dia já foi entregue.",
      noOutcomes: "Nenhum resultado disponível foi encontrado.",
      spinning: "Giro {count}: a roleta está girando...",
    },
  },
};

const state = {
  screen: "home",
  language: readLanguage(),
  spinCount: 0,
  currentRotation: 0,
  isSpinning: false,
  activeOutcome: null,
  overlayConfig: null,
  statusNoteKey: "status.ready",
  statusNoteParams: {},
  celebrationTimer: null,
  returnTimer: null,
  returnCountdownTimer: null,
  audioUnlocked: false,
  sounds: null,
};

const elements = {
  screens: {
    home: document.querySelector("#homeScreen"),
    wheel: document.querySelector("#wheelScreen"),
  },
  languageToggle: document.querySelector("#languageToggle"),
  homeEyebrow: document.querySelector("#homeEyebrow"),
  homeTitle: document.querySelector("#homeTitle"),
  heroCopy: document.querySelector("#heroCopy"),
  startTrigger: document.querySelector("#startTrigger"),
  brandLogo: document.querySelector("#brandLogo"),
  wheelEyebrow: document.querySelector("#wheelEyebrow"),
  wheelTitle: document.querySelector("#wheelTitle"),
  wheelButton: document.querySelector("#wheelButton"),
  wheelCenterLabel: document.querySelector("#wheelCenterLabel"),
  wheelRotor: document.querySelector("#wheelRotor"),
  wheelLabels: document.querySelector("#wheelLabels"),
  statusNote: document.querySelector("#statusNote"),
  overlay: document.querySelector("#overlay"),
  overlayEyebrow: document.querySelector("#overlayEyebrow"),
  overlayTitle: document.querySelector("#overlayTitle"),
  overlayDescription: document.querySelector("#overlayDescription"),
  overlayActionButton: document.querySelector("#overlayActionButton"),
  celebration: document.querySelector("#celebration"),
};

function init() {
  state.sounds = createSoundBank();
  renderWheelLabels();
  bindEvents();
  applyLanguage();
  showScreen("home");
}

function bindEvents() {
  elements.languageToggle.addEventListener("click", toggleLanguage);

  elements.startTrigger.addEventListener("click", () => {
    unlockAudio();
    clearReturnTimers();
    hideOverlay();
    resetRound();
    showScreen("wheel");
    setStatusNote(getReadyStatusKey());
    window.requestAnimationFrame(() => elements.wheelButton.focus());
  });

  elements.wheelButton.addEventListener("click", () => {
    unlockAudio();
    handleSpin();
  });

  elements.overlayActionButton.addEventListener("click", handleOverlayAction);
}

function readLanguage() {
  const savedLanguage = localStorage.getItem(STORAGE_KEYS.language);
  return savedLanguage === "pt-BR" ? "pt-BR" : "en";
}

function toggleLanguage() {
  state.language = state.language === "en" ? "pt-BR" : "en";
  localStorage.setItem(STORAGE_KEYS.language, state.language);
  applyLanguage();
}

function applyLanguage() {
  document.documentElement.lang = state.language;
  document.title = t("pageTitle");
  elements.languageToggle.textContent = t("languageToggle");
  elements.languageToggle.setAttribute("aria-label", t("languageToggleAria"));
  elements.homeEyebrow.textContent = t("homeEyebrow");
  elements.homeTitle.textContent = t("homeTitle");
  elements.heroCopy.textContent = t("homeCopy");
  elements.startTrigger.setAttribute("aria-label", t("startAria"));
  elements.brandLogo.setAttribute("alt", t("logoAlt"));
  elements.wheelEyebrow.textContent = t("wheelEyebrow");
  elements.wheelTitle.textContent = t("wheelTitle");
  elements.wheelButton.setAttribute("aria-label", t("spinAria"));
  elements.wheelCenterLabel.textContent = t("spinLabel");
  renderWheelLabels();
  renderStatusNote();
  renderOverlay();
}

function renderWheelLabels() {
  const fragment = document.createDocumentFragment();

  WHEEL_SEGMENTS.forEach((segment, index) => {
    const labelLines = t(`segmentLabels.${segment.type}`);
    const label = document.createElement("div");
    label.className = "wheel-label";
    label.style.setProperty("--index", String(index));
    label.innerHTML = labelLines.map((line) => `<span>${line}</span>`).join("");
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
    setStatusNote("status.noOutcomes");
    return;
  }

  const chosen = pickWeightedCandidate(candidates);
  const spinDurationMs = getSpinDurationMs();
  state.spinCount += 1;
  state.isSpinning = true;
  state.activeOutcome = chosen.segment;

  elements.wheelButton.classList.add("is-disabled");
  playSpinSound();
  setStatusNote("status.spinning", { count: state.spinCount });

  const desiredRotation = getDesiredRotationForSegment(chosen.index);
  const currentNormalized = normalizeAngle(state.currentRotation);
  let delta = desiredRotation - currentNormalized;

  if (delta < 0) {
    delta += 360;
  }

  const extraTurns = 5 + Math.floor(Math.random() * 2);
  state.currentRotation += extraTurns * 360 + delta;
  elements.wheelRotor.style.transition =
    `transform ${spinDurationMs}ms cubic-bezier(0.14, 0.8, 0.18, 1)`;
  elements.wheelRotor.style.transform = `rotate(${state.currentRotation}deg)`;

  window.setTimeout(() => {
    state.isSpinning = false;
    elements.wheelButton.classList.remove("is-disabled");
    stopSpinSound();
    handleSpinOutcome(chosen.segment);
  }, spinDurationMs);
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

function pickWeightedCandidate(candidates) {
  let totalWeight = 0;

  for (const candidate of candidates) {
    totalWeight += getSegmentWeight(candidate.segment);
  }

  let threshold = Math.random() * totalWeight;

  for (const candidate of candidates) {
    threshold -= getSegmentWeight(candidate.segment);

    if (threshold <= 0) {
      return candidate;
    }
  }

  return candidates[candidates.length - 1];
}

function getSegmentWeight(segment) {
  switch (segment.type) {
    case "special":
      return 2;
    case "replay":
      return 2;
    case "alexa":
      return 1;
    case "noLuck":
    default:
      return 1;
  }
}

function handleSpinOutcome(outcome) {
  switch (outcome.type) {
    case "noLuck":
      playResultSound("lose");
      showFinalOverlay({
        eyebrowKey: "overlay.maybeNextEyebrow",
        titleKey: "overlay.noLuckTitle",
        descriptionKey: "overlay.noLuckDescription",
      });
      break;

    case "replay":
      showOverlay({
        eyebrowKey: "overlay.bonusEyebrow",
        titleKey: "overlay.spinAgainTitle",
        descriptionKey: "overlay.spinAgainDescription",
        actionLabelKey: "overlay.spinAgainAction",
        actionMode: "replay",
      });
      break;

    case "special":
      playResultSound("win");
      triggerCelebration();
      showFinalOverlay({
        eyebrowKey: "overlay.winnerEyebrow",
        titleKey: "overlay.specialTitle",
        descriptionKey: "overlay.specialDescription",
      });
      break;

    case "alexa":
      markAlexaAsClaimed();
      playResultSound("win");
      triggerCelebration();
      showFinalOverlay({
        eyebrowKey: "overlay.winnerEyebrow",
        titleKey: "overlay.alexaTitle",
        descriptionKey: "overlay.alexaDescription",
      });
      break;

    default:
      break;
  }
}

function showFinalOverlay({ eyebrowKey, titleKey, descriptionKey }) {
  showOverlay({
    eyebrowKey,
    titleKey,
    descriptionKey,
    actionLabelKey: "overlay.playAgainAction",
    actionMode: "playAgain",
  });
  scheduleReturnHome();
}

function showOverlay(config) {
  state.overlayConfig = config;
  elements.overlay.hidden = false;
  renderOverlay();
}

function renderOverlay() {
  if (!state.overlayConfig) {
    elements.overlayEyebrow.textContent = t("overlay.defaultEyebrow");
    elements.overlayTitle.textContent = t("overlay.defaultTitle");
    elements.overlayDescription.textContent = "";
    return;
  }

  elements.overlayEyebrow.textContent = t(state.overlayConfig.eyebrowKey);
  elements.overlayTitle.textContent = t(state.overlayConfig.titleKey);
  elements.overlayDescription.textContent = t(state.overlayConfig.descriptionKey);
  elements.overlayActionButton.hidden = false;
  elements.overlayActionButton.textContent = t(state.overlayConfig.actionLabelKey);
  elements.overlayActionButton.dataset.mode = state.overlayConfig.actionMode;
}

function hideOverlay() {
  state.overlayConfig = null;
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
    window.requestAnimationFrame(() => elements.wheelButton.focus());
    return;
  }

  if (mode === "playAgain") {
    resetRound();
    window.requestAnimationFrame(() => elements.wheelButton.focus());
  }
}

function scheduleReturnHome() {
  clearReturnTimers();
  state.returnTimer = window.setTimeout(() => {
    finalizeRoundAndReturn();
  }, 5000);
}

function finalizeRoundAndReturn() {
  clearReturnTimers();
  stopSpinSound();
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
  stopSpinSound();
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

function setStatusNote(key, params = {}) {
  state.statusNoteKey = key;
  state.statusNoteParams = params;
  renderStatusNote();
}

function renderStatusNote() {
  if (!elements.statusNote) {
    return;
  }

  elements.statusNote.textContent = t(state.statusNoteKey, state.statusNoteParams);
}

function getReadyStatusKey() {
  return isAlexaAvailable() ? "status.ready" : "status.readyNoAlexa";
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
  return normalizeAngle(360 - segmentIndex * segmentSize);
}

function normalizeAngle(angle) {
  return ((angle % 360) + 360) % 360;
}

function getSpinDurationMs() {
  const spinDurationSeconds = state.sounds?.spin?.duration;

  if (Number.isFinite(spinDurationSeconds) && spinDurationSeconds > 0) {
    return Math.round(spinDurationSeconds * 1000);
  }

  return DEFAULT_SPIN_DURATION_MS;
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
  if (!state.sounds || state.audioUnlocked) {
    return;
  }

  state.audioUnlocked = true;

  Object.values(state.sounds).forEach((sound) => {
    sound.muted = true;
    sound
      .play()
      .then(() => {
        sound.pause();
        sound.currentTime = 0;
      })
      .catch(() => {})
      .finally(() => {
        sound.muted = false;
      });
  });
}

function playResultSound(kind) {
  if (!state.sounds) {
    return;
  }

  if (kind === "win") {
    playSound(state.sounds.win);
    return;
  }

  playSound(state.sounds.lose);
}

function createSoundBank() {
  const spin = new Audio("./assets/audio/spin.mp3");
  const win = new Audio("./assets/audio/win.mp3");
  const lose = new Audio("./assets/audio/lose.mp3");

  spin.preload = "auto";
  spin.loop = false;
  win.preload = "auto";
  lose.preload = "auto";

  return { spin, win, lose };
}

function playSpinSound() {
  if (!state.sounds) {
    return;
  }

  state.sounds.spin.currentTime = 0;
  state.sounds.spin.play().catch(() => {});
}

function stopSpinSound() {
  if (!state.sounds) {
    return;
  }

  state.sounds.spin.pause();
  state.sounds.spin.currentTime = 0;
}

function playSound(sound) {
  if (!sound) {
    return;
  }

  sound.pause();
  sound.currentTime = 0;
  sound.play().catch(() => {});
}

function t(key, params = {}) {
  const value = key.split(".").reduce((currentValue, part) => currentValue?.[part], COPY[state.language]);

  if (Array.isArray(value)) {
    return value;
  }

  if (typeof value !== "string") {
    return "";
  }

  return Object.entries(params).reduce((text, [param, replacement]) => {
    return text.replaceAll(`{${param}}`, String(replacement));
  }, value);
}

init();
