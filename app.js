const STORAGE_KEYS = {
  entries: "cirion-wheel-entries",
  dailyAlexa: "cirion-wheel-daily-alexa",
};

const WHEEL_SEGMENTS = [
  {
    id: "special-1",
    type: "special",
    label: ["Brinde", "Especial"],
    prize: "Brinde Especial da Cirion",
  },
  {
    id: "no-luck-1",
    type: "noLuck",
    label: ["Não foi", "dessa vez"],
  },
  {
    id: "replay-1",
    type: "replay",
    label: ["Jogue", "de novo"],
  },
  {
    id: "no-luck-2",
    type: "noLuck",
    label: ["Não foi", "dessa vez"],
  },
  {
    id: "special-2",
    type: "special",
    label: ["Brinde", "Especial"],
    prize: "Brinde Especial da Cirion",
  },
  {
    id: "no-luck-3",
    type: "noLuck",
    label: ["Não foi", "dessa vez"],
  },
  {
    id: "alexa-1",
    type: "alexa",
    label: ["Alexa", "do dia"],
    prize: "Amazon Alexa",
  },
  {
    id: "replay-2",
    type: "replay",
    label: ["Jogue", "de novo"],
  },
];

const QUESTION_BANK = {
  FIBER: [
    {
      id: "fiber-standard-1",
      tier: "standard",
      prompt: "Qual tecnologia transmite dados por pulsos de luz?",
      options: ["Fibra óptica", "Cabo coaxial", "Par metálico comum"],
      correctIndex: 0,
    },
    {
      id: "fiber-standard-2",
      tier: "standard",
      prompt: "Em conectividade corporativa, a fibra costuma se destacar por entregar:",
      options: [
        "Alta velocidade e estabilidade",
        "Maior consumo de energia",
        "Sinal mais suscetível a interferência",
      ],
      correctIndex: 0,
    },
    {
      id: "fiber-standard-3",
      tier: "standard",
      prompt: "Uma empresa com operação crítica costuma buscar em FIBER principalmente:",
      options: [
        "Conexão confiável para manter o negócio rodando",
        "Troca diária de cabeamento",
        "Uso exclusivo para telefonia analógica",
      ],
      correctIndex: 0,
    },
    {
      id: "fiber-premium-1",
      tier: "premium",
      prompt: "Qual combinação faz mais sentido para uma rede corporativa baseada em fibra?",
      options: [
        "Baixa latência, escalabilidade e estabilidade",
        "Oscilações frequentes e pouca previsibilidade",
        "Dependência de sinal de rádio para funcionar",
      ],
      correctIndex: 0,
    },
  ],
  "DATA CENTER": [
    {
      id: "dc-standard-1",
      tier: "standard",
      prompt: "Um data center abriga principalmente:",
      options: [
        "Servidores, armazenamento e infraestrutura de rede",
        "Apenas notebooks em uso comum",
        "Somente materiais impressos de backup",
      ],
      correctIndex: 0,
    },
    {
      id: "dc-standard-2",
      tier: "standard",
      prompt: "Redundância em data center é importante para:",
      options: [
        "Manter serviços disponíveis mesmo em caso de falha",
        "Aumentar a temperatura dos equipamentos",
        "Evitar o uso de energia elétrica",
      ],
      correctIndex: 0,
    },
    {
      id: "dc-standard-3",
      tier: "standard",
      prompt: "Em um ambiente de data center, segurança operacional envolve:",
      options: [
        "Energia, climatização e monitoramento",
        "Somente decoração do espaço",
        "Apenas velocidade de Wi-Fi para visitantes",
      ],
      correctIndex: 0,
    },
    {
      id: "dc-premium-1",
      tier: "premium",
      prompt: "Qual cenário melhor representa o valor de um bom data center para empresas?",
      options: [
        "Disponibilidade, proteção e performance para aplicações críticas",
        "Uso eventual sem monitoramento nem contingência",
        "Dependência de um único ponto de falha",
      ],
      correctIndex: 0,
    },
  ],
};

const state = {
  screen: "home",
  participant: null,
  leadId: null,
  spinCount: 0,
  spinHistory: [],
  currentRotation: 0,
  isSpinning: false,
  isRegisterSubmitting: false,
  activeOutcome: null,
  activeQuestion: null,
  celebrationTimer: null,
  returnTimer: null,
  returnCountdownTimer: null,
};

