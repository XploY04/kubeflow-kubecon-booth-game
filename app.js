// ---------------------------------------------------------------------------
// Firebase config
// ---------------------------------------------------------------------------
// Frontend Firebase config is safe to ship in the browser. Replace the
// placeholder values below with your project's web config. If the values are
// left as placeholders (or the SDK fails to load) the app runs in a local
// fallback mode that stores submissions on this device only.
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const FIREBASE_SDK_VERSION = "10.12.2";
const SUBMISSIONS_COLLECTION = "submissions";

// ---------------------------------------------------------------------------
// Professions
// ---------------------------------------------------------------------------
const PROFESSIONS = [
  {
    key: "student",
    label: "Student / Learner",
    questionCount: 5,
    summary:
      "Kubeflow is an open-source platform for running machine learning on Kubernetes. You write code in Kubeflow Notebooks, turn the steps into repeatable Kubeflow Pipelines, train with Kubeflow Trainer, tune settings with Katib, track models in Kubeflow Hub, and serve them with KServe. The Kubeflow Dashboard ties it all together."
  },
  {
    key: "dataScientist",
    label: "Data Scientist / AI Practitioner",
    questionCount: 6,
    summary:
      "Your day moves from exploring data in Kubeflow Notebooks to training models with Kubeflow Trainer and searching for better settings with Katib. Spark Operator handles large-scale data prep, Kubeflow Hub keeps a registry of your models, and KServe puts the winning model behind an API."
  },
  {
    key: "mlops",
    label: "ML Engineer / MLOps Engineer",
    questionCount: 7,
    summary:
      "You turn experiments into production. Kubeflow Pipelines automates and schedules repeatable workflows, Kubeflow Trainer scales training, Katib automates tuning, Kubeflow Hub acts as the model registry, and KServe serves models with autoscaling and canary rollouts. Spark Operator runs the heavy data jobs."
  },
  {
    key: "platform",
    label: "Platform Engineer / SRE",
    questionCount: 7,
    summary:
      "Kubeflow is Kubernetes-native, so it fits the platform you already run. The Kubeflow Dashboard gives multi-user access, Kubeflow Notebooks provisions workspaces, Spark Operator and Kubeflow Trainer schedule heavy jobs, Katib runs tuning experiments, and KServe handles model serving with autoscaling and scale-to-zero."
  },
  {
    key: "developer",
    label: "Software Developer Building AI Apps",
    questionCount: 6,
    summary:
      "You can call models without managing the ML stack yourself. KServe exposes a trained model as a REST or gRPC API, Kubeflow Hub helps you find the right model and its metadata, Kubeflow Pipelines runs the repeatable workflow behind your app, and Kubeflow Trainer plus Katib build and tune custom models when you need them."
  }
];

const PROFESSION_BY_KEY = Object.fromEntries(PROFESSIONS.map((p) => [p.key, p]));

