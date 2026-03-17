const STORAGE_KEYS = {
  dailyAlexa: "cirion-wheel-daily-alexa",
  language: "cirion-wheel-language",
};

const DEFAULT_SPIN_DURATION_MS = 3683;
const COUNTRIES = ["BR", "AR", "CL", "CO", "MX", "PE", "US", "OTHER"];
const REASON_OPTIONS = ["fiber", "dataCenter", "both", "none"];
const REASON_VALUES = {
  fiber: "Fiber",
  dataCenter: "Data Center",
  both: "Both",
  none: "None",
};
const OUTCOME_PROBABILITIES = {
  special: 0.15,
  replay: 0.2,
  alexa: 0.05,
  noLuck: 0.6,
};
const COUNTRY_DIAL_CODES = {
  BR: "+55",
  AR: "+54",
  CL: "+56",
  CO: "+57",
  MX: "+52",
  PE: "+51",
  US: "+1",
  OTHER: "",
};
const FORM_FIELD_ORDER = [
  "firstName",
  "lastName",
  "country",
  "company",
  "email",
  "jobTitle",
  "areaCode",
  "phoneNumber",
  "privacyAccepted",
];

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
    home: {
      logoAlt: "Cirion logo",
      title: "Tap to Start",
    },
    form: {
      logoAlt: "Cirion logo",
      eyebrow: "Cirion interactive experience",
      title: "Register to spin the wheel",
      lead: "Complete your details and then spin the wheel.",
      bodyOne:
        "Meet the Cirion team and learn more about digital infrastructure solutions for your business.",
      bodyTwo:
        "After registration, the wheel opens immediately and the result appears on screen.",
      panelEyebrow: "Register to learn more",
      panelNote: "Required fields are marked with *",
      placeholders: {
        firstName: "First Name*",
        lastName: "Last Name*",
        country: "Country (Select)*",
        company: "Company*",
        email: "Corporate Email*",
        jobTitle: "Job Title",
        areaCode: "Country Code*",
        phoneNumber: "Phone Number*",
        reason: "Are you interested in Fiber or Data Center?",
      },
      fieldNames: {
        firstName: "First Name",
        lastName: "Last Name",
        country: "Country",
        company: "Company",
        email: "Corporate Email",
        areaCode: "Country Code",
        phoneNumber: "Phone Number",
        reason: "Interest",
      },
      reasonOptions: {
        fiber: "Fiber",
        dataCenter: "Data Center",
        both: "Both",
        none: "None",
      },
      countries: {
        BR: "Brazil",
        AR: "Argentina",
        CL: "Chile",
        CO: "Colombia",
        MX: "Mexico",
        PE: "Peru",
        US: "United States",
        OTHER: "Other",
      },
      marketingConsent:
        "I want to receive information and offers about Cirion solutions and events.",
      privacyAccepted:
        "By submitting this form, I acknowledge the Cirion Privacy Notice.",
      submit: "Continue to Wheel",
      submitting: "Saving...",
      feedback: {
        saveError: "We couldn't save your registration. Check the connection and try again.",
      },
      errors: {
        required: "{field} is required.",
        email: "Enter a valid email address.",
        areaCode: "Enter a valid country code.",
        phoneNumber: "Enter a valid phone number.",
        privacyAccepted: "You must accept the privacy notice to continue.",
      },
    },
    wheel: {
      eyebrow: "Cirion Prize Wheel",
      title: "Tap the wheel to spin",
      spinAria: "Spin the wheel",
      spinLabel: "SPIN",
      segmentLabels: {
        special: ["SPECIAL", "GIFT"],
        noLuck: ["NOT THIS", "TIME"],
        replay: ["SPIN", "AGAIN"],
        alexa: ["ALEXA"],
      },
    },
    overlay: {
      defaultEyebrow: "Result",
      defaultTitle: "Round result",
      maybeNextEyebrow: "Maybe next time",
      noLuckTitle: "NOT THIS TIME",
      noLuckDescription: "Thanks for playing. The next participant can register now.",
      bonusEyebrow: "Bonus spin",
      spinAgainTitle: "SPIN AGAIN",
      spinAgainDescription: "You earned one extra spin. Tap the button below to spin again.",
      winnerEyebrow: "Winner",
      specialTitle: "YOU WON A SPECIAL GIFT",
      specialDescription: "Please speak with the Cirion team to receive your prize.",
      alexaTitle: "YOU WON AN ALEXA",
      alexaDescription: "Please speak with the Cirion team to receive your prize.",
      autoReturn: "Returning to start in {seconds}s.",
      newEntryAction: "NEW GAME",
      spinAgainAction: "SPIN AGAIN",
    },
    keyboard: {
      title: "Virtual keyboard",
      done: "Done",
      hide: "Hide",
      shift: "Shift",
      backspace: "Delete",
      clear: "Clear",
      space: "Space",
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
    home: {
      logoAlt: "Logo da Cirion",
      title: "Toque para começar",
    },
    form: {
      logoAlt: "Logo da Cirion",
      eyebrow: "Experiência interativa Cirion",
      title: "Cadastre-se para girar a roleta",
      lead: "Preencha seus dados e depois gire a roleta.",
      bodyOne:
        "Conheça o time da Cirion e saiba mais sobre soluções de infraestrutura digital para a sua empresa.",
      bodyTwo:
        "Depois do cadastro, a roleta abre imediatamente e o resultado aparece na tela.",
      panelEyebrow: "Cadastre-se para saber mais",
      panelNote: "Campos com * são obrigatórios",
      placeholders: {
        firstName: "Nome*",
        lastName: "Sobrenome*",
        country: "País (Selecione)*",
        company: "Empresa*",
        email: "E-mail corporativo*",
        jobTitle: "Cargo",
        areaCode: "DDI*",
        phoneNumber: "Telefone*",
        reason: "Você tem interesse em Fiber ou Data Center?",
      },
      fieldNames: {
        firstName: "Nome",
        lastName: "Sobrenome",
        country: "País",
        company: "Empresa",
        email: "E-mail corporativo",
        areaCode: "DDI",
        phoneNumber: "Telefone",
        reason: "Interesse",
      },
      reasonOptions: {
        fiber: "Fiber",
        dataCenter: "Data Center",
        both: "Ambos",
        none: "Nenhum",
      },
      countries: {
        BR: "Brasil",
        AR: "Argentina",
        CL: "Chile",
        CO: "Colômbia",
        MX: "México",
        PE: "Peru",
        US: "Estados Unidos",
        OTHER: "Outro",
      },
      marketingConsent:
        "Quero receber informações e ofertas sobre soluções e eventos da Cirion.",
      privacyAccepted:
        "Ao enviar este formulário, reconheço o Aviso de Privacidade da Cirion.",
      submit: "Continuar para a roleta",
      submitting: "Salvando...",
      feedback: {
        saveError: "Não foi possível salvar o cadastro. Verifique a conexão e tente novamente.",
      },
      errors: {
        required: "O campo {field} é obrigatório.",
        email: "Informe um e-mail válido.",
        areaCode: "Informe um DDI válido.",
        phoneNumber: "Informe um telefone válido.",
        privacyAccepted: "Você precisa aceitar o aviso de privacidade para continuar.",
      },
    },
    wheel: {
      eyebrow: "Roleta de Prêmios Cirion",
      title: "Toque na roleta para girar",
      spinAria: "Girar a roleta",
      spinLabel: "GIRE",
      segmentLabels: {
        special: ["BRINDE", "ESPECIAL"],
        noLuck: ["NÃO FOI", "DESSA VEZ"],
        replay: ["GIRE", "NOVAMENTE"],
        alexa: ["ALEXA"],
      },
    },
    overlay: {
      defaultEyebrow: "Resultado",
      defaultTitle: "Resultado da rodada",
      maybeNextEyebrow: "Talvez na próxima",
      noLuckTitle: "NÃO FOI DESSA VEZ",
      noLuckDescription: "Obrigado por jogar. O próximo participante já pode se cadastrar.",
      bonusEyebrow: "Nova chance",
      spinAgainTitle: "GIRE NOVAMENTE",
      spinAgainDescription: "Você ganhou uma rodada extra. Toque no botão abaixo para girar de novo.",
      winnerEyebrow: "Vencedor",
      specialTitle: "VOCÊ GANHOU UM BRINDE ESPECIAL",
      specialDescription: "Fale com a equipe da Cirion para retirar o seu prêmio.",
      alexaTitle: "VOCÊ GANHOU UMA ALEXA",
      alexaDescription: "Fale com a equipe da Cirion para retirar o seu prêmio.",
      autoReturn: "Voltando ao início em {seconds}s.",
      newEntryAction: "NOVO JOGO",
      spinAgainAction: "GIRAR DE NOVO",
    },
    keyboard: {
      title: "Teclado virtual",
      done: "Concluir",
      hide: "Ocultar",
      shift: "Maiús.",
      backspace: "Apagar",
      clear: "Limpar",
      space: "Espaço",
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
  isSubmitting: false,
  overlayConfig: null,
  statusNoteKey: "status.ready",
  statusNoteParams: {},
  celebrationTimer: null,
  returnTimer: null,
  returnCountdownTimer: null,
  returnCountdownSeconds: 0,
  audioUnlocked: false,
  sounds: null,
  lastLeadId: null,
  formErrors: {},
  formFeedbackKey: "",
  keyboardMode: "",
  keyboardShift: false,
  activeInput: null,
};

const elements = {
  screens: {
    home: document.querySelector("#homeScreen"),
    form: document.querySelector("#formScreen"),
    wheel: document.querySelector("#wheelScreen"),
  },
  languageToggle: document.querySelector("#languageToggle"),
  homeLogo: document.querySelector("#homeLogo"),
  startButton: document.querySelector("#startButton"),
  homeTitle: document.querySelector("#homeTitle"),
  formLogo: document.querySelector("#formLogo"),
  formTitle: document.querySelector("#formTitle"),
  formLead: document.querySelector("#formLead"),
  leadForm: document.querySelector("#leadForm"),
  firstName: document.querySelector("#firstName"),
  lastName: document.querySelector("#lastName"),
  country: document.querySelector("#country"),
  company: document.querySelector("#company"),
  email: document.querySelector("#email"),
  jobTitle: document.querySelector("#jobTitle"),
  areaCode: document.querySelector("#areaCode"),
  phoneNumber: document.querySelector("#phoneNumber"),
  reason: document.querySelector("#reason"),
  marketingConsent: document.querySelector("#marketingConsent"),
  marketingConsentLabel: document.querySelector("#marketingConsentLabel"),
  privacyAccepted: document.querySelector("#privacyAccepted"),
  privacyAcceptedLabel: document.querySelector("#privacyAcceptedLabel"),
  formFeedback: document.querySelector("#formFeedback"),
  leadSubmitButton: document.querySelector("#leadSubmitButton"),
  fieldContainers: new Map(
    [...document.querySelectorAll("[data-field-name]")].map((field) => [field.dataset.fieldName, field]),
  ),
  wheelEyebrow: document.querySelector("#wheelEyebrow"),
  wheelTitle: document.querySelector("#wheelTitle"),
  wheelPointer: document.querySelector("#wheelPointer"),
  wheelButton: document.querySelector("#wheelButton"),
  wheelCenterLabel: document.querySelector("#wheelCenterLabel"),
  wheelRotor: document.querySelector("#wheelRotor"),
  wheelLabels: document.querySelector("#wheelLabels"),
  statusNote: document.querySelector("#statusNote"),
  overlay: document.querySelector("#overlay"),
  overlayEyebrow: document.querySelector("#overlayEyebrow"),
  overlayTitle: document.querySelector("#overlayTitle"),
  overlayDescription: document.querySelector("#overlayDescription"),
  overlayCountdown: document.querySelector("#overlayCountdown"),
  overlayActionButton: document.querySelector("#overlayActionButton"),
  celebration: document.querySelector("#celebration"),
  virtualKeyboard: document.querySelector("#virtualKeyboard"),
  keyboardShell: document.querySelector("#keyboardShell"),
  keyboardCloseButton: document.querySelector("#keyboardCloseButton"),
  keyboardKeys: document.querySelector("#keyboardKeys"),
};

function init() {
  state.sounds = createSoundBank();
  renderWheelLabels();
  renderCountryOptions();
  renderReasonOptions();
  bindEvents();
  applyLanguage();
  showScreen("home");
}

function bindEvents() {
  elements.languageToggle.addEventListener("click", toggleLanguage);
  elements.startButton.addEventListener("click", () => {
    showScreen("form");
  });

  elements.leadForm.addEventListener("submit", handleLeadSubmit);
  elements.leadForm.addEventListener("input", handleFormInput);
  elements.leadForm.addEventListener("change", handleFormChange);
  elements.leadForm.addEventListener("focusin", handleFormFocusIn);

  elements.keyboardShell.addEventListener("mousedown", (event) => {
    event.preventDefault();
  });
  elements.keyboardKeys.addEventListener("click", handleKeyboardClick);
  elements.keyboardCloseButton.addEventListener("click", () => closeKeyboard({ blur: true }));

  elements.wheelButton.addEventListener("click", () => {
    unlockAudio();
    handleSpin();
  });

  elements.overlayActionButton.addEventListener("click", handleOverlayAction);

  window.addEventListener("resize", updateKeyboardOffset);
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
  elements.homeLogo.setAttribute("alt", t("home.logoAlt"));
  elements.homeTitle.textContent = t("home.title");
  elements.formLogo.setAttribute("alt", t("form.logoAlt"));
  elements.formTitle.textContent = t("form.title");
  elements.formLead.textContent = t("form.lead");
  elements.marketingConsentLabel.textContent = t("form.marketingConsent");
  elements.privacyAcceptedLabel.textContent = t("form.privacyAccepted");
  elements.wheelEyebrow.textContent = t("wheel.eyebrow");
  elements.wheelTitle.textContent = t("wheel.title");
  elements.wheelButton.setAttribute("aria-label", t("wheel.spinAria"));
  elements.wheelCenterLabel.textContent = t("wheel.spinLabel");
  elements.virtualKeyboard.setAttribute("aria-label", t("keyboard.title"));
  elements.keyboardCloseButton.textContent = t("keyboard.done");

  renderFieldPlaceholders();
  renderCountryOptions();
  renderReasonOptions();
  renderWheelLabels();
  renderStatusNote();
  renderOverlay();
  renderKeyboard();
  renderSubmitButton();
  renderFormErrors();
  renderFormFeedback();
}

function renderFieldPlaceholders() {
  elements.firstName.placeholder = t("form.placeholders.firstName");
  elements.lastName.placeholder = t("form.placeholders.lastName");
  elements.company.placeholder = t("form.placeholders.company");
  elements.email.placeholder = t("form.placeholders.email");
  elements.jobTitle.placeholder = t("form.placeholders.jobTitle");
  elements.areaCode.placeholder = t("form.placeholders.areaCode");
  elements.phoneNumber.placeholder = t("form.placeholders.phoneNumber");
}

function renderCountryOptions() {
  const currentValue = elements.country.value;
  const fragment = document.createDocumentFragment();
  const placeholderOption = document.createElement("option");
  placeholderOption.value = "";
  placeholderOption.textContent = t("form.placeholders.country");
  fragment.appendChild(placeholderOption);

  COUNTRIES.forEach((countryCode) => {
    const option = document.createElement("option");
    option.value = countryCode;
    option.textContent = t(`form.countries.${countryCode}`);
    fragment.appendChild(option);
  });

  elements.country.replaceChildren(fragment);
  elements.country.value = COUNTRIES.includes(currentValue) ? currentValue : "";
}

function renderReasonOptions() {
  const currentValue = elements.reason.value;
  const fragment = document.createDocumentFragment();
  const placeholderOption = document.createElement("option");
  placeholderOption.value = "";
  placeholderOption.textContent = t("form.placeholders.reason");
  fragment.appendChild(placeholderOption);

  REASON_OPTIONS.forEach((reasonKey) => {
    const option = document.createElement("option");
    option.value = reasonKey;
    option.textContent = t(`form.reasonOptions.${reasonKey}`);
    fragment.appendChild(option);
  });

  elements.reason.replaceChildren(fragment);
  elements.reason.value = REASON_OPTIONS.includes(currentValue) ? currentValue : "";
}

function fillAreaCodeFromCountry(countryCode) {
  const dialCode = COUNTRY_DIAL_CODES[countryCode] || "";
  elements.areaCode.value = dialCode;
}

function renderWheelLabels() {
  const fragment = document.createDocumentFragment();
  const radiusPercent = 31;

  WHEEL_SEGMENTS.forEach((segment, index) => {
    const angleDeg = index * 45;
    const angleRad = (angleDeg * Math.PI) / 180;
    const labelLines = t(`wheel.segmentLabels.${segment.type}`);
    const label = document.createElement("div");
    label.className = "wheel-label";
    label.style.left = `${50 + Math.sin(angleRad) * radiusPercent}%`;
    label.style.top = `${50 - Math.cos(angleRad) * radiusPercent}%`;
    label.innerHTML = labelLines.map((line) => `<span>${line}</span>`).join("");
    fragment.appendChild(label);
  });

  elements.wheelLabels.replaceChildren(fragment);
}

function handleFormInput(event) {
  const target = event.target;

  if (!(target instanceof HTMLInputElement)) {
    return;
  }

  unlockAudio();

  const sanitizedValue = sanitizeInputValue(target.name, target.value);

  if (target.value !== sanitizedValue) {
    const cursor = sanitizedValue.length;
    target.value = sanitizedValue;
    target.setSelectionRange(cursor, cursor);
  }

  if (state.formErrors[target.name]) {
    delete state.formErrors[target.name];
    renderFormErrors();
  }

  if (state.formFeedbackKey) {
    clearFormFeedback();
  }
}

function handleFormChange(event) {
  const target = event.target;

  if (!(target instanceof HTMLElement)) {
    return;
  }

  if (target.id === "privacyAccepted" && state.formErrors.privacyAccepted) {
    delete state.formErrors.privacyAccepted;
    renderFormErrors();
  }

  if (target.id === "country" && state.formErrors.country) {
    delete state.formErrors.country;
    renderFormErrors();
  }

  if (target.id === "country") {
    fillAreaCodeFromCountry(target.value);

    if (state.formErrors.areaCode) {
      delete state.formErrors.areaCode;
      renderFormErrors();
    }
  }
}

function handleFormFocusIn(event) {
  const target = event.target;

  if (target instanceof HTMLInputElement && target.dataset.keyboard) {
    unlockAudio();
    openKeyboardForInput(target);
    return;
  }

  closeKeyboard();
}

async function handleLeadSubmit(event) {
  event.preventDefault();

  if (state.isSubmitting) {
    return;
  }

  unlockAudio();
  closeKeyboard({ blur: true });
  clearFormFeedback();

  const values = getFormValues();
  state.formErrors = validateForm(values);
  renderFormErrors();

  if (Object.keys(state.formErrors).length > 0) {
    focusFirstInvalidField();
    return;
  }

  state.isSubmitting = true;
  renderSubmitButton();

  try {
    const createdLead = await createLead(values);
    state.lastLeadId = createdLead?.id || null;
    resetRound();
    hideOverlay();
    clearReturnTimer();
    showScreen("wheel");
    setStatusNote(getReadyStatusKey());
    window.requestAnimationFrame(() => {
      elements.wheelButton.focus();
    });
  } catch (error) {
    setFormFeedback("error", "form.feedback.saveError");
  } finally {
    state.isSubmitting = false;
    renderSubmitButton();
  }
}

function getFormValues() {
  return {
    firstName: normalizeText(elements.firstName.value),
    lastName: normalizeText(elements.lastName.value),
    country: elements.country.value,
    company: normalizeText(elements.company.value),
    email: normalizeEmail(elements.email.value),
    jobTitle: normalizeText(elements.jobTitle.value),
    areaCode: sanitizeInputValue("areaCode", elements.areaCode.value),
    phoneNumber: sanitizeInputValue("phoneNumber", elements.phoneNumber.value),
    reason: elements.reason.value,
    marketingConsent: elements.marketingConsent.checked,
    privacyAccepted: elements.privacyAccepted.checked,
  };
}

function validateForm(values) {
  const errors = {};

  if (!values.firstName) {
    errors.firstName = { type: "required", fieldKey: "form.fieldNames.firstName" };
  }

  if (!values.lastName) {
    errors.lastName = { type: "required", fieldKey: "form.fieldNames.lastName" };
  }

  if (!values.country) {
    errors.country = { type: "required", fieldKey: "form.fieldNames.country" };
  }

  if (!values.company) {
    errors.company = { type: "required", fieldKey: "form.fieldNames.company" };
  }

  if (!values.email) {
    errors.email = { type: "required", fieldKey: "form.fieldNames.email" };
  } else if (!isValidEmail(values.email)) {
    errors.email = { type: "email" };
  }

  if (!values.areaCode) {
    errors.areaCode = { type: "required", fieldKey: "form.fieldNames.areaCode" };
  } else if (!/^\+\d{1,4}$/.test(values.areaCode)) {
    errors.areaCode = { type: "areaCode" };
  }

  if (!values.phoneNumber) {
    errors.phoneNumber = { type: "required", fieldKey: "form.fieldNames.phoneNumber" };
  } else if (!/^\d{7,15}$/.test(values.phoneNumber)) {
    errors.phoneNumber = { type: "phoneNumber" };
  }

  if (!values.privacyAccepted) {
    errors.privacyAccepted = { type: "privacyAccepted" };
  }

  return errors;
}

function renderFormErrors() {
  elements.fieldContainers.forEach((fieldContainer, fieldName) => {
    const errorNode = fieldContainer.querySelector(".field-error");
    const errorConfig = state.formErrors[fieldName];
    fieldContainer.classList.toggle("has-error", Boolean(errorConfig));

    if (!errorNode) {
      return;
    }

    errorNode.textContent = errorConfig ? getErrorMessage(errorConfig) : "";
  });
}

function getErrorMessage(errorConfig) {
  switch (errorConfig.type) {
    case "required":
      return t("form.errors.required", { field: t(errorConfig.fieldKey) });
    case "email":
      return t("form.errors.email");
    case "areaCode":
      return t("form.errors.areaCode");
    case "phoneNumber":
      return t("form.errors.phoneNumber");
    case "privacyAccepted":
      return t("form.errors.privacyAccepted");
    default:
      return "";
  }
}

function focusFirstInvalidField() {
  const firstInvalidField = FORM_FIELD_ORDER.find((fieldName) => state.formErrors[fieldName]);

  if (!firstInvalidField) {
    return;
  }

  const target =
    elements[firstInvalidField] || elements.fieldContainers.get(firstInvalidField)?.querySelector("input, select");

  if (!(target instanceof HTMLElement)) {
    return;
  }

  target.focus();

  if (target instanceof HTMLInputElement && target.dataset.keyboard) {
    openKeyboardForInput(target);
  }

  target.scrollIntoView({ block: "center", behavior: "smooth" });
}

function setFormFeedback(tone, feedbackKey) {
  elements.formFeedback.hidden = false;
  elements.formFeedback.dataset.tone = tone;
  state.formFeedbackKey = feedbackKey;
  renderFormFeedback();
}

function clearFormFeedback() {
  state.formFeedbackKey = "";
  elements.formFeedback.hidden = true;
  elements.formFeedback.textContent = "";
  delete elements.formFeedback.dataset.tone;
}

function renderFormFeedback() {
  if (!state.formFeedbackKey) {
    elements.formFeedback.hidden = true;
    elements.formFeedback.textContent = "";
    return;
  }

  elements.formFeedback.hidden = false;
  elements.formFeedback.textContent = t(state.formFeedbackKey);
}

function renderSubmitButton() {
  elements.leadSubmitButton.disabled = state.isSubmitting;
  elements.leadSubmitButton.textContent = state.isSubmitting
    ? t("form.submitting")
    : t("form.submit");
}

function openKeyboardForInput(input) {
  state.activeInput = input;
  state.keyboardMode = input.dataset.keyboard || "text";
  state.keyboardShift = false;
  elements.virtualKeyboard.hidden = false;
  document.body.classList.add("keyboard-open");
  renderKeyboard();
  updateKeyboardOffset();
  window.requestAnimationFrame(() => {
    input.scrollIntoView({ block: "center", behavior: "smooth" });
  });
}

function closeKeyboard(options = {}) {
  if (elements.virtualKeyboard.hidden) {
    return;
  }

  elements.virtualKeyboard.hidden = true;
  state.keyboardMode = "";
  state.keyboardShift = false;
  state.activeInput = null;
  document.body.classList.remove("keyboard-open");
  document.body.style.setProperty("--keyboard-offset", "0px");

  if (options.blur && document.activeElement instanceof HTMLElement) {
    document.activeElement.blur();
  }
}

function updateKeyboardOffset() {
  if (elements.virtualKeyboard.hidden) {
    document.body.style.setProperty("--keyboard-offset", "0px");
    return;
  }

  const keyboardOffset = elements.keyboardShell.offsetHeight + 18;
  document.body.style.setProperty("--keyboard-offset", `${keyboardOffset}px`);
}

function renderKeyboard() {
  if (elements.virtualKeyboard.hidden || !state.keyboardMode) {
    elements.keyboardKeys.replaceChildren();
    return;
  }

  const rows = getKeyboardRows();
  const fragment = document.createDocumentFragment();

  rows.forEach((row) => {
    const rowNode = document.createElement("div");
    rowNode.className = "keyboard-row";
    rowNode.style.setProperty("--columns", String(getKeyboardColumnCount(row)));

    row.forEach((keyConfig) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "keyboard-key";

      if (typeof keyConfig === "string") {
        button.dataset.value = keyConfig;
        button.textContent = keyConfig;
      } else {
        button.dataset.action = keyConfig.action;
        button.textContent = getKeyboardActionLabel(keyConfig.action);

        if (keyConfig.size) {
          button.dataset.size = keyConfig.size;
        }

        if (keyConfig.action === "shift" && state.keyboardShift) {
          button.classList.add("is-active");
        }
      }

      rowNode.appendChild(button);
    });

    fragment.appendChild(rowNode);
  });

  elements.keyboardKeys.replaceChildren(fragment);
}

