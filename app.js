const puzzles = [
  {
    id: "prediction-app",
    title: "Make a prediction app",
    explanation: "This is the shortest path from data to a running model. Kubeflow helps teams prepare data, train models, track the model, and serve it on Kubernetes.",
    steps: [
      {
        action: "Prepare data",
        component: "Spark Operator",
        hint: "Data needs to be ready before training starts."
      },
      {
        action: "Train model",
        component: "Kubeflow Trainer",
        hint: "Training uses prepared data to teach the model."
      },
      {
        action: "Save model",
        component: "Kubeflow Hub",
        hint: "Save the model before it is served."
      },
      {
        action: "Serve predictions",
        component: "KServe",
        hint: "Serving comes after a model exists."
      }
    ]
  },
  {
    id: "try-train-launch",
    title: "Try, train, launch",
    explanation: "This flow starts where many teams start: a notebook. Kubeflow lets that work move toward training, tracking, and serving.",
    steps: [
      {
        action: "Try ideas",
        component: "Kubeflow Notebooks",
        hint: "Notebooks are a good place to explore first."
      },
      {
        action: "Train model",
        component: "Kubeflow Trainer",
        hint: "Training turns the idea into a model."
      },
      {
        action: "Save model",
        component: "Kubeflow Hub",
        hint: "Track the trained model before launch."
      },
      {
        action: "Launch model",
        component: "KServe",
        hint: "Launch is the final step in this flow."
      }
    ]
  },
  {
    id: "improve-model",
    title: "Improve the model",
    explanation: "Katib helps search for better model settings. The winning result can then be saved for production use.",
    steps: [
      {
        action: "Train model",
        component: "Kubeflow Trainer",
        hint: "Start with a model you can improve."
      },
      {
        action: "Test better settings",
        component: "Katib",
        hint: "Katib tests options after there is something to tune."
      },
      {
        action: "Pick winner",
        component: "Best trial",
        hint: "Pick the best trial after comparing results."
      },
      {
        action: "Save model",
        component: "Kubeflow Hub",
        hint: "Save the winning result last."
      }
    ]
  },
  {
    id: "repeat-workflow",
    title: "Repeat the workflow",
    explanation: "Kubeflow Pipelines helps turn one-off ML work into a repeatable workflow.",
    steps: [
      {
        action: "Prepare data",
        component: "Data step",
        hint: "Every repeatable flow needs input data first."
      },
      {
        action: "Train model",
        component: "Training step",
        hint: "Training uses the prepared data."
      },
      {
        action: "Test model",
        component: "Evaluation step",
        hint: "Test the model before repeating or shipping it."
      },
      {
        action: "Run it again",
        component: "Kubeflow Pipelines",
        hint: "Pipelines make the steps repeatable."
      }
    ]
  },
  {
    id: "notebook-to-app",
    title: "From notebook to app",
    explanation: "This flow shows how interactive work can become a repeatable workflow and then a deployed model.",
    steps: [
      {
        action: "Explore data",
        component: "Kubeflow Notebooks",
        hint: "Explore before building the workflow."
      },
      {
        action: "Build workflow",
        component: "Kubeflow Pipelines",
        hint: "Pipelines connect the work into repeatable steps."
      },
      {
        action: "Train model",
        component: "Kubeflow Trainer",
        hint: "Training belongs inside or after the workflow."
      },
      {
        action: "Deploy model",
        component: "KServe",
        hint: "Deploy after a model is trained."
      }
    ]
  },
  {
    id: "fine-tune-assistant",
    title: "Fine-tune an AI assistant",
    explanation: "Kubeflow can support fine-tuning and serving AI models on Kubernetes.",
    steps: [
      {
        action: "Review examples",
        component: "Kubeflow Notebooks",
        hint: "Review the examples before fine-tuning."
      },
      {
        action: "Fine-tune model",
        component: "Kubeflow Trainer",
        hint: "Fine-tuning uses the examples to adapt the model."
      },
      {
        action: "Tune settings",
        component: "Katib",
        hint: "Tune after the training task is defined."
      },
      {
        action: "Serve assistant",
        component: "KServe",
        hint: "Serving makes the assistant available."
      }
    ]
  }
];