// ---------------------------------------------------------------------------
// Question pools (multiple choice, 4 options each)
// ---------------------------------------------------------------------------
const QUESTION_POOLS = {
  student: [
    {
      id: "student-what-is-kubeflow",
      prompt: "In plain terms, what does Kubeflow help you do?",
      options: [
        "Run machine learning workflows on Kubernetes",
        "Design websites without code",
        "Store passwords securely",
        "Edit videos in the browser"
      ],
      correctAnswer: "Run machine learning workflows on Kubernetes",
      explanation: "Kubeflow is an open-source platform that runs the steps of machine learning on Kubernetes.",
      component: "Kubeflow Dashboard"
    },
    {
      id: "student-notebooks",
      prompt: "Which Kubeflow component gives you an interactive place to write and run code, like Jupyter?",
      options: ["Kubeflow Notebooks", "KServe", "Katib", "Spark Operator"],
      correctAnswer: "Kubeflow Notebooks",
      explanation: "Kubeflow Notebooks are interactive development environments for working with notebooks and code.",
      component: "Kubeflow Notebooks"
    },
    {
      id: "student-kserve",
      prompt: "Which Kubeflow component helps serve a trained model as an API?",
      options: ["KServe", "Katib", "Kubeflow Notebooks", "Spark Operator"],
      correctAnswer: "KServe",
      explanation: "KServe is used for model inference and serving on Kubernetes.",
      component: "KServe"
    },
    {
      id: "student-pipelines",
      prompt: "You want to run the same ML steps again and again without redoing them by hand. Which component helps?",
      options: ["Kubeflow Pipelines", "Kubeflow Notebooks", "KServe", "Katib"],
      correctAnswer: "Kubeflow Pipelines",
      explanation: "Kubeflow Pipelines turns ML steps into repeatable workflows.",
      component: "Kubeflow Pipelines"
    },
    {
      id: "student-trainer",
      prompt: "Which Kubeflow component runs model training jobs on Kubernetes?",
      options: ["Kubeflow Trainer", "KServe", "Kubeflow Hub", "Kubeflow Dashboard"],
      correctAnswer: "Kubeflow Trainer",
      explanation: "Kubeflow Trainer runs model training jobs on Kubernetes.",
      component: "Kubeflow Trainer"
    },
    {
      id: "student-katib",
      prompt: "Which component automatically searches for the best model settings (hyperparameters)?",
      options: ["Katib", "Kubeflow Notebooks", "Spark Operator", "KServe"],
      correctAnswer: "Katib",
      explanation: "Katib does hyperparameter tuning and AutoML-style optimization.",
      component: "Katib"
    },
    {
      id: "student-dashboard",
      prompt: "Which part of Kubeflow is the central web UI where you reach all the tools?",
      options: ["Kubeflow Dashboard", "Katib", "Kubeflow Trainer", "KServe"],
      correctAnswer: "Kubeflow Dashboard",
      explanation: "The Kubeflow Dashboard is the central UI for Kubeflow.",
      component: "Kubeflow Dashboard"
    },
    {
      id: "student-hub",
      prompt: "Where does Kubeflow keep track of trained models and their details?",
      options: ["Kubeflow Hub", "Spark Operator", "Kubeflow Notebooks", "Katib"],
      correctAnswer: "Kubeflow Hub",
      explanation: "Kubeflow Hub is the model registry that stores models and model metadata.",
      component: "Kubeflow Hub"
    },
    {
      id: "student-spark",
      prompt: "Which component runs big data processing jobs using Spark on Kubernetes?",
      options: ["Spark Operator", "KServe", "Katib", "Kubeflow Hub"],
      correctAnswer: "Spark Operator",
      explanation: "Spark Operator runs Spark data processing jobs on Kubernetes.",
      component: "Spark Operator"
    },
    {
      id: "student-kubernetes",
      prompt: "Kubeflow is built to run on top of which system?",
      options: ["Kubernetes", "A single laptop only", "A spreadsheet", "A phone app store"],
      correctAnswer: "Kubernetes",
      explanation: "Kubeflow is Kubernetes-native, so it runs on Kubernetes clusters.",
      component: "Kubeflow Dashboard"
    }
  ],

  dataScientist: [
    {
      id: "ds-notebooks",
      prompt: "You want to explore a dataset and try model ideas interactively. Which component is your starting point?",
      options: ["Kubeflow Notebooks", "KServe", "Spark Operator", "Kubeflow Dashboard"],
      correctAnswer: "Kubeflow Notebooks",
      explanation: "Kubeflow Notebooks give you an interactive environment for exploration and prototyping.",
      component: "Kubeflow Notebooks"
    },
    {
      id: "ds-katib",
      prompt: "Tuning learning rate and batch size by hand is slow. Which component automates the search?",
      options: ["Katib", "Kubeflow Hub", "KServe", "Spark Operator"],
      correctAnswer: "Katib",
      explanation: "Katib handles hyperparameter tuning and AutoML-style optimization.",
      component: "Katib"
    },
    {
      id: "ds-pipelines",
      prompt: "You want your data-to-model steps to run the same way every time. Which component makes them reproducible?",
      options: ["Kubeflow Pipelines", "Kubeflow Notebooks", "KServe", "Katib"],
      correctAnswer: "Kubeflow Pipelines",
      explanation: "Kubeflow Pipelines makes ML workflows repeatable and reproducible.",
      component: "Kubeflow Pipelines"
    },
    {
      id: "ds-hub",
      prompt: "You trained several model versions and want to compare and track them. Where do they live?",
      options: ["Kubeflow Hub", "Spark Operator", "Kubeflow Notebooks", "Katib"],
      correctAnswer: "Kubeflow Hub",
      explanation: "Kubeflow Hub is the model registry that stores models and their metadata.",
      component: "Kubeflow Hub"
    },
    {
      id: "ds-kserve",
      prompt: "Your best model is ready. Which component turns it into a prediction endpoint?",
      options: ["KServe", "Katib", "Spark Operator", "Kubeflow Notebooks"],
      correctAnswer: "KServe",
      explanation: "KServe serves models for inference behind an API.",
      component: "KServe"
    },
    {
      id: "ds-trainer",
      prompt: "Training is too big for one machine. Which component runs the training job across the cluster?",
      options: ["Kubeflow Trainer", "Kubeflow Dashboard", "Kubeflow Hub", "KServe"],
      correctAnswer: "Kubeflow Trainer",
      explanation: "Kubeflow Trainer runs model training jobs, including distributed training, on Kubernetes.",
      component: "Kubeflow Trainer"
    },
    {
      id: "ds-spark",
      prompt: "You need to clean and prepare a very large dataset before training. Which component handles it?",
      options: ["Spark Operator", "Katib", "KServe", "Kubeflow Hub"],
      correctAnswer: "Spark Operator",
      explanation: "Spark Operator runs large-scale Spark data processing jobs on Kubernetes.",
      component: "Spark Operator"
    },
    {
      id: "ds-dashboard",
      prompt: "Which Kubeflow component is the single web UI you use to reach notebooks, pipelines and experiments?",
      options: ["Kubeflow Dashboard", "KServe", "Katib", "Spark Operator"],
      correctAnswer: "Kubeflow Dashboard",
      explanation: "The Kubeflow Dashboard is the central UI for Kubeflow.",
      component: "Kubeflow Dashboard"
    },
    {
      id: "ds-pipeline-steps",
      prompt: "A Kubeflow Pipeline is mainly built from what?",
      options: [
        "Reusable steps that connect into a workflow",
        "A single giant script you can't reuse",
        "Only manual clicks in a UI",
        "Spreadsheet formulas"
      ],
      correctAnswer: "Reusable steps that connect into a workflow",
      explanation: "Pipelines are made of steps (components) that link together into a repeatable workflow.",
      component: "Kubeflow Pipelines"
    },
    {
      id: "ds-katib-automl",
      prompt: "Besides tuning, what else does Katib support?",
      options: [
        "AutoML-style optimization to find good models",
        "Serving models to end users",
        "Storing raw datasets",
        "Drawing dashboards"
      ],
      correctAnswer: "AutoML-style optimization to find good models",
      explanation: "Katib supports hyperparameter tuning and AutoML-style optimization.",
      component: "Katib"
    }
  ],

  mlops: [
    {
      id: "mlops-pipelines-automate",
      prompt: "You want training and evaluation to run automatically as one repeatable workflow. Which component do you reach for?",
      options: ["Kubeflow Pipelines", "Kubeflow Notebooks", "KServe", "Kubeflow Hub"],
      correctAnswer: "Kubeflow Pipelines",
      explanation: "Kubeflow Pipelines automates repeatable ML workflows.",
      component: "Kubeflow Pipelines"
    },
    {
      id: "mlops-kserve-autoscale",
      prompt: "Your model endpoint needs to scale up under load and back down when idle. Which component handles serving?",
      options: ["KServe", "Katib", "Spark Operator", "Kubeflow Notebooks"],
      correctAnswer: "KServe",
      explanation: "KServe serves models with features like autoscaling for inference traffic.",
      component: "KServe"
    },
    {
      id: "mlops-katib",
      prompt: "Which component automates hyperparameter search so you don't tune models by hand?",
      options: ["Katib", "Kubeflow Hub", "Kubeflow Dashboard", "KServe"],
      correctAnswer: "Katib",
      explanation: "Katib automates hyperparameter tuning and AutoML-style optimization.",
      component: "Katib"
    },
    {
      id: "mlops-hub-registry",
      prompt: "You need a registry to track model versions and promote the right one to production. Which component is it?",
      options: ["Kubeflow Hub", "Spark Operator", "Kubeflow Notebooks", "Katib"],
      correctAnswer: "Kubeflow Hub",
      explanation: "Kubeflow Hub is the model registry holding models and model metadata.",
      component: "Kubeflow Hub"
    },
    {
      id: "mlops-trainer-scale",
      prompt: "Training needs to run across many nodes and GPUs. Which component manages those training jobs?",
      options: ["Kubeflow Trainer", "Kubeflow Dashboard", "KServe", "Kubeflow Hub"],
      correctAnswer: "Kubeflow Trainer",
      explanation: "Kubeflow Trainer runs and scales model training jobs on Kubernetes.",
      component: "Kubeflow Trainer"
    },
    {
      id: "mlops-spark-etl",
      prompt: "Your pipeline includes a heavy ETL stage over terabytes of data. Which component runs it?",
      options: ["Spark Operator", "Katib", "KServe", "Kubeflow Notebooks"],
      correctAnswer: "Spark Operator",
      explanation: "Spark Operator runs Spark-based data processing and ETL jobs on Kubernetes.",
      component: "Spark Operator"
    },
    {
      id: "mlops-pipelines-schedule",
      prompt: "You want a retraining workflow to run on a recurring schedule. Which component supports scheduled runs?",
      options: ["Kubeflow Pipelines", "Kubeflow Notebooks", "Kubeflow Hub", "KServe"],
      correctAnswer: "Kubeflow Pipelines",
      explanation: "Kubeflow Pipelines can run workflows on a recurring schedule.",
      component: "Kubeflow Pipelines"
    },
    {
      id: "mlops-kserve-canary",
      prompt: "You want to roll out a new model version to a small share of traffic first. Which component supports canary serving?",
      options: ["KServe", "Spark Operator", "Katib", "Kubeflow Notebooks"],
      correctAnswer: "KServe",
      explanation: "KServe supports model serving patterns like canary rollouts between versions.",
      component: "KServe"
    },
    {
      id: "mlops-dashboard",
      prompt: "Which component gives your team one central UI to view pipelines, experiments and runs?",
      options: ["Kubeflow Dashboard", "KServe", "Spark Operator", "Katib"],
      correctAnswer: "Kubeflow Dashboard",
      explanation: "The Kubeflow Dashboard is the central UI for Kubeflow.",
      component: "Kubeflow Dashboard"
    },
    {
      id: "mlops-pipelines-lineage",
      prompt: "You want to track which data and steps produced a given model run. Which component records that lineage?",
      options: ["Kubeflow Pipelines", "Kubeflow Notebooks", "KServe", "Spark Operator"],
      correctAnswer: "Kubeflow Pipelines",
      explanation: "Kubeflow Pipelines tracks artifacts and lineage across workflow runs.",
      component: "Kubeflow Pipelines"
    }
  ],

  platform: [
    {
      id: "platform-kubernetes-native",
      prompt: "Kubeflow fits an existing platform because it is built to be what?",
      options: [
        "Kubernetes-native",
        "A standalone desktop app",
        "A managed spreadsheet",
        "A single Docker container only"
      ],
      correctAnswer: "Kubernetes-native",
      explanation: "Kubeflow is Kubernetes-native, so it runs on the clusters you already operate.",
      component: "Kubeflow Dashboard"
    },
    {
      id: "platform-dashboard-multiuser",
      prompt: "Which component provides the central, multi-user web UI for Kubeflow?",
      options: ["Kubeflow Dashboard", "Katib", "KServe", "Spark Operator"],
      correctAnswer: "Kubeflow Dashboard",
      explanation: "The Kubeflow Dashboard is the central UI and supports multiple users.",
      component: "Kubeflow Dashboard"
    },
    {
      id: "platform-spark",
      prompt: "Which component lets teams run Spark data jobs natively on your Kubernetes cluster?",
      options: ["Spark Operator", "KServe", "Katib", "Kubeflow Hub"],
      correctAnswer: "Spark Operator",
      explanation: "Spark Operator runs Spark data processing jobs on Kubernetes.",
      component: "Spark Operator"
    },
    {
      id: "platform-kserve-infra",
      prompt: "Which component owns the serving layer, including autoscaling model endpoints?",
      options: ["KServe", "Kubeflow Notebooks", "Katib", "Kubeflow Hub"],
      correctAnswer: "KServe",
      explanation: "KServe runs the model serving layer with autoscaling for inference.",
      component: "KServe"
    },
    {
      id: "platform-trainer-resources",
      prompt: "Which component schedules training jobs and their GPU and CPU requests on the cluster?",
      options: ["Kubeflow Trainer", "Kubeflow Dashboard", "KServe", "Kubeflow Hub"],
      correctAnswer: "Kubeflow Trainer",
      explanation: "Kubeflow Trainer runs training jobs and requests cluster resources for them.",
      component: "Kubeflow Trainer"
    },
    {
      id: "platform-notebooks-provision",
      prompt: "Which component lets you provision per-user notebook workspaces for your data teams?",
      options: ["Kubeflow Notebooks", "KServe", "Spark Operator", "Katib"],
      correctAnswer: "Kubeflow Notebooks",
      explanation: "Kubeflow Notebooks provisions interactive notebook environments for users.",
      component: "Kubeflow Notebooks"
    },
    {
      id: "platform-pipelines-orchestrate",
      prompt: "Which component orchestrates multi-step ML workflows as Kubernetes resources?",
      options: ["Kubeflow Pipelines", "Kubeflow Notebooks", "Kubeflow Hub", "KServe"],
      correctAnswer: "Kubeflow Pipelines",
      explanation: "Kubeflow Pipelines orchestrates repeatable ML workflows on Kubernetes.",
      component: "Kubeflow Pipelines"
    },
    {
      id: "platform-katib-experiments",
      prompt: "Which component runs tuning experiments as Kubernetes-managed jobs?",
      options: ["Katib", "Kubeflow Dashboard", "KServe", "Spark Operator"],
      correctAnswer: "Katib",
      explanation: "Katib runs hyperparameter tuning experiments on Kubernetes.",
      component: "Katib"
    },
    {
      id: "platform-kserve-scale-zero",
      prompt: "You want idle model endpoints to use no resources until a request arrives. Which component supports scale-to-zero serving?",
      options: ["KServe", "Spark Operator", "Kubeflow Notebooks", "Kubeflow Hub"],
      correctAnswer: "KServe",
      explanation: "KServe can scale model endpoints down to zero when idle and back up on demand.",
      component: "KServe"
    },
    {
      id: "platform-hub-registry",
      prompt: "Which component acts as the shared model registry across teams?",
      options: ["Kubeflow Hub", "Spark Operator", "Kubeflow Notebooks", "Katib"],
      correctAnswer: "Kubeflow Hub",
      explanation: "Kubeflow Hub is the model registry that stores models and metadata for all teams.",
      component: "Kubeflow Hub"
    }
  ],

  developer: [
    {
      id: "dev-kserve-api",
      prompt: "You want to call a trained model from your app over REST or gRPC. Which component exposes it?",
      options: ["KServe", "Katib", "Spark Operator", "Kubeflow Notebooks"],
      correctAnswer: "KServe",
      explanation: "KServe serves a trained model as a REST or gRPC inference API.",
      component: "KServe"
    },
    {
      id: "dev-hub-find",
      prompt: "You need to find the right model and check its metadata before wiring it into your app. Where do you look?",
      options: ["Kubeflow Hub", "Spark Operator", "Katib", "Kubeflow Dashboard"],
      correctAnswer: "Kubeflow Hub",
      explanation: "Kubeflow Hub is the model registry holding models and their metadata.",
      component: "Kubeflow Hub"
    },
    {
      id: "dev-notebooks-prototype",
      prompt: "You want to quickly prototype against a model in code. Which component gives you that workspace?",
      options: ["Kubeflow Notebooks", "KServe", "Spark Operator", "Kubeflow Hub"],
      correctAnswer: "Kubeflow Notebooks",
      explanation: "Kubeflow Notebooks give you an interactive environment to write and test code.",
      component: "Kubeflow Notebooks"
    },
    {
      id: "dev-pipelines-backend",
      prompt: "Your app needs a repeatable workflow to refresh predictions behind the scenes. Which component runs it?",
      options: ["Kubeflow Pipelines", "Kubeflow Notebooks", "KServe", "Katib"],
      correctAnswer: "Kubeflow Pipelines",
      explanation: "Kubeflow Pipelines runs the repeatable workflow behind your app.",
      component: "Kubeflow Pipelines"
    },
    {
      id: "dev-kserve-endpoint",
      prompt: "Your app sends input data and expects a prediction back. Which component answers that request?",
      options: ["KServe", "Kubeflow Hub", "Spark Operator", "Katib"],
      correctAnswer: "KServe",
      explanation: "KServe handles inference requests and returns predictions.",
      component: "KServe"
    },
    {
      id: "dev-trainer-custom",
      prompt: "You need to train a custom model for your feature. Which component runs the training job?",
      options: ["Kubeflow Trainer", "KServe", "Kubeflow Dashboard", "Spark Operator"],
      correctAnswer: "Kubeflow Trainer",
      explanation: "Kubeflow Trainer runs model training jobs on Kubernetes.",
      component: "Kubeflow Trainer"
    },
    {
      id: "dev-katib-config",
      prompt: "Your custom model needs good settings but you don't want to guess. Which component finds them?",
      options: ["Katib", "KServe", "Kubeflow Notebooks", "Kubeflow Hub"],
      correctAnswer: "Katib",
      explanation: "Katib searches for the best hyperparameters automatically.",
      component: "Katib"
    },
    {
      id: "dev-spark-data",
      prompt: "Your app generates huge amounts of data to process before it's useful. Which component handles it at scale?",
      options: ["Spark Operator", "KServe", "Katib", "Kubeflow Hub"],
      correctAnswer: "Spark Operator",
      explanation: "Spark Operator runs large-scale data processing jobs on Kubernetes.",
      component: "Spark Operator"
    },
    {
      id: "dev-dashboard",
      prompt: "Which component is the central UI where you explore the Kubeflow tools available to you?",
      options: ["Kubeflow Dashboard", "KServe", "Spark Operator", "Katib"],
      correctAnswer: "Kubeflow Dashboard",
      explanation: "The Kubeflow Dashboard is the central UI for Kubeflow.",
      component: "Kubeflow Dashboard"
    },
    {
      id: "dev-kserve-scale",
      prompt: "Your app traffic spikes during launches. Which component scales model serving to match demand?",
      options: ["KServe", "Kubeflow Notebooks", "Kubeflow Hub", "Spark Operator"],
      correctAnswer: "KServe",
      explanation: "KServe autoscales model endpoints to match inference traffic.",
      component: "KServe"
    }
  ]
};