const elements = {
  screens: {
    home: document.querySelector("#homeScreen"),
    register: document.querySelector("#registerScreen"),
    wheel: document.querySelector("#wheelScreen"),
  },
  startTrigger: document.querySelector("#startTrigger"),
  registerForm: document.querySelector("#registerForm"),
  fullName: document.querySelector("#fullName"),
  phone: document.querySelector("#phone"),
  email: document.querySelector("#email"),
  registerFeedback: document.querySelector("#registerFeedback"),
  registerSubmitButton: document.querySelector("#registerSubmitButton"),
  backHomeButton: document.querySelector("#backHomeButton"),
  wheelButton: document.querySelector("#wheelButton"),
  wheelRotor: document.querySelector("#wheelRotor"),
  wheelLabels: document.querySelector("#wheelLabels"),
  wheelFace: document.querySelector("#wheelFace"),
  statusNote: document.querySelector("#statusNote"),
  restartFlowButton: document.querySelector("#restartFlowButton"),
  overlay: document.querySelector("#overlay"),
  overlayEyebrow: document.querySelector("#overlayEyebrow"),
  overlayTitle: document.querySelector("#overlayTitle"),
  overlayDescription: document.querySelector("#overlayDescription"),
  overlayFeedback: document.querySelector("#overlayFeedback"),
  overlayActionButton: document.querySelector("#overlayActionButton"),
  closeOverlayButton: document.querySelector("#closeOverlayButton"),
  quizForm: document.querySelector("#quizForm"),
  quizPrompt: document.querySelector("#quizPrompt"),
  quizOptions: document.querySelector("#quizOptions"),
  celebration: document.querySelector("#celebration"),
  adminPanel: document.querySelector("#adminPanel"),
  adminStats: document.querySelector("#adminStats"),
  downloadCsvButton: document.querySelector("#downloadCsvButton"),
  resetAlexaButton: document.querySelector("#resetAlexaButton"),
  clearDataButton: document.querySelector("#clearDataButton"),
};

function init() {
  renderWheelLabels();
  bindEvents();
  updateAlexaStatus();
  updateAdminPanel();
  showScreen("home");
}

function bindEvents() {
  elements.startTrigger.addEventListener("click", () => {
    showScreen("register");
    window.requestAnimationFrame(() => elements.fullName.focus());
  });

  elements.backHomeButton.addEventListener("click", () => {
    resetCurrentSession();
    showScreen("home");
  });

  elements.registerForm.addEventListener("submit", handleRegisterSubmit);
  elements.phone.addEventListener("input", handlePhoneInput);
  elements.phone.addEventListener("input", hideRegisterFeedback);
  elements.fullName.addEventListener("input", hideRegisterFeedback);
  elements.email.addEventListener("input", hideRegisterFeedback);
  elements.registerForm
    .querySelectorAll('input[name="interest"]')
    .forEach((radio) => radio.addEventListener("change", hideRegisterFeedback));
  elements.wheelButton.addEventListener("click", handleSpin);
  elements.restartFlowButton.addEventListener("click", () => {
    clearReturnTimers();
    hideOverlay();
    resetCurrentSession();
    showScreen("register");
    window.requestAnimationFrame(() => elements.fullName.focus());
  });

  elements.overlayActionButton.addEventListener("click", handleOverlayAction);
  elements.closeOverlayButton.addEventListener("click", () => {
    finalizeRoundAndReturn("Encerrado manualmente.");
  });

  elements.downloadCsvButton.addEventListener("click", downloadEntriesCsv);
  elements.resetAlexaButton.addEventListener("click", resetDailyAlexa);
  elements.clearDataButton.addEventListener("click", clearAllEntries);

  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get("admin") === "1") {
    document.body.classList.add("is-admin");
    elements.adminPanel.hidden = false;
  }
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

  elements.wheelLabels.appendChild(fragment);
}

