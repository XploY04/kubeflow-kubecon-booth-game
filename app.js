// ---------------------------------------------------------------------------
// Firebase config
// ---------------------------------------------------------------------------
// Frontend Firebase web-app config — safe to ship in the browser (this is NOT
// the Admin SDK service-account key). Firestore access is gated by the rules in
// firestore.rules. If these values are placeholders, or the SDK fails to load,
// the app falls back to local-only storage on this device.
const firebaseConfig = {
  apiKey: "AIzaSyALCTT5KiPx-pbE7smBjY4jRedvHX6kdpI",
  authDomain: "kubeflow-kc.firebaseapp.com",
  projectId: "kubeflow-kc",
  storageBucket: "kubeflow-kc.firebasestorage.app",
  messagingSenderId: "540767702222",
  appId: "1:540767702222:web:f21831562824b6dbf9d49f"
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
      "Kubeflow is an open-source platform for running machine learning on Kubernetes. You write code in Kubeflow Notebooks, turn the steps into repeatable Kubeflow Pipelines, train with Kubeflow Trainer, tune settings with Katib, track models in the Model Registry, and serve them with KServe. The Kubeflow Dashboard ties it all together."
  },
  {
    key: "dataScientist",
    label: "Data Scientist / AI Practitioner",
    questionCount: 6,
    summary:
      "Your day moves from exploring data in Kubeflow Notebooks to training models with Kubeflow Trainer and searching for better settings with Katib. Kubeflow Pipelines makes the steps reproducible (with caching and parallelism), the Model Registry tracks versions and lineage, and KServe puts the winning model behind an API."
  },
  {
    key: "mlops",
    label: "ML Engineer / MLOps Engineer",
    questionCount: 7,
    summary:
      "You turn experiments into production. Kubeflow Pipelines automates repeatable workflows, Kubeflow Trainer scales training, Katib automates tuning, and the Model Registry promotes the right version. KServe serves models with scale-to-zero, concurrency autoscaling, canary rollouts, and request batching."
  },
  {
    key: "platform",
    label: "Platform Engineer / SRE",
    summary:
      "Kubeflow is Kubernetes-native, so it fits the platform you already run. Profiles give each team an isolated namespace, Dex handles SSO, and Istio handles mTLS and routing. Kueue and Volcano schedule heavy jobs fairly, Trainer plus JobSet survive node failures, and Prometheus, Grafana, and DCGM-exporter give you observability.",
    questionCount: 7
  },
  {
    key: "developer",
    label: "Software Developer Building AI Apps",
    questionCount: 6,
    summary:
      "You can call models without managing the ML stack yourself. KServe exposes a model as a REST, gRPC, or OpenAI-compatible API with serverless scaling, batching, transformers, and safe revision rollouts. The Kubeflow SDK lets you launch jobs from Python, the Model Registry is your version contract, and InferenceGraph chains services for RAG."
  }
];

const PROFESSION_BY_KEY = Object.fromEntries(PROFESSIONS.map((p) => [p.key, p]));