// ---------------------------------------------------------------------------
// Scoring
// ---------------------------------------------------------------------------
function computeScore(correctAnswers, totalQuestions, timeTakenSeconds) {
  const baseScore = (correctAnswers / totalQuestions) * 1000;
  const timeBonus = Math.max(0, 300 - timeTakenSeconds);
  return Math.round(baseScore + timeBonus);
}

// ---------------------------------------------------------------------------
// Local storage
// ---------------------------------------------------------------------------
const STORAGE_KEYS = {
  profile: "kubeflowQuizProfile",
  submissions: "kubeflowQuizSubmissions",
  lastSubmissionId: "kubeflowQuizLastSubmissionId"
};

function readJson(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
}

function saveLocalSubmission(record) {
  const list = readJson(STORAGE_KEYS.submissions, []);
  list.push(record);
  localStorage.setItem(STORAGE_KEYS.submissions, JSON.stringify(list));
}

// ---------------------------------------------------------------------------
// Firebase (loaded lazily so a missing config or offline CDN falls back cleanly)
// ---------------------------------------------------------------------------
let firebaseHandle = null;
let firebaseInitPromise = null;

function isFirebaseConfigured() {
  return Object.values(firebaseConfig).every(
    (value) => typeof value === "string" && value.length > 0 && !value.startsWith("YOUR_")
  );
}