const storageKeys = {
  email: "kubeflowBoothEmail",
  sessions: "kubeflowBoothSessions",
  solved: "kubeflowBoothSolved"
};

const landingScreen = document.querySelector("#landingScreen");
const gameScreen = document.querySelector("#gameScreen");
const winScreen = document.querySelector("#winScreen");
const emailForm = document.querySelector("#emailForm");
const emailInput = document.querySelector("#emailInput");
const emailError = document.querySelector("#emailError");
const puzzleTitle = document.querySelector("#puzzleTitle");
const scoreChip = document.querySelector("#scoreChip");
const feedback = document.querySelector("#feedback");
const cardList = document.querySelector("#cardList");
const checkButton = document.querySelector("#checkButton");
const shuffleButton = document.querySelector("#shuffleButton");
const winExplanation = document.querySelector("#winExplanation");
const attemptCount = document.querySelector("#attemptCount");
const solvedCount = document.querySelector("#solvedCount");
const nextButton = document.querySelector("#nextButton");
const restartButton = document.querySelector("#restartButton");
const exportButton = document.querySelector("#exportButton");

const state = {
  email: localStorage.getItem(storageKeys.email) || "",
  currentPuzzle: null,
  currentOrder: [],
  selectedIndex: null,
  attempts: 0,
  startedAt: null,
  showHint: false,
  repeatMode: false
};

emailInput.value = state.email;

emailForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const email = emailInput.value.trim();

  if (!isValidEmail(email)) {
    emailError.textContent = "Enter a valid email to start.";
    emailInput.focus();
    return;
  }

  emailError.textContent = "";
  state.email = email;
  localStorage.setItem(storageKeys.email, email);
  startPuzzle(selectNextPuzzle());
});

checkButton.addEventListener("click", () => {
  state.attempts += 1;
  const wrongIndexes = getWrongIndexes();

  if (wrongIndexes.length === 0) {
    completePuzzle();
    return;
  }

  state.showHint = state.attempts >= 2;
  feedback.textContent = state.showHint
    ? "Some steps are still out of order. A hint is showing on one card."
    : "Some steps are still out of order.";
  feedback.classList.add("is-warning");
  renderCards(wrongIndexes);
});

shuffleButton.addEventListener("click", () => {
  state.currentOrder = shuffleSteps(state.currentPuzzle.steps);
  state.selectedIndex = null;
  state.showHint = false;
  feedback.textContent = "Shuffled. Tap two cards to swap them.";
  feedback.classList.remove("is-warning");
  renderCards([]);
});

nextButton.addEventListener("click", () => {
  startPuzzle(selectNextPuzzle());
});

restartButton.addEventListener("click", () => {
  startPuzzle(state.currentPuzzle);
});