function handlePhoneInput(event) {
  const digits = event.target.value.replace(/\D/g, "").slice(0, 11);

  if (!digits) {
    event.target.value = "";
    return;
  }

  if (digits.length <= 2) {
    event.target.value = `(${digits}`;
    return;
  }

  if (digits.length <= 7) {
    event.target.value = `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    return;
  }

  if (digits.length <= 10) {
    event.target.value = `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
    return;
  }

  event.target.value = `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

async function handleRegisterSubmit(event) {
  event.preventDefault();

  if (state.isRegisterSubmitting) {
    return;
  }

  const formData = new FormData(elements.registerForm);
  const fullName = String(formData.get("fullName") || "").trim();
  const phone = String(formData.get("phone") || "").trim();
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const interest = String(formData.get("interest") || "").trim();

  const validation = validateRegisterData({ fullName, phone, email, interest });

  if (!validation.isValid) {
    showRegisterFeedback(validation.message);
    validation.field?.focus();
    return;
  }

  const participant = {
    fullName,
    phone,
    email,
    interest,
  };

  setRegisterSubmitting(true);
  hideRegisterFeedback();
  setStatusNote("Salvando cadastro no Supabase...");

  try {
    const lead = await createLeadRecord(participant);

    state.participant = participant;
    state.leadId = lead.id;
    state.spinCount = 0;
    state.spinHistory = [];
    state.activeOutcome = null;
    state.activeQuestion = null;
    updateParticipantSummary();
    setStatusNote("Cadastro salvo. Agora é só tocar na roleta.");
    showScreen("wheel");
  } catch (error) {
    console.error("Failed to create lead:", error);
    showRegisterFeedback("Não foi possível salvar o cadastro. Verifique a conexão e tente novamente.");
    setStatusNote("Falha ao salvar o cadastro no Supabase.");
  } finally {
    setRegisterSubmitting(false);
  }
}

function handleSpin() {
  if (state.isSpinning || !state.participant) {
    return;
  }

  clearReturnTimers();
  hideOverlay();

  const candidates = WHEEL_SEGMENTS.map((segment, index) => ({ segment, index })).filter(
    ({ segment }) => canLandOnSegment(segment),
  );

  if (!candidates.length) {
    setStatusNote("Nenhum resultado elegível foi encontrado. Reinicie a rodada.");
    return;
  }

  const chosen = candidates[Math.floor(Math.random() * candidates.length)];
  state.spinCount += 1;
  state.isSpinning = true;
  state.activeOutcome = chosen.segment;
  state.spinHistory.push({
    spinNumber: state.spinCount,
    outcomeId: chosen.segment.id,
    outcomeType: chosen.segment.type,
    prize: chosen.segment.prize || "",
    happenedAt: new Date().toISOString(),
  });

  elements.wheelButton.classList.add("is-disabled");
  setStatusNote(`Rodada ${state.spinCount}: a roleta está girando...`);

  const desiredRotation = getDesiredRotationForSegment(chosen.index);
  const currentNormalized = normalizeAngle(state.currentRotation);
  let delta = desiredRotation - currentNormalized;

  if (delta < 0) {
    delta += 360;
  }

  const extraTurns = 5 + Math.floor(Math.random() * 2);
  state.currentRotation += extraTurns * 360 + delta;
  elements.wheelRotor.style.transition = `transform var(--spin-duration) cubic-bezier(0.14, 0.8, 0.18, 1)`;
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
      hideOverlay();
      saveEntry({
        finalStatus: "Não foi dessa vez",
        awardedPrize: "",
        selectedAnswer: "",
        correctAnswer: "",
        questionPrompt: "",
        answerWasCorrect: false,
      });
      scheduleReturnHome(
        "Não foi dessa vez. Toque em Reiniciar para começar um novo cadastro.",
      );
      break;

    case "replay":
      showOverlay({
        eyebrow: "Nova chance",
        title: "Jogue novamente",
        description: "Você ganhou mais uma rodada. Toque no botão abaixo para usar sua nova chance.",
        actionLabel: "Usar nova chance",
        actionMode: "replay",
      });
      showFeedback("A segunda rodada não traz outra casa de replay.", "success");
      setStatusNote("Você ganhou uma nova chance. Use o botão para girar mais uma vez.");
      break;

    case "special":
    case "alexa":
      launchQuestion(outcome);
      break;

    default:
      break;
  }
}

function launchQuestion(outcome) {
  const question = pickQuestion(state.participant.interest, outcome.type);
  state.activeQuestion = question;

  showOverlay({
    eyebrow: outcome.type === "alexa" ? "Valendo Alexa" : "Valendo brinde",
    title: outcome.type === "alexa" ? "Responda para ganhar a Alexa do dia" : "Responda para ganhar o brinde especial",
    description:
      "Acerte a pergunta abaixo para confirmar o prêmio desta rodada.",
    actionMode: "question",
  });

  elements.quizForm.hidden = false;
  elements.quizPrompt.textContent = question.prompt;
  elements.quizOptions.replaceChildren();

  question.options.forEach((option, optionIndex) => {
    const button = document.createElement("button");
    button.className = "quiz-option";
    button.type = "button";
    button.textContent = option;
    button.addEventListener("click", () => handleAnswer(optionIndex));
    elements.quizOptions.appendChild(button);
  });

  setStatusNote("A roleta parou em um prêmio. Agora vale a pergunta.");
}

async function handleAnswer(selectedIndex) {
  if (!state.activeQuestion || !state.activeOutcome) {
    return;
  }

  const questionPrompt = state.activeQuestion.prompt;
  const selectedAnswer = state.activeQuestion.options[selectedIndex];
  const correctAnswer = state.activeQuestion.options[state.activeQuestion.correctIndex];
  const isCorrect = selectedIndex === state.activeQuestion.correctIndex;

  elements.quizForm.hidden = true;
  state.activeQuestion = null;

  if (isCorrect) {
    const awardedPrize = state.activeOutcome.prize || "";

    if (state.activeOutcome.type === "alexa") {
      markAlexaAsClaimed();
      updateAlexaStatus();
    }

    try {
      await updateLeadPrize(true);
    } catch (error) {
      console.error("Failed to update lead prize:", error);
      hideOverlay();
      triggerCelebration();
      saveEntry({
        finalStatus: "Resposta correta",
        awardedPrize,
        selectedAnswer,
        correctAnswer,
        questionPrompt,
        answerWasCorrect: true,
      });
      scheduleReturnHome(
        "Prêmio confirmado, mas houve falha ao sincronizar com o Supabase.",
      );
      return;
    }

    hideOverlay();
    triggerCelebration();
    saveEntry({
      finalStatus: "Resposta correta",
      awardedPrize,
      selectedAnswer,
      correctAnswer,
      questionPrompt,
      answerWasCorrect: true,
    });
    scheduleReturnHome(
      awardedPrize
        ? `Resposta correta. Você ganhou ${awardedPrize}.`
        : "Resposta correta. Prêmio confirmado.",
    );
  } else {
    hideOverlay();
    saveEntry({
      finalStatus: "Resposta incorreta",
      awardedPrize: "",
      selectedAnswer,
      correctAnswer,
      questionPrompt,
      answerWasCorrect: false,
    });
    scheduleReturnHome(
      `Resposta incorreta. A alternativa certa era: ${correctAnswer}.`,
    );
  }
}

function handleOverlayAction() {
  const mode = elements.overlayActionButton.dataset.mode;

  if (mode === "replay") {
    hideOverlay();
    setStatusNote("Nova chance liberada. Toque na roleta novamente.");
  }
}

function showOverlay({ eyebrow, title, description, actionLabel = "", actionMode = "" }) {
  elements.overlay.hidden = false;
  elements.overlayEyebrow.textContent = eyebrow;
  elements.overlayTitle.textContent = title;
  elements.overlayDescription.textContent = description;

  if (actionLabel) {
    elements.overlayActionButton.hidden = false;
    elements.overlayActionButton.textContent = actionLabel;
    elements.overlayActionButton.dataset.mode = actionMode;
  } else {
    elements.overlayActionButton.hidden = true;
    elements.overlayActionButton.textContent = "";
    elements.overlayActionButton.dataset.mode = "";
  }

  elements.closeOverlayButton.hidden = !["question", "replay"].includes(actionMode);
}

function hideOverlay() {
  elements.overlay.hidden = true;
  elements.overlayActionButton.hidden = true;
  elements.overlayActionButton.dataset.mode = "";
  elements.closeOverlayButton.hidden = true;
  elements.quizForm.hidden = true;
  elements.overlayFeedback.hidden = true;
  elements.overlayFeedback.className = "overlay-feedback";
}

function showFeedback(message, tone) {
  elements.overlayFeedback.hidden = false;
  elements.overlayFeedback.textContent = message;
  elements.overlayFeedback.className = `overlay-feedback ${tone === "success" ? "is-success" : "is-warning"}`;
}

function pickQuestion(interest, outcomeType) {
  const pool = QUESTION_BANK[interest] || QUESTION_BANK.FIBER;
  const preferredTier = outcomeType === "alexa" ? "premium" : "standard";
  const eligible = pool.filter((question) => question.tier === preferredTier);
  const fallback = eligible.length ? eligible : pool;

  return fallback[Math.floor(Math.random() * fallback.length)];
}

function updateParticipantSummary() {
  updateAlexaStatus();
}

function updateAlexaStatus() {
  if (!state.participant && state.screen === "wheel") {
    setStatusNote("Cadastre-se, toque na roleta e descubra o seu resultado.");
  }
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

function showRegisterFeedback(message) {
  elements.registerFeedback.hidden = false;
  elements.registerFeedback.textContent = message;
}

function hideRegisterFeedback() {
  elements.registerFeedback.hidden = true;
  elements.registerFeedback.textContent = "";
}

function setRegisterSubmitting(isSubmitting) {
  state.isRegisterSubmitting = isSubmitting;
  elements.registerSubmitButton.disabled = isSubmitting;
  elements.backHomeButton.disabled = isSubmitting;
  elements.registerSubmitButton.textContent = isSubmitting ? "Salvando..." : "Ir para a roleta";
}

function scheduleReturnHomeWithMessage(baseMessage) {
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
    finalizeRoundAndReturn("Rodada finalizada.");
  }, totalSeconds * 1000);
}

function scheduleReturnHome(message) {
  scheduleReturnHomeWithMessage(message);
}

function updateReturnCountdownMessage(baseMessage, secondsRemaining) {
  const label = secondsRemaining === 1 ? "segundo" : "segundos";
  setStatusNote(
    `${baseMessage} Toque em Reiniciar ou aguarde ${secondsRemaining} ${label} para voltar à tela da Cirion.`,
  );
}

function finalizeRoundAndReturn(statusMessage) {
  clearReturnTimers();
  hideOverlay();
  resetCurrentSession();
  setStatusNote(statusMessage);
  showScreen("home");
}

function resetCurrentSession() {
  state.participant = null;
  state.leadId = null;
  state.spinCount = 0;
  state.spinHistory = [];
  state.activeOutcome = null;
  state.activeQuestion = null;
  state.isSpinning = false;
  state.isRegisterSubmitting = false;
  state.currentRotation = 0;
  clearCelebration();
  elements.registerForm.reset();
  elements.phone.value = "";
  hideRegisterFeedback();
  setRegisterSubmitting(false);
  elements.wheelButton.classList.remove("is-disabled");
  elements.wheelRotor.style.transition = "none";
  elements.wheelRotor.style.transform = "rotate(0deg)";
  window.requestAnimationFrame(() => {
    elements.wheelRotor.style.transition = "";
  });
  setStatusNote("Cadastre-se, toque na roleta e descubra o seu resultado.");
}

function saveEntry({
  finalStatus,
  awardedPrize,
  selectedAnswer,
  correctAnswer,
  questionPrompt,
  answerWasCorrect,
}) {
  if (!state.participant) {
    return;
  }

  const entry = {
    savedAt: new Date().toISOString(),
    fullName: state.participant.fullName,
    phone: state.participant.phone,
    email: state.participant.email,
    interest: state.participant.interest,
    spinCount: state.spinCount,
    spinHistory: state.spinHistory,
    finalStatus,
    awardedPrize,
    questionPrompt,
    selectedAnswer,
    correctAnswer,
    answerWasCorrect,
  };

  const entries = readEntries();
  entries.push(entry);
  localStorage.setItem(STORAGE_KEYS.entries, JSON.stringify(entries));
  updateAdminPanel();
}

function readEntries() {
  try {
    const rawEntries = localStorage.getItem(STORAGE_KEYS.entries);
    return rawEntries ? JSON.parse(rawEntries) : [];
  } catch (error) {
    return [];
  }
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

  if (!dailyAlexa) {
    return true;
  }

  return dailyAlexa.date !== getTodayKey();
}

function markAlexaAsClaimed() {
  if (!state.participant) {
    return;
  }

  const payload = {
    date: getTodayKey(),
    winnerName: state.participant.fullName,
    winnerEmail: state.participant.email,
    claimedAt: new Date().toISOString(),
  };

  localStorage.setItem(STORAGE_KEYS.dailyAlexa, JSON.stringify(payload));
  updateAdminPanel();
}

function resetDailyAlexa() {
  localStorage.removeItem(STORAGE_KEYS.dailyAlexa);
  updateAlexaStatus();
  updateAdminPanel();
  setStatusNote("A Alexa do dia foi liberada novamente.");
}

function clearAllEntries() {
  localStorage.removeItem(STORAGE_KEYS.entries);
  localStorage.removeItem(STORAGE_KEYS.dailyAlexa);
  updateAlexaStatus();
  updateAdminPanel();
  setStatusNote("Todos os dados locais foram apagados.");
}

function updateAdminPanel() {
  if (elements.adminPanel.hidden) {
    return;
  }

  const entries = readEntries();
  const dailyAlexa = readDailyAlexa();
  const alexaStatus =
    dailyAlexa && dailyAlexa.date === getTodayKey()
      ? `Alexa entregue para ${dailyAlexa.winnerName || "participante"}`
      : "Alexa ainda disponível hoje";

  elements.adminStats.textContent = `${entries.length} participações salvas | ${alexaStatus}`;
}

async function createLeadRecord(participant) {
  const response = await fetch("/api/leads", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: participant.fullName,
      phoneNumber: participant.phone,
      email: participant.email,
      reason: participant.interest,
      prize: false,
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || "lead_create_failed");
  }

  return response.json();
}

async function updateLeadPrize(hasPrize) {
  if (!state.leadId) {
    throw new Error("missing_lead_id");
  }

  const response = await fetch(`/api/leads/${encodeURIComponent(state.leadId)}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prize: Boolean(hasPrize),
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || "lead_update_failed");
  }

  return response.json();
}