async function getFirebase() {
  if (!isFirebaseConfigured()) return null;
  if (firebaseHandle) return firebaseHandle;
  if (firebaseInitPromise) return firebaseInitPromise;

  firebaseInitPromise = (async () => {
    try {
      const base = `https://www.gstatic.com/firebasejs/${FIREBASE_SDK_VERSION}`;
      const appMod = await import(`${base}/firebase-app.js`);
      const fsMod = await import(`${base}/firebase-firestore.js`);
      const app = appMod.initializeApp(firebaseConfig);
      const db = fsMod.getFirestore(app);
      firebaseHandle = {
        db,
        collection: fsMod.collection,
        addDoc: fsMod.addDoc,
        getDocs: fsMod.getDocs,
        query: fsMod.query,
        orderBy: fsMod.orderBy,
        limit: fsMod.limit,
        serverTimestamp: fsMod.serverTimestamp
      };
      return firebaseHandle;
    } catch (error) {
      console.warn("Firebase unavailable, using local fallback.", error);
      return null;
    }
  })();

  return firebaseInitPromise;
}

// ---------------------------------------------------------------------------
// DOM references
// ---------------------------------------------------------------------------
const screens = {
  start: document.querySelector("#startScreen"),
  quiz: document.querySelector("#quizScreen"),
  result: document.querySelector("#resultScreen"),
  leaderboard: document.querySelector("#leaderboardScreen")
};