exportButton.addEventListener("click", () => {
  const payload = {
    exportedAt: new Date().toISOString(),
    email: localStorage.getItem(storageKeys.email) || "",
    solved: readJson(storageKeys.solved, []),
    sessions: readJson(storageKeys.sessions, [])
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `kubeflow-booth-data-${Date.now()}.json`;
  link.click();
  URL.revokeObjectURL(url);
});

function startPuzzle(puzzle) {
  state.currentPuzzle = puzzle;
  state.currentOrder = shuffleSteps(puzzle.steps);
  state.selectedIndex = null;
  state.attempts = 0;
  state.startedAt = new Date().toISOString();
  state.showHint = false;

  puzzleTitle.textContent = puzzle.title;
  feedback.textContent = state.repeatMode
    ? "All puzzles are solved. Repeating a random puzzle now."
    : "Build the flow from first step to last.";
  feedback.classList.remove("is-warning");
  updateScore();
  renderCards([]);
  showScreen(gameScreen);
}

function renderCards(wrongIndexes) {
  cardList.innerHTML = "";

  state.currentOrder.forEach((step, index) => {
    const item = document.createElement("li");
    const button = document.createElement("button");
    const position = document.createElement("span");
    const content = document.createElement("span");
    const action = document.createElement("span");
    const component = document.createElement("span");

    button.type = "button";
    button.className = "workflow-card";
    position.className = "card-position";
    position.setAttribute("aria-hidden", "true");
    position.textContent = index + 1;

    if (state.selectedIndex === index) {
      button.classList.add("is-selected");
    }

    if (wrongIndexes.includes(index)) {
      button.classList.add("is-wrong");
    }

    action.className = "card-action";
    action.textContent = step.action;
    component.className = "card-component";
    component.textContent = step.component;
    content.append(action, component);

    if (state.showHint && wrongIndexes[0] === index) {
      const hint = document.createElement("span");
      hint.className = "card-hint";
      hint.textContent = step.hint;
      content.append(hint);
    }

    button.append(position, content);
    button.addEventListener("click", () => selectCard(index));
    item.append(button);
    cardList.append(item);
  });
}

function selectCard(index) {
  if (state.selectedIndex === null) {
    state.selectedIndex = index;
    renderCards(getWrongIndexesForDisplay());
    return;
  }

  if (state.selectedIndex === index) {
    state.selectedIndex = null;
    renderCards(getWrongIndexesForDisplay());
    return;
  }

  const selectedStep = state.currentOrder[state.selectedIndex];
  state.currentOrder[state.selectedIndex] = state.currentOrder[index];
  state.currentOrder[index] = selectedStep;
  state.selectedIndex = null;
  feedback.textContent = "Cards swapped. Check the order when it looks right.";
  feedback.classList.remove("is-warning");
  renderCards([]);
}

function completePuzzle() {
  const solved = readJson(storageKeys.solved, []);
  const sessions = readJson(storageKeys.sessions, []);

  if (!solved.includes(state.currentPuzzle.id)) {
    solved.push(state.currentPuzzle.id);
  }

  sessions.push({
    email: state.email,
    startedAt: state.startedAt,
    puzzleId: state.currentPuzzle.id,
    solvedAt: new Date().toISOString(),
    attempts: state.attempts
  });

  localStorage.setItem(storageKeys.solved, JSON.stringify(solved));
  localStorage.setItem(storageKeys.sessions, JSON.stringify(sessions));

  winExplanation.textContent = state.currentPuzzle.explanation;
  attemptCount.textContent = `${state.attempts} ${state.attempts === 1 ? "check" : "checks"}`;
  solvedCount.textContent = `${solved.length} solved`;
  updateScore();
  showScreen(winScreen);
}

function selectNextPuzzle() {
  const solved = readJson(storageKeys.solved, []);
  const unsolved = puzzles.filter((puzzle) => !solved.includes(puzzle.id));
  const pool = unsolved.length > 0 ? unsolved : puzzles;
  state.repeatMode = unsolved.length === 0;
  return pool[Math.floor(Math.random() * pool.length)];
}

function getWrongIndexes() {
  return state.currentOrder.reduce((indexes, step, index) => {
    if (step !== state.currentPuzzle.steps[index]) {
      indexes.push(index);
    }
    return indexes;
  }, []);
}

function getWrongIndexesForDisplay() {
  return feedback.classList.contains("is-warning") ? getWrongIndexes() : [];
}

function updateScore() {
  const solved = readJson(storageKeys.solved, []);
  scoreChip.textContent = `${solved.length} solved`;
}

function shuffleSteps(steps) {
  const shuffled = [...steps];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }

  if (shuffled.every((step, index) => step === steps[index])) {
    return shuffleSteps(steps);
  }

  return shuffled;
}

function showScreen(screen) {
  [landingScreen, gameScreen, winScreen].forEach((item) => {
    item.classList.toggle("is-hidden", item !== screen);
  });
}

function readJson(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) || fallback;
  } catch {
    return fallback;
  }
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