function getKeyboardRows() {
  if (state.keyboardMode === "numeric") {
    return [
      ["1", "2", "3"],
      ["4", "5", "6"],
      ["7", "8", "9"],
      [{ action: "clear" }, "0", { action: "backspace" }],
    ];
  }

  const alphaRows = [
    buildAlphaRow(["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"]),
    buildAlphaRow(["a", "s", "d", "f", "g", "h", "j", "k", "l"]),
    [
      { action: "shift", size: "wide" },
      ...buildAlphaRow(["z", "x", "c", "v", "b", "n", "m"]),
      { action: "backspace", size: "wide" },
    ],
  ];

  if (state.keyboardMode === "email") {
    return [
      ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
      ...alphaRows,
      ["@", ".", "-", "_", ".com", { action: "space", size: "xl" }],
    ];
  }

  return [
    ...alphaRows,
    [",", ".", "-", "'", { action: "space", size: "xl" }],
  ];
}

function getKeyboardColumnCount(row) {
  return row.reduce((total, keyConfig) => total + getKeyboardKeySpan(keyConfig), 0);
}

function getKeyboardKeySpan(keyConfig) {
  if (typeof keyConfig === "string") {
    return 1;
  }

  if (keyConfig.size === "xl") {
    return 3;
  }

  if (keyConfig.size === "wide") {
    return 2;
  }

  return 1;
}