const startForm = document.querySelector("#startForm");
const nameInput = document.querySelector("#nameInput");
const emailInput = document.querySelector("#emailInput");
const professionGroup = document.querySelector("#professionGroup");
const startError = document.querySelector("#startError");

const professionPill = document.querySelector("#professionPill");
const progressLabel = document.querySelector("#progressLabel");
const progressBar = document.querySelector("#progressBar");
const timerLabel = document.querySelector("#timerLabel");
const correctLabel = document.querySelector("#correctLabel");
const questionPrompt = document.querySelector("#questionPrompt");
const optionsList = document.querySelector("#optionsList");
const nextButton = document.querySelector("#nextButton");

const resultScore = document.querySelector("#resultScore");
const resultCorrect = document.querySelector("#resultCorrect");
const resultTime = document.querySelector("#resultTime");
const resultProfession = document.querySelector("#resultProfession");
const resultSummary = document.querySelector("#resultSummary");
const resultNote = document.querySelector("#resultNote");
const viewLeaderboardButton = document.querySelector("#viewLeaderboardButton");
const tryAgainButton = document.querySelector("#tryAgainButton");

const leaderboardList = document.querySelector("#leaderboardList");
const leaderboardNote = document.querySelector("#leaderboardNote");
const leaderboardStatus = document.querySelector("#leaderboardStatus");
const backToResultButton = document.querySelector("#backToResultButton");
const playAgainButton = document.querySelector("#playAgainButton");