function downloadEntriesCsv() {
  const entries = readEntries();

  if (!entries.length) {
    setStatusNote("Ainda não existem participações salvas para exportar.");
    return;
  }

  const headers = [
    "saved_at",
    "full_name",
    "phone",
    "email",
    "interest",
    "spin_count",
    "spin_history",
    "final_status",
    "awarded_prize",
    "question_prompt",
    "selected_answer",
    "correct_answer",
    "answer_was_correct",
  ];

  const lines = entries.map((entry) =>
    [
      entry.savedAt,
      entry.fullName,
      entry.phone,
      entry.email,
      entry.interest,
      String(entry.spinCount),
      JSON.stringify(entry.spinHistory),
      entry.finalStatus,
      entry.awardedPrize,
      entry.questionPrompt,
      entry.selectedAnswer,
      entry.correctAnswer,
      String(entry.answerWasCorrect),
    ]
      .map(escapeCsvValue)
      .join(","),
  );

  const csv = [headers.join(","), ...lines].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `cirion-leads-${getTodayKey()}.csv`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  setStatusNote("CSV exportado com sucesso.");
}

function escapeCsvValue(value) {
  const text = String(value ?? "");
  return `"${text.replaceAll('"', '""')}"`;
}

function validateRegisterData({ fullName, phone, email, interest }) {
  if (fullName.length < 3) {
    return {
      isValid: false,
      message: "Informe o nome completo do participante.",
      field: elements.fullName,
    };
  }

  const phoneDigits = phone.replace(/\D/g, "");
  if (phoneDigits.length < 10) {
    return {
      isValid: false,
      message: "Informe um telefone válido com DDD.",
      field: elements.phone,
    };
  }

  if (!isValidEmail(email)) {
    return {
      isValid: false,
      message: "Informe um e-mail válido.",
      field: elements.email,
    };
  }

  if (!interest) {
    return {
      isValid: false,
      message: "Selecione se o participante tem interesse em Fiber ou Data Center.",
      field: elements.registerForm.querySelector('input[name="interest"]'),
    };
  }

  return { isValid: true };
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
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
    const burst = document.createElement("div");
    const [primaryColor, accentColor] = colors[index % colors.length];
    burst.className = "firework-burst";
    burst.style.left = `${12 + Math.random() * 76}%`;
    burst.style.top = `${10 + Math.random() * 55}%`;
    burst.style.setProperty("--firework-color", primaryColor);
    burst.style.setProperty("--firework-accent", accentColor);
    burst.style.setProperty("--delay", `${index * 90}ms`);
    elements.celebration.appendChild(burst);
  }

  state.celebrationTimer = window.setTimeout(() => {
    clearCelebration();
  }, 1800);
}

function clearCelebration() {
  if (state.celebrationTimer) {
    window.clearTimeout(state.celebrationTimer);
    state.celebrationTimer = null;
  }

  elements.celebration.replaceChildren();
  elements.celebration.hidden = true;
}

function getDesiredRotationForSegment(index) {
  const segmentCenter = 360 - index * 45;
  const jitter = Math.random() * 10 - 5;
  return normalizeAngle(segmentCenter + jitter);
}

function normalizeAngle(angle) {
  return ((angle % 360) + 360) % 360;
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

init();