function buildAlphaRow(keys) {
  return keys.map((key) => (state.keyboardShift ? key.toUpperCase() : key));
}

function getKeyboardActionLabel(action) {
  switch (action) {
    case "done":
      return t("keyboard.done");
    case "shift":
      return t("keyboard.shift");
    case "backspace":
      return t("keyboard.backspace");
    case "clear":
      return t("keyboard.clear");
    case "space":
      return t("keyboard.space");
    default:
      return action;
  }
}

function handleKeyboardClick(event) {
  const button = event.target.closest(".keyboard-key");

  if (!(button instanceof HTMLButtonElement) || !(state.activeInput instanceof HTMLInputElement)) {
    return;
  }

  unlockAudio();

  if (button.dataset.action) {
    handleKeyboardAction(button.dataset.action);
    return;
  }

  if (button.dataset.value) {
    insertIntoActiveInput(button.dataset.value);

    if (state.keyboardShift && state.keyboardMode !== "numeric") {
      state.keyboardShift = false;
      renderKeyboard();
    }
  }
}

function handleKeyboardAction(action) {
  switch (action) {
    case "backspace":
      backspaceActiveInput();
      break;
    case "clear":
      setActiveInputValue("");
      break;
    case "space":
      insertIntoActiveInput(" ");
      break;
    case "shift":
      state.keyboardShift = !state.keyboardShift;
      renderKeyboard();
      break;
    case "done":
      closeKeyboard({ blur: true });
      break;
    default:
      break;
  }
}