// ---------------------------------------------------------------------------
// State
// ---------------------------------------------------------------------------
const state = {
  name: "",
  email: "",
  profession: null,
  questions: [],
  currentIndex: 0,
  answers: [],
  selectedOption: null,
  startTime: null,
  timerInterval: null,
  lastResult: null
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function formatTime(totalSeconds) {
  const seconds = Math.max(0, Math.round(totalSeconds));
  const minutes = Math.floor(seconds / 60);
  const rest = seconds % 60;
  return `${minutes}:${String(rest).padStart(2, "0")}`;
}

function showScreen(name) {
  Object.entries(screens).forEach(([key, element]) => {
    element.classList.toggle("is-hidden", key !== name);
  });
  window.scrollTo(0, 0);
}

function pickQuestions(professionKey) {
  const profession = PROFESSION_BY_KEY[professionKey];
  const pool = QUESTION_POOLS[professionKey] || [];
  const selected = shuffle(pool).slice(0, profession.questionCount);
  return selected.map((question) => ({
    ...question,
    options: shuffle(question.options)
  }));
}

function toMillis(submittedAt) {
  if (!submittedAt) return Number.MAX_SAFE_INTEGER;
  if (typeof submittedAt === "number") return submittedAt;
  if (typeof submittedAt.toMillis === "function") return submittedAt.toMillis();
  if (typeof submittedAt.seconds === "number") return submittedAt.seconds * 1000;
  const parsed = Date.parse(submittedAt);
  return Number.isNaN(parsed) ? Number.MAX_SAFE_INTEGER : parsed;
}

function sortLeaderboard(rows) {
  return [...rows].sort(
    (a, b) =>
      b.score - a.score ||
      b.correctAnswers - a.correctAnswers ||
      a.timeTakenSeconds - b.timeTakenSeconds ||
      toMillis(a.submittedAt) - toMillis(b.submittedAt)
  );
}

// ---------------------------------------------------------------------------
// Start screen
// ---------------------------------------------------------------------------
function renderProfessions() {
  professionGroup.innerHTML = "";
  PROFESSIONS.forEach((profession) => {
    const label = document.createElement("label");
    label.className = "profession-option";

    const input = document.createElement("input");
    input.type = "radio";
    input.name = "profession";
    input.value = profession.key;

    const text = document.createElement("span");
    text.className = "profession-text";
    text.textContent = profession.label;

    const count = document.createElement("span");
    count.className = "profession-count";
    count.textContent = `${profession.questionCount} questions`;

    label.append(input, text, count);
    professionGroup.append(label);
  });
}

function hydrateProfile() {
  const profile = readJson(STORAGE_KEYS.profile, null);
  if (profile && typeof profile === "object") {
    if (profile.name) nameInput.value = profile.name;
    if (profile.email) emailInput.value = profile.email;
  }
}

startForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const selected = professionGroup.querySelector("input[name='profession']:checked");

  if (!name) {
    startError.textContent = "Enter your name to start.";
    nameInput.focus();
    return;
  }
  if (!isValidEmail(email)) {
    startError.textContent = "Enter a valid email to start.";
    emailInput.focus();
    return;
  }
  if (!selected) {
    startError.textContent = "Pick a profession to start.";
    return;
  }

  startError.textContent = "";
  state.name = name;
  state.email = email;
  state.profession = selected.value;
  localStorage.setItem(STORAGE_KEYS.profile, JSON.stringify({ name, email }));

  startQuiz();
});