// ---------------------------------------------------------------------------
// Question pools (multiple choice, 4 options each)
// ---------------------------------------------------------------------------
const QUESTION_POOLS = {
  student: [
    {
      id: "student-runs-on",
      prompt: "Your laptop fan is screaming during training and a friend says \"use Kubeflow.\" What does Kubeflow run on?",
      options: [
        "Your laptop, but louder",
        "Kubernetes",
        "Docker Desktop only",
        "A magical cloud nobody talks about"
      ],
      correctAnswer: "Kubernetes",
      explanation: "The K isn't decorative. Kubeflow is an ML toolkit for Kubernetes.",
      component: "Kubernetes"
    },
    {
      id: "student-notebooks-ide",
      prompt: "Which Kubeflow component gives you JupyterLab or VS Code in the cluster with GPUs attached?",
      options: ["Katib", "KServe", "Kubeflow Notebooks", "Kubeflow Pipelines"],
      correctAnswer: "Kubeflow Notebooks",
      explanation: "Notebooks run as a StatefulSet with a persistent volume per user.",
      component: "Kubeflow Notebooks"
    },
    {
      id: "student-pipeline-dag",
      prompt: "A Kubeflow Pipeline is best described as:",
      options: [
        "A long YAML file you cry over",
        "A DAG where each step runs in its own container",
        "An actual pipe in Kubernetes",
        "An Excel sheet of steps"
      ],
      correctAnswer: "A DAG where each step runs in its own container",
      explanation: "Directed Acyclic Graph. Steps run in containers, parallel by default.",
      component: "Kubeflow Pipelines"
    },
    {
      id: "student-katib-combos",
      prompt: "You want to test 500 combos of learning rate, batch size, and dropout. The Kubeflow tool for that is:",
      options: ["Katib", "KServe", "Kubeflow Trainer", "Intuition and prayer"],
      correctAnswer: "Katib",
      explanation: "Katib does hyperparameter tuning and Neural Architecture Search.",
      component: "Katib"
    },
    {
      id: "student-modular",
      prompt: "Which statement about Kubeflow is TRUE?",
      options: [
        "It only runs on Google Cloud",
        "It's a single giant binary",
        "It's a collection of independent open-source subprojects you can use in any subset",
        "It replaces Python"
      ],
      correctAnswer: "It's a collection of independent open-source subprojects you can use in any subset",
      explanation: "Modular. Use just KFP, just KServe, or the whole stack.",
      component: "Kubeflow"
    },
    {
      id: "student-origin",
      prompt: "Kubeflow was originally open-sourced by which company, and is now governed under which foundation?",
      options: [
        "Meta, then the Linux Foundation",
        "Google, then the CNCF",
        "Microsoft, then Apache",
        "Netflix, then OpenAI"
      ],
      correctAnswer: "Google, then the CNCF",
      explanation: "Born at Google in 2017, joined the CNCF as an incubating project in 2023.",
      component: "Kubeflow"
    },
    {
      id: "student-multitenancy",
      prompt: "\"Multi-tenancy\" in Kubeflow means:",
      options: [
        "Many users live in the cluster physically",
        "Each team gets an isolated namespace via a Profile, so they don't see each other's work",
        "Renting Kubeflow from AWS",
        "Sharing one login"
      ],
      correctAnswer: "Each team gets an isolated namespace via a Profile, so they don't see each other's work",
      explanation: "A Profile wraps a namespace plus RBAC. Isolation without separate clusters.",
      component: "Profiles"
    },
    {
      id: "student-kserve-stage",
      prompt: "KServe (formerly KFServing) is mainly for which lifecycle stage?",
      options: ["Data preparation", "Training", "Serving and inference", "Writing documentation"],
      correctAnswer: "Serving and inference",
      explanation: "KServe deploys trained models as auto-scaling REST/gRPC endpoints.",
      component: "KServe"
    },
    {
      id: "student-artifact-store",
      prompt: "Your pipeline produces a 2 GB model file. Where should it logically be stored?",
      options: [
        "Inside a Kubernetes Secret",
        "An object store (MinIO, S3, or GCS)",
        "The Pod's /tmp",
        "A ConfigMap"
      ],
      correctAnswer: "An object store (MinIO, S3, or GCS)",
      explanation: "Artifacts go to object storage. ConfigMaps cap at 1 MiB, so don't even try.",
      component: "Object storage"
    },
    {
      id: "student-not-subproject",
      prompt: "Which of these is NOT a Kubeflow subproject?",
      options: ["Katib", "Kubeflow Trainer", "Kubeflow Pipelines", "Kubernetes itself"],
      correctAnswer: "Kubernetes itself",
      explanation: "Kubernetes is the foundation Kubeflow runs on, not part of Kubeflow.",
      component: "Kubernetes"
    }
  ],

  dataScientist: [
    {
      id: "ds-dsl-component",
      prompt: "You slapped @dsl.component on a Python function. You just made a:",
      options: [
        "Kubernetes Pod",
        "Reusable, containerized KFP pipeline step",
        "Helm chart",
        "Decorator that does nothing"
      ],
      correctAnswer: "Reusable, containerized KFP pipeline step",
      explanation: "That decorator turns your function into a portable pipeline step.",
      component: "Kubeflow Pipelines"
    },
    {
      id: "ds-trainer-finetune",
      prompt: "You're fine-tuning Llama-3 on proprietary data and one GPU won't fit it. The Kubeflow move?",
      options: [
        "Buy a bigger GPU",
        "Submit a TrainJob to Kubeflow Trainer with FSDP or DeepSpeed",
        "Run it in a Notebook overnight",
        "Email the model and hope"
      ],
      correctAnswer: "Submit a TrainJob to Kubeflow Trainer with FSDP or DeepSpeed",
      explanation: "Trainer v2's TrainJob orchestrates multi-node, multi-GPU training.",
      component: "Kubeflow Trainer"
    },
    {
      id: "ds-kfp-caching",
      prompt: "You change step 4 of a 5-step pipeline and re-run. Step 1 (40 min) is skipped. Why?",
      options: [
        "Kubeflow forgot",
        "KFP step caching: same inputs reuse cached output",
        "It silently failed",
        "Magic"
      ],
      correctAnswer: "KFP step caching: same inputs reuse cached output",
      explanation: "Caching can cut re-run cost by around 80%.",
      component: "Kubeflow Pipelines"
    },
    {
      id: "ds-katib-bayesian",
      prompt: "Bayesian Optimization beats Grid Search in Katib because:",
      options: [
        "It sounds smarter",
        "It builds a probabilistic model and picks promising next configs, so fewer trials",
        "Grid Search is broken",
        "It's the only option"
      ],
      correctAnswer: "It builds a probabilistic model and picks promising next configs, so fewer trials",
      explanation: "Grid tries blindly. Bayesian learns. That matters when each trial costs GPU-hours.",
      component: "Katib"
    },
    {
      id: "ds-model-registry",
      prompt: "Where do you register a trained model with metadata, lineage, and version history?",
      options: [
        "A Slack DM",
        "A USB stick",
        "The Kubeflow Model Registry",
        "model_v7_REAL_FINAL_actually.pkl"
      ],
      correctAnswer: "The Kubeflow Model Registry",
      explanation: "The Model Registry bridges training and KServe. (The last option is sadly common.)",
      component: "Kubeflow Hub"
    },
    {
      id: "ds-kfp-parallel",
      prompt: "Two KFP steps share no inputs or outputs. At runtime they:",
      options: [
        "Run sequentially in random order",
        "Crash the pipeline",
        "Run in parallel automatically",
        "Need a manual sleep between them"
      ],
      correctAnswer: "Run in parallel automatically",
      explanation: "KFP infers the DAG from data dependencies. Independent steps run in parallel.",
      component: "Kubeflow Pipelines"
    },
    {
      id: "ds-kfp-artifacts",
      prompt: "You want to pass a large NumPy array between two pipeline steps. The right pattern?",
      options: [
        "Stuff it into a string parameter",
        "Use an Output[Dataset] artifact and let KFP handle upload/download via object store",
        "Print it to logs and re-read it",
        "Save to /tmp and hope the next Pod sees it"
      ],
      correctAnswer: "Use an Output[Dataset] artifact and let KFP handle upload/download via object store",
      explanation: "Small values are parameters; large data are artifacts (datasets, models).",
      component: "Kubeflow Pipelines"
    },
    {
      id: "ds-kserve-endpoint",
      prompt: "Your notebook needs to call a model server inside the cluster. The cleanest endpoint to hit?",
      options: [
        "The Pod's IP directly",
        "The KServe InferenceService URL exposed via Istio",
        "localhost",
        "The KServe controller's IP"
      ],
      correctAnswer: "The KServe InferenceService URL exposed via Istio",
      explanation: "KServe gives you a stable, versioned URL. Istio handles routing and canary.",
      component: "KServe"
    },
    {
      id: "ds-katib-early-stop",
      prompt: "Katib supports early stopping. Why does it matter for your wallet?",
      options: [
        "It doesn't, it's just a UI feature",
        "Bad trials are killed early, so no wasted GPU-hours on doomed configs",
        "It pauses the good trials",
        "It's only for NAS"
      ],
      correctAnswer: "Bad trials are killed early, so no wasted GPU-hours on doomed configs",
      explanation: "Hyperband and Median Stop terminate underperformers fast. Real savings.",
      component: "Katib"
    },
    {
      id: "ds-reproducibility",
      prompt: "You want reproducibility: same data, same code, same model. The minimum you should version is:",
      options: [
        "Just the code",
        "Code, data, container image, hyperparameters, and the random seed",
        "Just the hyperparameters",
        "Whatever feels right"
      ],
      correctAnswer: "Code, data, container image, hyperparameters, and the random seed",
      explanation: "Pin all the ingredients, otherwise \"reproducible\" is fiction. Model Registry, Git, DVC, and container tags handle this together.",
      component: "Kubeflow Hub"
    }
  ],

  mlops: [
    {
      id: "mlops-kserve-canary",
      prompt: "New fraud model: 10% canary traffic, 90% to the old one, instant rollback if metrics tank. Which KServe feature?",
      options: [
        "Canary rollout via InferenceService traffic splitting",
        "Manually editing DNS",
        "Running two clusters",
        "kubectl delete and pray"
      ],
      correctAnswer: "Canary rollout via InferenceService traffic splitting",
      explanation: "Built on Knative. Percentage split plus one-click rollback.",
      component: "KServe"
    },
    {
      id: "mlops-scale-to-zero",
      prompt: "At 3 AM your inference endpoint gets zero traffic. A properly configured KServe runs how many pods?",
      options: [
        "10, just in case",
        "0, via scale-to-zero on Knative",
        "1, always",
        "It depends on the weather"
      ],
      correctAnswer: "0, via scale-to-zero on Knative",
      explanation: "There's a cold-start trade-off, but huge cost savings overnight.",
      component: "KServe"
    },
    {
      id: "mlops-oomkilled",
      prompt: "Your pipeline keeps dying with OOMKilled. First fix?",
      options: [
        "Buy more nodes",
        "Set proper requests and limits on the component",
        "Switch ML libraries",
        "Restart the cluster"
      ],
      correctAnswer: "Set proper requests and limits on the component",
      explanation: "OOMKilled means it exceeded its memory limit. Tune limits before adding hardware.",
      component: "Kubeflow Pipelines"
    },
    {
      id: "mlops-trainer-v2",
      prompt: "Trainer v2's TrainJob and TrainingRuntime replaced which legacy mess?",
      options: [
        "Spark and Flink jobs",
        "TFJob, PyTorchJob, MPIJob, MXJob, and XGBoostJob",
        "Kubernetes Deployments",
        "Helm charts"
      ],
      correctAnswer: "TFJob, PyTorchJob, MPIJob, MXJob, and XGBoostJob",
      explanation: "One CRD instead of one per framework.",
      component: "Kubeflow Trainer"
    },
    {
      id: "mlops-works-on-my-machine",
      prompt: "\"Works on my notebook but not in production.\" The Kubeflow-native cure?",
      options: [
        "Tell them to git gud",
        "Containerize each pipeline step with pinned deps, so the same image runs everywhere",
        "Use a different scheduler",
        "Switch to MLflow"
      ],
      correctAnswer: "Containerize each pipeline step with pinned deps, so the same image runs everywhere",
      explanation: "That's the whole point of containers. Build once, run anywhere.",
      component: "Kubeflow Pipelines"
    },
    {
      id: "mlops-auto-retrain",
      prompt: "Production data drifts and you want auto-retraining. The cleanest design?",
      options: [
        "A cron job and hope",
        "Drift detector triggers a KFP pipeline that trains, registers, then canaries on KServe",
        "A calendar reminder",
        "Page the on-call data scientist"
      ],
      correctAnswer: "Drift detector triggers a KFP pipeline that trains, registers, then canaries on KServe",
      explanation: "Pipelines are the orchestrator. It's a closed feedback loop.",
      component: "Kubeflow Pipelines"
    },
    {
      id: "mlops-ab-test",
      prompt: "Two model versions both need production traffic for an A/B test with strict statistical tracking. Which KServe primitive?",
      options: [
        "InferenceGraph for traffic routing plus canary weights with metrics",
        "Two separate Deployments managed by hand",
        "A Helm chart loop",
        "Both models in one Pod"
      ],
      correctAnswer: "InferenceGraph for traffic routing plus canary weights with metrics",
      explanation: "KServe supports multi-revision routing with traffic percentages, and metrics flow into Prometheus.",
      component: "KServe"
    },
    {
      id: "mlops-kpa-concurrency",
      prompt: "Inference latency spikes during a sale. You want autoscaling on request concurrency, not CPU. The KServe/Knative answer?",
      options: [
        "HPA on CPU (default Kubernetes)",
        "Knative KPA scaling on concurrent requests",
        "Manually scaling up replicas",
        "Disabling autoscaling"
      ],
      correctAnswer: "Knative KPA scaling on concurrent requests",
      explanation: "KServe sits on Knative's KPA. Concurrency-based scaling fits inference far better than CPU.",
      component: "KServe"
    },
    {
      id: "mlops-s3-creds",
      prompt: "A pipeline step needs to talk to S3 with credentials. Best practice?",
      options: [
        "Hardcode the keys in the component",
        "Mount a Kubernetes Secret, or use IRSA / Workload Identity",
        "Email the key to yourself",
        "Bake it into the container image"
      ],
      correctAnswer: "Mount a Kubernetes Secret, or use IRSA / Workload Identity",
      explanation: "Mount secrets as env vars or files; better yet, use cloud-native workload identity (IRSA on EKS, Workload Identity on GKE).",
      component: "Kubeflow Pipelines"
    },
    {
      id: "mlops-batching",
      prompt: "Your KServe model is fine but inference is slow. You profile it: the bottleneck is single-request Python overhead. The lever?",
      options: [
        "Increase the Pod count to 100",
        "Enable request batching in the predictor (e.g. Triton dynamic batching)",
        "Add more memory",
        "Rewrite it in Rust"
      ],
      correctAnswer: "Enable request batching in the predictor (e.g. Triton dynamic batching)",
      explanation: "Batching amortizes per-request overhead massively. Triton, TorchServe, and TF-Serving all do this.",
      component: "KServe"
    }
  ],

  platform: [
    {
      id: "platform-profiles",
      prompt: "Three teams share one Kubeflow cluster. Team A must NOT see Team B's notebooks. Which primitive?",
      options: [
        "Separate clusters per team",
        "Profiles: namespace plus owner plus RBAC",
        "Trust and vibes",
        "Hiding everything in Secrets"
      ],
      correctAnswer: "Profiles: namespace plus owner plus RBAC",
      explanation: "A Profile is a namespace plus ownership plus isolation. Cheap multi-tenancy.",
      component: "Profiles"
    },
    {
      id: "platform-istio-mtls",
      prompt: "Every internal Kubeflow service uses mTLS via sidecars. The component is:",
      options: ["Istio", "Calico", "CoreDNS", "Dex"],
      correctAnswer: "Istio",
      explanation: "The Istio service mesh handles mTLS, traffic policy, and routing.",
      component: "Istio"
    },
    {
      id: "platform-kueue-quota",
      prompt: "Team A grabs 8 H100s for a forgotten notebook. The fairness solution?",
      options: [
        "Slack-shame Team A",
        "Kueue plus ResourceQuotas: queued fair-share with per-namespace caps",
        "Buy more GPUs",
        "Disable Notebooks"
      ],
      correctAnswer: "Kueue plus ResourceQuotas: queued fair-share with per-namespace caps",
      explanation: "Kueue does gang scheduling and queueing. ResourceQuotas cap each tenant.",
      component: "Kueue"
    },
    {
      id: "platform-artifact-storage",
      prompt: "What's the default storage for pipeline artifacts?",
      options: [
        "/tmp on the node",
        "An S3-compatible object store (MinIO by default; swap to S3/GCS in prod)",
        "A giant ConfigMap",
        "PostgreSQL BLOBs"
      ],
      correctAnswer: "An S3-compatible object store (MinIO by default; swap to S3/GCS in prod)",
      explanation: "MinIO ships out of the box. Swap to managed object storage in production.",
      component: "Object storage"
    },
    {
      id: "platform-audit",
      prompt: "A regulator asks for the exact data, code, and hyperparams behind the prod model. The ideal answer is:",
      options: [
        "\"Give me 3 weeks\"",
        "\"One query: the Model Registry links data version, pipeline run, commit, and hyperparams\"",
        "\"We'll ask the data scientist who left\"",
        "\"Define 'production'\""
      ],
      correctAnswer: "\"One query: the Model Registry links data version, pipeline run, commit, and hyperparams\"",
      explanation: "Auditability is the whole point of the Model Registry plus KFP run history.",
      component: "Kubeflow Hub"
    },
    {
      id: "platform-dex-sso",
      prompt: "Users log in to the Central Dashboard via Google, GitHub, or LDAP SSO. Which component?",
      options: ["Istio", "Argo", "Dex (an OIDC identity broker)", "Knative"],
      correctAnswer: "Dex (an OIDC identity broker)",
      explanation: "Dex federates external identity providers and gives Kubeflow unified login.",
      component: "Dex"
    },
    {
      id: "platform-volcano-gang",
      prompt: "Kueue and Volcano both come up in Kubeflow infra discussions. The thing Volcano specializes in:",
      options: [
        "Gang scheduling (all-or-nothing pod groups for distributed training)",
        "Issuing TLS certs",
        "Storing artifacts",
        "Running notebooks"
      ],
      correctAnswer: "Gang scheduling (all-or-nothing pod groups for distributed training)",
      explanation: "Distributed training needs all N pods up together or none. Gang scheduling is Volcano's specialty.",
      component: "Volcano"
    },
    {
      id: "platform-node-failure",
      prompt: "A node with 8 GPUs dies mid-training. Trainer plus Kubernetes do what by default?",
      options: [
        "The pipeline silently fails forever",
        "JobSet/Trainer reschedules the pods on healthy nodes and the checkpoint resumes the run",
        "Send a thoughts-and-prayers email",
        "Crash the entire cluster"
      ],
      correctAnswer: "JobSet/Trainer reschedules the pods on healthy nodes and the checkpoint resumes the run",
      explanation: "Trainer leverages JobSet for resilience; resume-from-checkpoint is the practical safety net.",
      component: "Kubeflow Trainer"
    },
    {
      id: "platform-upgrade",
      prompt: "You're upgrading Kubeflow. The safest sequencing?",
      options: [
        "Upgrade everything at once with one script",
        "Read release notes, upgrade Kubernetes/Istio first, then upgrade components one-by-one in non-prod, smoke test, then prod",
        "Just kubectl apply the new manifests",
        "Delete the namespace and reinstall"
      ],
      correctAnswer: "Read release notes, upgrade Kubernetes/Istio first, then upgrade components one-by-one in non-prod, smoke test, then prod",
      explanation: "Kubeflow is many independent subprojects with their own versions. Upgrade gradually.",
      component: "Kubeflow"
    },
    {
      id: "platform-observability",
      prompt: "You want cluster-wide observability for ML workloads: GPU utilization, training step duration, inference p95 latency. The standard stack?",
      options: [
        "Prometheus (metrics) plus Grafana (dashboards) plus DCGM-exporter (GPU) plus KServe/Trainer metrics endpoints",
        "kubectl top only",
        "printf to stdout",
        "Manual screenshots"
      ],
      correctAnswer: "Prometheus (metrics) plus Grafana (dashboards) plus DCGM-exporter (GPU) plus KServe/Trainer metrics endpoints",
      explanation: "Prometheus scrapes everything; DCGM-exporter is the NVIDIA GPU metric source.",
      component: "Prometheus"
    }
  ],

  developer: [
    {
      id: "dev-sdk",
      prompt: "You don't know Kubernetes but want to launch a training job from Python. The right tool?",
      options: [
        "Write raw YAML",
        "Use the Kubeflow SDK: a Pythonic API across Trainer, Katib, and KServe",
        "Email the ops team",
        "kubectl apply blindly"
      ],
      correctAnswer: "Use the Kubeflow SDK: a Pythonic API across Trainer, Katib, and KServe",
      explanation: "The SDK is built so app developers never have to touch Kubernetes.",
      component: "Kubeflow SDK"
    },
    {
      id: "dev-kserve-protocols",
      prompt: "Your web app needs to call a model. KServe gives you a stable URL. What protocols does it expose?",
      options: [
        "Only REST",
        "REST (HTTP/JSON) and gRPC, plus OpenAI-compatible for LLMs via the vLLM runtime",
        "FTP",
        "WebSocket only"
      ],
      correctAnswer: "REST (HTTP/JSON) and gRPC, plus OpenAI-compatible for LLMs via the vLLM runtime",
      explanation: "Pick REST for simplicity, gRPC for low latency, or the OpenAI-compatible API for LLM apps.",
      component: "KServe"
    },
    {
      id: "dev-serverless",
      prompt: "Your chatbot hits the LLM endpoint 1000x/sec at peak and 0x/sec overnight, and you want to pay only for what you use. KServe gives you:",
      options: [
        "A fixed pod count",
        "Knative-based serverless: scale-to-zero when idle, autoscale on concurrency",
        "Manual scaling via cron",
        "A bigger bill"
      ],
      correctAnswer: "Knative-based serverless: scale-to-zero when idle, autoscale on concurrency",
      explanation: "Cold-start is the trade-off; for bursty workloads it's a massive win.",
      component: "KServe"
    },
    {
      id: "dev-inference-graph",
      prompt: "You're building a RAG app. Your embedding model and your LLM are two separate InferenceServices. How do you chain them inside the cluster cleanly?",
      options: [
        "Have your app call both from outside the cluster",
        "Use an InferenceGraph: server-side chaining of multiple InferenceServices with one entrypoint",
        "Stuff both into one container",
        "Use Helm"
      ],
      correctAnswer: "Use an InferenceGraph: server-side chaining of multiple InferenceServices with one entrypoint",
      explanation: "InferenceGraph composes services as a DAG inside the cluster: fewer network hops, cleaner contract.",
      component: "KServe"
    },
    {
      id: "dev-dynamic-batching",
      prompt: "Your app sends one inference request at a time and latency feels high. The fix that needs no change to the model?",
      options: [
        "Buy more GPUs",
        "Enable server-side dynamic batching in the runtime (Triton, TorchServe, or vLLM)",
        "Rewrite the app in Rust",
        "Cache nothing"
      ],
      correctAnswer: "Enable server-side dynamic batching in the runtime (Triton, TorchServe, or vLLM)",
      explanation: "The runtime collects concurrent requests and batches them per GPU. Big throughput gain, nearly invisible to clients.",
      component: "KServe"
    },
    {
      id: "dev-safe-rollout",
      prompt: "You ship a new model to KServe but don't want users to see it until you've validated it. The pattern?",
      options: [
        "Pray",
        "Deploy it as a new revision with 0% traffic, run shadow traffic and smoke tests, then shift percentage gradually",
        "Replace the old model entirely at 9 AM",
        "Use a different cluster"
      ],
      correctAnswer: "Deploy it as a new revision with 0% traffic, run shadow traffic and smoke tests, then shift percentage gradually",
      explanation: "Revision-based deploys plus traffic splitting make rollouts safe. That's the whole purpose of KServe's design.",
      component: "KServe"
    },
    {
      id: "dev-llm-runtime",
      prompt: "Your LLM is 70B params and you need fast inference. The serving runtime KServe most commonly pairs with for LLMs?",
      options: [
        "TF-Serving",
        "vLLM (continuous batching, PagedAttention) or Triton with TensorRT-LLM",
        "flask plus transformers",
        "Plain python model.py"
      ],
      correctAnswer: "vLLM (continuous batching, PagedAttention) or Triton with TensorRT-LLM",
      explanation: "vLLM and Triton-LLM are purpose-built for LLM throughput. Production reality.",
      component: "KServe"
    },
    {
      id: "dev-model-version",
      prompt: "Your app needs to know if the model behind the endpoint changed (e.g. a new fine-tune). The cleanest cluster-side source of truth?",
      options: [
        "Trust that the URL didn't change",
        "Query the Model Registry for the deployed model version, checksum, and lineage",
        "Diff the responses",
        "Ask the data scientist"
      ],
      correctAnswer: "Query the Model Registry for the deployed model version, checksum, and lineage",
      explanation: "The Model Registry is the contract between training and serving. Pin a version in your client.",
      component: "Kubeflow Hub"
    },
    {
      id: "dev-transformer",
      prompt: "Your app expects strict JSON from an LLM, but the model sometimes returns prose. Where does this concern belong?",
      options: [
        "Inside the model weights (retrain forever)",
        "A KServe Transformer (pre/post-processing) or guided decoding in the runtime: server-side, not in every client",
        "Each frontend client retries 10 times",
        "Disable JSON"
      ],
      correctAnswer: "A KServe Transformer (pre/post-processing) or guided decoding in the runtime: server-side, not in every client",
      explanation: "KServe lets you attach a transformer container before or after the predictor for exactly this. Enforce the schema once, not in N clients.",
      component: "KServe"
    },
    {
      id: "dev-auth",
      prompt: "You're building locally and need to talk to a KServe endpoint behind Istio plus Dex auth. The easiest auth flow for a backend service?",
      options: [
        "Hardcode your password",
        "Use a Kubernetes ServiceAccount token (or OAuth2 client credentials) that Istio and Dex validate",
        "Disable auth entirely",
        "Tunnel via SSH forever"
      ],
      correctAnswer: "Use a Kubernetes ServiceAccount token (or OAuth2 client credentials) that Istio and Dex validate",
      explanation: "ServiceAccount tokens and OAuth2 client credentials are the production-safe pattern. Never hardcode.",
      component: "Dex"
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
  progressBar.style.width = `${(state.currentIndex / total) * 100}%`;
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