function insertIntoActiveInput(rawValue) {
  if (!(state.activeInput instanceof HTMLInputElement)) {
    return;
  }

  const input = state.activeInput;
  const value = input.value;
  const insertion = sanitizeKeyboardValue(input.name, rawValue);
  const selectionStart = input.selectionStart ?? value.length;
  const selectionEnd = input.selectionEnd ?? value.length;
  const nextValue = `${value.slice(0, selectionStart)}${insertion}${value.slice(selectionEnd)}`;

  input.value = sanitizeInputValue(input.name, nextValue);

  const nextCursor = Math.min(selectionStart + insertion.length, input.value.length);
  input.setSelectionRange(nextCursor, nextCursor);
  dispatchSyntheticInput(input);
}

function backspaceActiveInput() {
  if (!(state.activeInput instanceof HTMLInputElement)) {
    return;
  }

  const input = state.activeInput;
  const value = input.value;
  const selectionStart = input.selectionStart ?? value.length;
  const selectionEnd = input.selectionEnd ?? value.length;

  if (selectionStart !== selectionEnd) {
    input.value = `${value.slice(0, selectionStart)}${value.slice(selectionEnd)}`;
    input.setSelectionRange(selectionStart, selectionStart);
    dispatchSyntheticInput(input);
    return;
  }

  if (selectionStart === 0) {
    return;
  }

  input.value = `${value.slice(0, selectionStart - 1)}${value.slice(selectionStart)}`;
  input.setSelectionRange(selectionStart - 1, selectionStart - 1);
  dispatchSyntheticInput(input);
}