// ---------------------------------------------------------------------------
// Quiz screen
// ---------------------------------------------------------------------------
function startQuiz() {
  state.questions = pickQuestions(state.profession);
  state.currentIndex = 0;
  state.answers = [];
  state.selectedOption = null;

  professionPill.textContent = PROFESSION_BY_KEY[state.profession].label;
  showScreen("quiz");
  renderQuestion();
  startTimer();
}

function startTimer() {
  state.startTime = Date.now();
  timerLabel.textContent = "0:00";
  stopTimer();
  state.timerInterval = window.setInterval(() => {
    timerLabel.textContent = formatTime((Date.now() - state.startTime) / 1000);
  }, 1000);
}

function stopTimer() {
  if (state.timerInterval) {
    window.clearInterval(state.timerInterval);
    state.timerInterval = null;
  }
}

function correctCount() {
  return state.answers.filter((answer) => answer.isCorrect).length;
}

function renderQuestion() {
  const total = state.questions.length;
  const question = state.questions[state.currentIndex];
  state.selectedOption = null;

  progressLabel.textContent = `Question ${state.currentIndex + 1} of ${total}`;
  progressBar.style.width = `${((state.currentIndex) / total) * 100}%`;
  correctLabel.textContent = `${correctCount()} correct`;
  questionPrompt.textContent = question.prompt;

  optionsList.innerHTML = "";
  question.options.forEach((option) => {
    const item = document.createElement("li");
    const button = document.createElement("button");
    button.type = "button";
    button.className = "option-button";
    button.textContent = option;
    button.addEventListener("click", () => selectOption(button, option));
    item.append(button);
    optionsList.append(item);
  });

  const isLast = state.currentIndex === total - 1;
  nextButton.textContent = isLast ? "Submit quiz" : "Next";
  nextButton.disabled = true;
}

function selectOption(button, option) {
  state.selectedOption = option;
  optionsList.querySelectorAll(".option-button").forEach((element) => {
    element.classList.toggle("is-selected", element === button);
  });
  nextButton.disabled = false;
}

nextButton.addEventListener("click", () => {
  if (state.selectedOption === null) return;

  const question = state.questions[state.currentIndex];
  const isCorrect = state.selectedOption === question.correctAnswer;
  state.answers.push({
    questionId: question.id,
    selectedAnswer: state.selectedOption,
    correctAnswer: question.correctAnswer,
    isCorrect,
    component: question.component
  });

  if (state.currentIndex < state.questions.length - 1) {
    state.currentIndex += 1;
    renderQuestion();
  } else {
    finishQuiz();
  }
});

// ---------------------------------------------------------------------------
// Finish + result
// ---------------------------------------------------------------------------
async function finishQuiz() {
  stopTimer();
  const timeTakenSeconds = Math.max(0, Math.round((Date.now() - state.startTime) / 1000));
  const totalQuestions = state.questions.length;
  const correctAnswers = correctCount();
  const score = computeScore(correctAnswers, totalQuestions, timeTakenSeconds);
  const profession = PROFESSION_BY_KEY[state.profession];

  const core = {
    name: state.name,
    email: state.email,
    profession: state.profession,
    professionLabel: profession.label,
    score,
    correctAnswers,
    totalQuestions,
    timeTakenSeconds,
    answers: state.answers.map((answer) => ({ ...answer }))
  };

  state.lastResult = { ...core };
  renderResult(core);
  showScreen("result");

  await saveSubmission(core);
}

async function saveSubmission(core) {
  resultNote.classList.add("is-hidden");
  resultNote.classList.remove("is-warning");

  const localRecord = { ...core, id: `local-${Date.now()}`, submittedAt: Date.now() };
  const firebase = await getFirebase();

  if (!firebase) {
    saveLocalSubmission(localRecord);
    localStorage.setItem(STORAGE_KEYS.lastSubmissionId, localRecord.id);
    showResultNote("Saved on this device. The booth leaderboard isn't connected right now.");
    return;
  }

  try {
    const ref = await firebase.addDoc(firebase.collection(firebase.db, SUBMISSIONS_COLLECTION), {
      ...core,
      submittedAt: firebase.serverTimestamp()
    });
    localStorage.setItem(STORAGE_KEYS.lastSubmissionId, ref.id);
    saveLocalSubmission({ ...localRecord, id: ref.id });
  } catch (error) {
    console.warn("Submission write failed, keeping result locally.", error);
    saveLocalSubmission(localRecord);
    localStorage.setItem(STORAGE_KEYS.lastSubmissionId, localRecord.id);
    showResultNote("We couldn't reach the leaderboard, so your score is saved on this device.");
  }
}