function setActiveInputValue(nextValue) {
  if (!(state.activeInput instanceof HTMLInputElement)) {
    return;
  }

  state.activeInput.value = sanitizeInputValue(state.activeInput.name, nextValue);
  const cursor = state.activeInput.value.length;
  state.activeInput.setSelectionRange(cursor, cursor);
  dispatchSyntheticInput(state.activeInput);
}

function dispatchSyntheticInput(input) {
  input.dispatchEvent(new Event("input", { bubbles: true }));
  input.focus();
}

function sanitizeKeyboardValue(fieldName, value) {
  if (fieldName === "areaCode" || fieldName === "phoneNumber") {
    return value.replace(/\D/g, "");
  }

  return value;
}

function sanitizeInputValue(fieldName, value) {
  if (fieldName === "areaCode") {
    const digits = value.replace(/\D/g, "").slice(0, 4);
    return digits ? `+${digits}` : "";
  }

  if (fieldName === "phoneNumber") {
    return value.replace(/\D/g, "").slice(0, 15);
  }

  return value;
}

function normalizeText(value) {
  return String(value || "").trim().replace(/\s+/g, " ");
}

function normalizeEmail(value) {
  return String(value || "").trim().toLowerCase();
}

function getReasonSubmissionValue(reasonKey) {
  return REASON_VALUES[reasonKey] || null;
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

async function createLead(values) {
  const payload = {
    firstName: values.firstName,
    lastName: values.lastName,
    country: values.country,
    company: values.company,
    email: values.email,
    jobTitle: values.jobTitle,
    areaCode: values.areaCode,
    phoneNumber: values.phoneNumber,
    reason: getReasonSubmissionValue(values.reason),
  };

  const response = await fetch("/api/leads", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const responseBody = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(responseBody?.detail || responseBody?.error || "lead_create_failed");
  }

  return responseBody;
}

function handleSpin() {
  if (state.isSpinning) {
    return;
  }

  clearReturnTimer();
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

  elements.wheelButton.classList.add("is-disabled");
  elements.wheelPointer.classList.add("is-spinning");
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
    elements.wheelPointer.classList.remove("is-spinning");
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
  const availableTypeCounts = countAvailableOutcomeTypes(candidates);
  const outcomeProbabilities = getOutcomeProbabilities(availableTypeCounts);
  let totalWeight = 0;

  for (const candidate of candidates) {
    totalWeight += getSegmentWeight(candidate.segment, availableTypeCounts, outcomeProbabilities);
  }

  let threshold = Math.random() * totalWeight;

  for (const candidate of candidates) {
    threshold -= getSegmentWeight(candidate.segment, availableTypeCounts, outcomeProbabilities);

    if (threshold <= 0) {
      return candidate;
    }
  }

  return candidates[candidates.length - 1];
}

function countAvailableOutcomeTypes(candidates) {
  return candidates.reduce(
    (counts, candidate) => {
      counts[candidate.segment.type] = (counts[candidate.segment.type] || 0) + 1;
      return counts;
    },
    { special: 0, replay: 0, alexa: 0, noLuck: 0 },
  );
}

function getOutcomeProbabilities(availableTypeCounts) {
  const probabilities = { ...OUTCOME_PROBABILITIES };

  if (availableTypeCounts.alexa === 0) {
    probabilities.replay += probabilities.alexa;
    probabilities.alexa = 0;
  }

  if (availableTypeCounts.replay === 0) {
    const replayShare = probabilities.replay;
    probabilities.replay = 0;
    probabilities.special += replayShare * 0.2;
    probabilities.noLuck += replayShare * 0.8;
  }

  return probabilities;
}

function getSegmentWeight(segment, availableTypeCounts, outcomeProbabilities) {
  const availableCount = availableTypeCounts[segment.type] || 0;
  const totalTypeProbability = outcomeProbabilities[segment.type] || 0;

  if (!availableCount || totalTypeProbability <= 0) {
    return 0;
  }

  return totalTypeProbability / availableCount;
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
    actionLabelKey: "overlay.newEntryAction",
    actionMode: "newEntry",
  });
  scheduleReturnToHome();
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
    elements.overlayCountdown.hidden = true;
    elements.overlayCountdown.textContent = "";
    return;
  }

  elements.overlayEyebrow.textContent = t(state.overlayConfig.eyebrowKey);
  elements.overlayTitle.textContent = t(state.overlayConfig.titleKey);
  elements.overlayDescription.textContent = t(state.overlayConfig.descriptionKey);
  const showCountdown =
    state.overlayConfig.actionMode === "newEntry" && state.returnCountdownSeconds > 0;
  elements.overlayCountdown.hidden = !showCountdown;
  elements.overlayCountdown.textContent = showCountdown
    ? t("overlay.autoReturn", { seconds: state.returnCountdownSeconds })
    : "";
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
  elements.overlayCountdown.hidden = true;
  elements.overlayCountdown.textContent = "";
}