function showResultNote(message) {
  resultNote.textContent = message;
  resultNote.classList.remove("is-hidden");
  resultNote.classList.add("is-warning");
}

function renderResult(core) {
  resultScore.textContent = String(core.score);
  resultCorrect.textContent = `${core.correctAnswers} / ${core.totalQuestions}`;
  resultTime.textContent = formatTime(core.timeTakenSeconds);
  resultProfession.textContent = core.professionLabel;
  resultSummary.textContent = PROFESSION_BY_KEY[core.profession].summary;
}

viewLeaderboardButton.addEventListener("click", () => {
  backToResultButton.classList.remove("is-hidden");
  showScreen("leaderboard");
  loadLeaderboard();
});

tryAgainButton.addEventListener("click", () => {
  resetToStart();
});

// ---------------------------------------------------------------------------
// Leaderboard screen
// ---------------------------------------------------------------------------
async function loadLeaderboard() {
  leaderboardList.innerHTML = "";
  leaderboardNote.classList.add("is-hidden");
  leaderboardStatus.textContent = "Loading leaderboard…";
  leaderboardStatus.classList.remove("is-hidden");

  const firebase = await getFirebase();

  if (!firebase) {
    renderLeaderboard(sortLeaderboard(readJson(STORAGE_KEYS.submissions, [])), {
      local: true
    });
    return;
  }

  try {
    const leaderboardQuery = firebase.query(
      firebase.collection(firebase.db, SUBMISSIONS_COLLECTION),
      firebase.orderBy("score", "desc"),
      firebase.limit(50)
    );
    const snapshot = await firebase.getDocs(leaderboardQuery);
    const rows = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    renderLeaderboard(sortLeaderboard(rows), { local: false });
  } catch (error) {
    console.warn("Leaderboard read failed, showing local results.", error);
    const friendly =
      error && error.code === "failed-precondition"
        ? "The leaderboard needs a Firestore index. Showing local results on this device for now."
        : "We couldn't load the booth leaderboard. Showing local results on this device.";
    renderLeaderboard(sortLeaderboard(readJson(STORAGE_KEYS.submissions, [])), {
      local: true,
      message: friendly
    });
  }
}

function renderLeaderboard(rows, { local, message }) {
  const top = rows.slice(0, 20);
  const lastId = localStorage.getItem(STORAGE_KEYS.lastSubmissionId);

  leaderboardList.innerHTML = "";

  if (local) {
    leaderboardNote.textContent = message || "Showing local results on this device.";
    leaderboardNote.classList.remove("is-hidden");
  }

  if (top.length === 0) {
    leaderboardStatus.textContent = "No scores yet. Be the first on the board!";
    leaderboardStatus.classList.remove("is-hidden");
    return;
  }

  leaderboardStatus.classList.add("is-hidden");

  top.forEach((row, index) => {
    const item = document.createElement("li");
    item.className = "leaderboard-card";
    if (lastId && row.id === lastId) {
      item.classList.add("is-you");
    }

    const rank = document.createElement("span");
    rank.className = "lb-rank";
    rank.textContent = `#${index + 1}`;

    const main = document.createElement("div");
    main.className = "lb-main";

    const name = document.createElement("span");
    name.className = "lb-name";
    name.textContent = row.name || "Anonymous";

    const profession = document.createElement("span");
    profession.className = "lb-profession";
    profession.textContent = row.professionLabel || PROFESSION_BY_KEY[row.profession]?.label || "—";

    main.append(name, profession);

    const stats = document.createElement("div");
    stats.className = "lb-stats";

    const score = document.createElement("span");
    score.className = "lb-score";
    score.textContent = `${row.score} pts`;

    const detail = document.createElement("span");
    detail.className = "lb-detail";
    detail.textContent = `${row.correctAnswers}/${row.totalQuestions} · ${formatTime(row.timeTakenSeconds)}`;

    stats.append(score, detail);

    item.append(rank, main, stats);
    leaderboardList.append(item);
  });
}

backToResultButton.addEventListener("click", () => {
  if (state.lastResult) {
    showScreen("result");
  } else {
    resetToStart();
  }
});

playAgainButton.addEventListener("click", () => {
  resetToStart();
});

function resetToStart() {
  stopTimer();
  state.questions = [];
  state.currentIndex = 0;
  state.answers = [];
  state.selectedOption = null;
  backToResultButton.classList.add("is-hidden");
  showScreen("start");
}

// ---------------------------------------------------------------------------
// Init
// ---------------------------------------------------------------------------
renderProfessions();
hydrateProfile();
showScreen("start");