function handleOverlayAction() {
  const mode = elements.overlayActionButton.dataset.mode;

  clearReturnTimer();

  if (mode === "replay") {
    hideOverlay();
    window.requestAnimationFrame(() => {
      elements.wheelButton.focus();
    });
    return;
  }

  finalizeRoundAndReturn();
}

function scheduleReturnToHome() {
  clearReturnTimer();
  state.returnCountdownSeconds = 10;
  renderOverlay();
  state.returnCountdownTimer = window.setInterval(() => {
    state.returnCountdownSeconds = Math.max(0, state.returnCountdownSeconds - 1);
    renderOverlay();
  }, 1000);
  state.returnTimer = window.setTimeout(() => {
    finalizeRoundAndReturn();
  }, 10000);
}

function clearReturnTimer() {
  if (state.returnTimer) {
    window.clearTimeout(state.returnTimer);
    state.returnTimer = null;
  }

  if (state.returnCountdownTimer) {
    window.clearInterval(state.returnCountdownTimer);
    state.returnCountdownTimer = null;
  }

  state.returnCountdownSeconds = 0;
}

function finalizeRoundAndReturn() {
  clearReturnTimer();
  stopSpinSound();
  hideOverlay();
  resetRound();
  clearLeadForm();
  closeKeyboard({ blur: true });
  showScreen("home");
}

function clearLeadForm() {
  elements.leadForm.reset();
  renderCountryOptions();
  elements.marketingConsent.checked = true;
  state.lastLeadId = null;
  state.formErrors = {};
  renderFormErrors();
  clearFormFeedback();
}

function resetRound() {
  state.spinCount = 0;
  state.isSpinning = false;
  state.currentRotation = 0;
  stopSpinSound();
  clearCelebration();
  elements.wheelButton.classList.remove("is-disabled");
  elements.wheelPointer.classList.remove("is-spinning");
  elements.wheelRotor.style.transition = "none";
  elements.wheelRotor.style.transform = "rotate(0deg)";
  setStatusNote(getReadyStatusKey());

  window.requestAnimationFrame(() => {
    elements.wheelRotor.style.transition = "";
  });
}

function showScreen(screenName) {
  state.screen = screenName;
  document.body.dataset.screen = screenName;

  if (screenName !== "form") {
    closeKeyboard({ blur: true });
  }

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
