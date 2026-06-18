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
const LEADS_COLLECTION = "leads";

// Feedback Google Form. Paste the form's share/embed URL here to show the
// "Share your feedback" button on the result screen. Leave empty to hide it.
const FEEDBACK_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSfy45fMUuWIbpgaeh4TTH6SAvgPWqZnfJKjQ5U7TzHEKvC6fw/viewform";

// ---------------------------------------------------------------------------
// Professions
// ---------------------------------------------------------------------------
const PROFESSIONS = [
  {
    key: "student",
    label: "Student / Learner",
    questionCount: 3,
    summary:
      "Kubeflow is an open-source platform for running machine learning on Kubernetes. You write code in Kubeflow Notebooks, turn the steps into repeatable Kubeflow Pipelines, train with Kubeflow Trainer, tune settings with Katib, track models in the Model Registry, and serve them with KServe. The Kubeflow Dashboard ties it all together."
  },
  {
    key: "dataScientist",
    label: "Data Scientist / AI Practitioner",
    questionCount: 3,
    summary:
      "Your day moves from exploring data in Kubeflow Notebooks to training models with Kubeflow Trainer and searching for better settings with Katib. Kubeflow Pipelines makes the steps reproducible (with caching and parallelism), the Model Registry tracks versions and lineage, and KServe puts the winning model behind an API."
  },
  {
    key: "mlops",
    label: "ML Engineer / MLOps Engineer",
    questionCount: 3,
    summary:
      "You turn experiments into production. Kubeflow Pipelines automates repeatable workflows, Kubeflow Trainer scales training, Katib automates tuning, and the Model Registry promotes the right version. KServe serves models with scale-to-zero, concurrency autoscaling, canary rollouts, and request batching."
  },
  {
    key: "platform",
    label: "Platform Engineer / SRE",
    summary:
      "Kubeflow is Kubernetes-native, so it fits the platform you already run. Profiles give each team an isolated namespace, Dex handles SSO, and Istio handles mTLS and routing. Kueue and Volcano schedule heavy jobs fairly, Trainer plus JobSet survive node failures, and Prometheus, Grafana, and DCGM-exporter give you observability.",
    questionCount: 3
  },
  {
    key: "developer",
    label: "Software Developer Building AI Apps",
    questionCount: 3,
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
      prompt: "Your friend says \"just use Kubeflow.\" You ask \"on top of what?\" The correct answer:",
      options: [
        "Your laptop, but louder",
        "Kubernetes",
        "Docker Compose",
        "A magical cloud nobody explains"
      ],
      correctAnswer: "Kubernetes",
      explanation: "Kubeflow is the ML toolkit for Kubernetes. The K is doing real work.",
      component: "Kubernetes"
    },
    {
      id: "student-pipeline-dag",
      prompt: "A Kubeflow Pipeline organises steps as a:",
      options: [
        "A loop that never ends",
        "A spreadsheet of tasks",
        "A DAG (Directed Acyclic Graph), each step in its own container",
        "A sequential shell script"
      ],
      correctAnswer: "A DAG (Directed Acyclic Graph), each step in its own container",
      explanation: "No cycles, no shared state. Each step is a container; data flows between them.",
      component: "Kubeflow Pipelines"
    },
    {
      id: "student-katib-combos",
      prompt: "You want to test 300 combinations of learning rate, batch size, and dropout, automatically. Which component?",
      options: ["Katib", "KServe", "Kubeflow Notebooks", "Spark Operator"],
      correctAnswer: "Katib",
      explanation: "Katib is Kubeflow's AutoML engine: hyperparameter tuning plus Neural Architecture Search.",
      component: "Katib"
    },
    {
      id: "student-notebooks-ide",
      prompt: "Which component gives you JupyterLab, VS Code, or RStudio running inside the cluster with a GPU attached?",
      options: ["Katib", "Kubeflow Pipelines", "Kubeflow Notebooks", "KServe"],
      correctAnswer: "Kubeflow Notebooks",
      explanation: "Notebooks run as StatefulSets with persistent volumes. Your data stays in the cluster.",
      component: "Kubeflow Notebooks"
    },
    {
      id: "student-cncf",
      prompt: "Kubeflow was originally open-sourced by Google. Today it lives under:",
      options: [
        "The Apache Foundation",
        "The Linux Foundation",
        "The CNCF (Cloud Native Computing Foundation)",
        "OpenAI"
      ],
      correctAnswer: "The CNCF (Cloud Native Computing Foundation)",
      explanation: "A CNCF incubating project since 2023. Same home as Kubernetes, Prometheus, and Argo.",
      component: "Kubeflow"
    },
    {
      id: "student-run",
      prompt: "You hit \"Run\" on a pipeline. It executes once and finishes. That execution is called a:",
      options: ["Build", "Run", "Deployment", "Sprint"],
      correctAnswer: "Run",
      explanation: "A Run is one execution instance of a pipeline, with its own logs, outputs, and status.",
      component: "Kubeflow Pipelines"
    },
    {
      id: "student-trainer",
      prompt: "Which Kubeflow component handles large-scale distributed training across many nodes and GPUs?",
      options: ["Kubeflow Notebooks", "Katib", "Kubeflow Trainer", "Spark Operator"],
      correctAnswer: "Kubeflow Trainer",
      explanation: "Trainer orchestrates multi-node, multi-GPU jobs. Single-machine training is not its job.",
      component: "Kubeflow Trainer"
    },
    {
      id: "student-model-registry",
      prompt: "After training, you want version history, metadata, and data lineage for every model your team ships. Where does this belong?",
      options: [
        "A shared Google Drive folder",
        "model_final_v3.pkl on someone's laptop",
        "The Kubeflow Model Registry",
        "The Kubernetes etcd"
      ],
      correctAnswer: "The Kubeflow Model Registry",
      explanation: "Model Registry tracks artifacts, hyperparameters, and dataset lineage, and bridges training to serving.",
      component: "Kubeflow Hub"
    },
    {
      id: "student-dashboard",
      prompt: "The Kubeflow Central Dashboard is best described as:",
      options: [
        "A place to write YAML",
        "A unified web UI that exposes all Kubeflow component UIs from one place",
        "The Kubernetes API dashboard",
        "A billing portal"
      ],
      correctAnswer: "A unified web UI that exposes all Kubeflow component UIs from one place",
      explanation: "One URL, every component: Notebooks, Pipelines, Katib, and Models all surfaced there.",
      component: "Kubeflow Dashboard"
    },
    {
      id: "student-not-subproject",
      prompt: "Which of these is NOT a Kubeflow subproject?",
      options: ["Katib", "Kubeflow Trainer", "Kubernetes itself", "Kubeflow Pipelines"],
      correctAnswer: "Kubernetes itself",
      explanation: "Kubernetes is the foundation Kubeflow runs on. It's infrastructure, not a Kubeflow subproject.",
      component: "Kubernetes"
    }
  ],

  dataScientist: [
    {
      id: "ds-dsl-component",
      prompt: "You write a Python function and add @dsl.component. What did you just create?",
      options: [
        "A Kubernetes Pod",
        "A reusable, containerized KFP pipeline step",
        "A Helm chart",
        "A decorator that does nothing useful"
      ],
      correctAnswer: "A reusable, containerized KFP pipeline step",
      explanation: "That decorator is the boundary between your Python code and the KFP runtime.",
      component: "Kubeflow Pipelines"
    },
    {
      id: "ds-kfp-parallel",
      prompt: "Two pipeline steps have no shared inputs or outputs between them. At runtime they:",
      options: [
        "Run sequentially, alphabetically",
        "Crash, because KFP requires explicit ordering",
        "Run in parallel automatically, no dependency means no waiting",
        "Skip the second one"
      ],
      correctAnswer: "Run in parallel automatically, no dependency means no waiting",
      explanation: "KFP infers the DAG from data flow. Independent steps run concurrently.",
      component: "Kubeflow Pipelines"
    },
    {
      id: "ds-kfp-caching",
      prompt: "Your pipeline has 5 steps. Step 1 takes 40 minutes. You change only step 4 and re-run. Step 1:",
      options: [
        "Re-runs because Kubeflow is thorough",
        "Is skipped, KFP caches the output since inputs haven't changed",
        "Silently fails",
        "Runs in half the time for some reason"
      ],
      correctAnswer: "Is skipped, KFP caches the output since inputs haven't changed",
      explanation: "Step caching is a real cost-saver. Same inputs reuse the result and skip the compute.",
      component: "Kubeflow Pipelines"
    },
    {
      id: "ds-katib-bayesian",
      prompt: "In Katib, Bayesian Optimization beats Grid Search because:",
      options: [
        "It sounds more impressive in standups",
        "It builds a probabilistic model of the search space and picks promising configs, so far fewer trials are needed",
        "Grid Search is deprecated",
        "It's the only algorithm Katib ships"
      ],
      correctAnswer: "It builds a probabilistic model of the search space and picks promising configs, so far fewer trials are needed",
      explanation: "Grid tries everything blindly. Bayesian learns. Critical when each trial burns GPU-hours.",
      component: "Katib"
    },
    {
      id: "ds-trainer-finetune",
      prompt: "You're fine-tuning Llama-3 (70B) on proprietary data. One GPU won't fit it. Your move in Kubeflow?",
      options: [
        "Buy a bigger GPU and wait",
        "Submit a TrainJob via Kubeflow Trainer with FSDP or DeepSpeed across multiple nodes",
        "Run it in a Notebook overnight with fingers crossed",
        "Email the weights and hope"
      ],
      correctAnswer: "Submit a TrainJob via Kubeflow Trainer with FSDP or DeepSpeed across multiple nodes",
      explanation: "Trainer v2's TrainJob CRD manages multi-node, multi-GPU distributed training.",
      component: "Kubeflow Trainer"
    },
    {
      id: "ds-model-lineage",
      prompt: "You want the exact data version, code commit, and hyperparameters that produced the current production model. Where do you look?",
      options: [
        "The data scientist's Slack messages",
        "The model file's filename",
        "The Kubeflow Model Registry, where lineage links dataset, pipeline run, and hyperparameters",
        "Git blame"
      ],
      correctAnswer: "The Kubeflow Model Registry, where lineage links dataset, pipeline run, and hyperparameters",
      explanation: "Model Registry is the single source of truth for model provenance.",
      component: "Kubeflow Hub"
    },
    {
      id: "ds-kfp-artifacts",
      prompt: "You need to pass a 2 GB processed dataset from step 1 to step 2 in a pipeline. The correct KFP approach:",
      options: [
        "Stuff it into a string parameter",
        "Declare it as an Output[Dataset] artifact, so KFP uploads to object store and step 2 downloads it",
        "Print it to stdout and parse the logs",
        "Save to /tmp and hope the next Pod sees it"
      ],
      correctAnswer: "Declare it as an Output[Dataset] artifact, so KFP uploads to object store and step 2 downloads it",
      explanation: "Small values are parameters. Large data are artifacts (Dataset, Model, Metrics).",
      component: "Kubeflow Pipelines"
    },
    {
      id: "ds-katib-early-stop",
      prompt: "Katib's early stopping kills a trial after 10 steps when the metric looks bad. Why does your finance team love this?",
      options: [
        "They don't, trials should always run to completion",
        "Bad configs are terminated early, so no wasted GPU-hours on clearly doomed experiments",
        "It runs trials faster by skipping steps randomly",
        "It only works with tree-based models"
      ],
      correctAnswer: "Bad configs are terminated early, so no wasted GPU-hours on clearly doomed experiments",
      explanation: "Median Stop and Hyperband cut costs substantially. Real savings at scale.",
      component: "Katib"
    },
    {
      id: "ds-notebook-gpu",
      prompt: "Your Kubeflow Notebook server requests 2 GPUs and 32 GB RAM. When you close the browser tab, the GPU:",
      options: [
        "Is released immediately",
        "Stays allocated to your notebook server until you explicitly delete or stop it",
        "Gets shared with the next user automatically",
        "Triggers an alert to your manager"
      ],
      correctAnswer: "Stays allocated to your notebook server until you explicitly delete or stop it",
      explanation: "Notebook servers are StatefulSets. Closing the tab doesn't stop the Pod; an explicit stop or delete is needed.",
      component: "Kubeflow Notebooks"
    },
    {
      id: "ds-kfp-compile",
      prompt: "You compile a KFP pipeline in Python using compiler.Compiler().compile(...). The output file is:",
      options: [
        "A Dockerfile",
        "A Helm chart",
        "IR YAML, the Intermediate Representation the KFP backend understands",
        "A .pkl file"
      ],
      correctAnswer: "IR YAML, the Intermediate Representation the KFP backend understands",
      explanation: "Your Python DSL becomes IR YAML. That's what gets submitted to the KFP backend.",
      component: "Kubeflow Pipelines"
    }
  ],

  mlops: [
    {
      id: "mlops-trainer-v2",
      prompt: "Trainer v2 introduced TrainJob and TrainingRuntime. What did these replace?",
      options: [
        "Spark and Flink jobs",
        "Per-framework CRDs: TFJob, PyTorchJob, MPIJob, MXJob, and XGBoostJob",
        "Kubernetes Deployments",
        "Helm charts"
      ],
      correctAnswer: "Per-framework CRDs: TFJob, PyTorchJob, MPIJob, MXJob, and XGBoostJob",
      explanation: "One unified CRD instead of one per framework. No more framework-specific Job types.",
      component: "Kubeflow Trainer"
    },
    {
      id: "mlops-event-trigger",
      prompt: "New data lands in S3 every night. You want your retraining pipeline to trigger automatically. Best approach?",
      options: [
        "A cron email to the team",
        "An event-driven trigger that calls a KFP pipeline run via the KFP API or a CI/CD webhook",
        "Manually check S3 every morning",
        "Train on a fixed schedule regardless of whether data changed"
      ],
      correctAnswer: "An event-driven trigger that calls a KFP pipeline run via the KFP API or a CI/CD webhook",
      explanation: "Pipelines expose a REST API. Wire an S3 event notification to a function that calls the KFP API.",
      component: "Kubeflow Pipelines"
    },
    {
      id: "mlops-oomkilled",
      prompt: "A pipeline step keeps dying with OOMKilled. Your first move:",
      options: [
        "Add more nodes to the cluster",
        "Set proper requests and limits on that component's container spec",
        "Switch to a different ML framework",
        "Restart the cluster and hope"
      ],
      correctAnswer: "Set proper requests and limits on that component's container spec",
      explanation: "OOMKilled means the memory limit was exceeded. Tune the limit before throwing hardware at it.",
      component: "Kubeflow Pipelines"
    },
    {
      id: "mlops-fsdp",
      prompt: "Fine-tuning a 70B model across 16 GPUs, you need to split the model itself (not just the data) across GPUs. Strategy?",
      options: [
        "DDP (Data Distributed Parallel)",
        "FSDP (Fully Sharded Data Parallel), or DeepSpeed ZeRO",
        "Just use a bigger batch size",
        "Single GPU with gradient accumulation"
      ],
      correctAnswer: "FSDP (Fully Sharded Data Parallel), or DeepSpeed ZeRO",
      explanation: "DDP replicates the full model on each GPU. FSDP and DeepSpeed ZeRO shard the model itself, which is essential for 70B+.",
      component: "Kubeflow Trainer"
    },
    {
      id: "mlops-works-on-my-machine",
      prompt: "\"It works on my notebook but fails in the pipeline.\" The permanent fix:",
      options: [
        "Ask the data scientist to not use notebooks",
        "Containerize each pipeline step with pinned dependencies, so the same image runs in the notebook and the pipeline",
        "Use a different orchestrator",
        "Switch to MLflow"
      ],
      correctAnswer: "Containerize each pipeline step with pinned dependencies, so the same image runs in the notebook and the pipeline",
      explanation: "Environment drift is the root cause. Containers with pinned deps eliminate it.",
      component: "Kubeflow Pipelines"
    },
    {
      id: "mlops-kserve-canary",
      prompt: "You deploy a new fraud model with 10% of traffic, 90% on the old one, and want instant rollback if p95 latency spikes. KServe feature:",
      options: [
        "Canary rollout via InferenceService traffic splitting",
        "Manually editing DNS",
        "Two separate clusters with a load balancer",
        "kubectl delete the old one and pray"
      ],
      correctAnswer: "Canary rollout via InferenceService traffic splitting",
      explanation: "InferenceService supports percentage splits, revision-based rollouts, and one-click rollback.",
      component: "KServe"
    },
    {
      id: "mlops-caching-cost",
      prompt: "Your team re-runs the same pipeline daily. Step 1 (data validation, 30 min) almost never changes. How do you cut costs?",
      options: [
        "Manually comment out step 1 on unchanged days",
        "Enable KFP step caching, so unchanged inputs reuse the cached output",
        "Run the pipeline weekly instead",
        "Nothing you can do"
      ],
      correctAnswer: "Enable KFP step caching, so unchanged inputs reuse the cached output",
      explanation: "Caching is automatic when enabled. The same input fingerprint skips execution and reuses the result.",
      component: "Kubeflow Pipelines"
    },
    {
      id: "mlops-auto-retrain",
      prompt: "Production model accuracy degrades. You want the system to detect this and auto-retrain. Architecture?",
      options: [
        "A cron job plus a Slack message to the team",
        "A drift/metric monitor that triggers a KFP pipeline to train, register, then canary deploy",
        "Disable the model until retraining is done manually",
        "Monthly scheduled retraining"
      ],
      correctAnswer: "A drift/metric monitor that triggers a KFP pipeline to train, register, then canary deploy",
      explanation: "Closed-loop MLOps: monitor, trigger the pipeline, train, register, serve. Pipelines are the glue.",
      component: "Kubeflow Pipelines"
    },
    {
      id: "mlops-s3-creds",
      prompt: "A pipeline step needs AWS S3 credentials. The correct approach:",
      options: [
        "Hardcode them in the component function",
        "Mount a Kubernetes Secret as an env var, or use IRSA / Workload Identity for keyless access",
        "Put them in the container image",
        "Store them in a ConfigMap (it's not really a secret)"
      ],
      correctAnswer: "Mount a Kubernetes Secret as an env var, or use IRSA / Workload Identity for keyless access",
      explanation: "Secrets for credentials; Workload Identity is the gold standard. Never bake keys into images.",
      component: "Kubeflow Pipelines"
    },
    {
      id: "mlops-observability",
      prompt: "You want to watch GPU utilization, training step duration, and Trainer job status in one dashboard. The stack?",
      options: [
        "kubectl logs manually per Pod",
        "Prometheus (scrapes metrics) plus Grafana (dashboards) plus DCGM Exporter (NVIDIA GPU metrics)",
        "kubectl top node once a minute",
        "CloudWatch only"
      ],
      correctAnswer: "Prometheus (scrapes metrics) plus Grafana (dashboards) plus DCGM Exporter (NVIDIA GPU metrics)",
      explanation: "DCGM Exporter exposes GPU metrics; Prometheus scrapes them; Grafana visualizes everything.",
      component: "Prometheus"
    }
  ],

  platform: [
    {
      id: "platform-profiles",
      prompt: "Three teams share one cluster. Team A must not see Team B's notebooks, pipelines, or models. The Kubeflow primitive:",
      options: [
        "Separate clusters per team, it's safest",
        "Profiles, each wrapping a Kubernetes namespace with owner, contributors, and RBAC",
        "Good vibes and mutual trust",
        "Hiding everything in Secrets"
      ],
      correctAnswer: "Profiles, each wrapping a Kubernetes namespace with owner, contributors, and RBAC",
      explanation: "A Profile is a namespace plus ownership plus isolation: multi-tenancy without running N clusters.",
      component: "Profiles"
    },
    {
      id: "platform-istio-mtls",
      prompt: "Every internal Kubeflow service communicates over mTLS via sidecar proxies. The component doing this:",
      options: ["Calico", "CoreDNS", "Dex", "Istio"],
      correctAnswer: "Istio",
      explanation: "Istio is the service mesh: mTLS, traffic routing, and policy enforcement.",
      component: "Istio"
    },
    {
      id: "platform-kueue-quota",
      prompt: "Team A grabbed 8 H100s for a notebook they forgot to shut down. The cluster-fairness solution:",
      options: [
        "Slack-shame Team A publicly",
        "Kueue plus ResourceQuota: queued fair-share scheduling with per-namespace GPU caps",
        "Buy more H100s",
        "Disable Notebooks cluster-wide"
      ],
      correctAnswer: "Kueue plus ResourceQuota: queued fair-share scheduling with per-namespace GPU caps",
      explanation: "Kueue does gang scheduling and queuing; ResourceQuota hard-caps each tenant.",
      component: "Kueue"
    },
    {
      id: "platform-dex-sso",
      prompt: "Users log into the Kubeflow Central Dashboard with Google, GitHub, or LDAP SSO. The component handling identity federation:",
      options: ["Istio", "Argo", "Knative", "Dex, an OIDC identity broker"],
      correctAnswer: "Dex, an OIDC identity broker",
      explanation: "Dex federates external identity providers and issues tokens Kubeflow trusts.",
      component: "Dex"
    },
    {
      id: "platform-audit",
      prompt: "A regulator asks: \"Show me the exact data, code, and hyperparams behind the model in production right now.\" The best response time:",
      options: [
        "\"Give me three weeks\"",
        "\"One query: the Model Registry links data version, pipeline run ID, code commit, and hyperparameters\"",
        "\"We'll ask the data scientist who left\"",
        "\"Define 'production'\""
      ],
      correctAnswer: "\"One query: the Model Registry links data version, pipeline run ID, code commit, and hyperparameters\"",
      explanation: "Model Registry plus KFP run history gives full auditability out of the box.",
      component: "Kubeflow Hub"
    },
    {
      id: "platform-gang-scheduling",
      prompt: "Distributed training needs all 16 Pods to launch simultaneously or not at all. Which scheduler feature?",
      options: [
        "The standard Kubernetes scheduler",
        "Volcano or Kueue gang scheduling: all-or-nothing pod group launch",
        "Horizontal Pod Autoscaler",
        "KEDA"
      ],
      correctAnswer: "Volcano or Kueue gang scheduling: all-or-nothing pod group launch",
      explanation: "Gang scheduling prevents partial launches that deadlock while waiting for the remaining GPUs.",
      component: "Volcano"
    },
    {
      id: "platform-artifact-storage",
      prompt: "The default durable storage for KFP pipeline artifacts in a fresh Kubeflow install:",
      options: [
        "/tmp on the node where the Pod ran",
        "An S3-compatible object store: MinIO by default, swap to S3/GCS/Azure in production",
        "A PostgreSQL BLOB column",
        "A cluster-wide ConfigMap"
      ],
      correctAnswer: "An S3-compatible object store: MinIO by default, swap to S3/GCS/Azure in production",
      explanation: "MinIO ships out of the box. In production, point to managed object storage.",
      component: "Object storage"
    },
    {
      id: "platform-node-failure",
      prompt: "A node dies mid-training during a 20-hour Trainer job. What saves the run?",
      options: [
        "The pipeline retries from scratch automatically",
        "Trainer plus JobSet reschedule Pods on healthy nodes, and checkpoint-based resume picks up where it left off",
        "Nothing, it fails permanently",
        "Kubernetes restarts the entire cluster"
      ],
      correctAnswer: "Trainer plus JobSet reschedule Pods on healthy nodes, and checkpoint-based resume picks up where it left off",
      explanation: "Fault tolerance is JobSet resilience plus your training code saving checkpoints periodically.",
      component: "Kubeflow Trainer"
    },
    {
      id: "platform-upgrade",
      prompt: "The safest approach to upgrading Kubeflow in a production cluster:",
      options: [
        "kubectl apply -f all new manifests at once",
        "Check release notes, upgrade Kubernetes and Istio first, then upgrade each subproject one-by-one, smoke test in staging, then prod",
        "Wipe the namespace and reinstall",
        "Wait for someone else to do it first"
      ],
      correctAnswer: "Check release notes, upgrade Kubernetes and Istio first, then upgrade each subproject one-by-one, smoke test in staging, then prod",
      explanation: "Kubeflow is many independent subprojects with separate version lines. Incremental upgrades only.",
      component: "Kubeflow"
    },
    {
      id: "platform-katib-observability",
      prompt: "A Katib experiment ran 200 trials last week and nobody reviewed the results. As platform engineer, how do you surface experiment status automatically?",
      options: [
        "Email every data scientist daily",
        "Expose Katib metrics to Prometheus and alert in Grafana when experiments stall or complete without review",
        "Write a cron job that checks the UI",
        "Nothing, experiments are the data scientist's problem"
      ],
      correctAnswer: "Expose Katib metrics to Prometheus and alert in Grafana when experiments stall or complete without review",
      explanation: "Katib exposes metrics. Prometheus scrapes them; alert on stale or long-running experiments centrally.",
      component: "Katib"
    }
  ],

  developer: [
    {
      id: "dev-sdk",
      prompt: "You want to submit a distributed training job from Python without writing a single line of YAML. The tool:",
      options: [
        "kubectl apply with a very long YAML file",
        "The Kubeflow SDK: TrainingClient().train(...) handles the Kubernetes layer for you",
        "Email the platform team",
        "A bash script that wraps kubectl"
      ],
      correctAnswer: "The Kubeflow SDK: TrainingClient().train(...) handles the Kubernetes layer for you",
      explanation: "The SDK is built specifically so app developers never touch Kubernetes directly.",
      component: "Kubeflow SDK"
    },
    {
      id: "dev-kserve-protocols",
      prompt: "Your app calls a KServe model endpoint. The protocols supported out of the box:",
      options: [
        "FTP and WebSocket",
        "REST (HTTP/JSON) and gRPC, plus an OpenAI-compatible API for LLM runtimes like vLLM",
        "Only REST",
        "SOAP"
      ],
      correctAnswer: "REST (HTTP/JSON) and gRPC, plus an OpenAI-compatible API for LLM runtimes like vLLM",
      explanation: "Pick REST for simplicity, gRPC for low latency, or OpenAI-compatible for LLM apps with zero SDK changes.",
      component: "KServe"
    },
    {
      id: "dev-serverless",
      prompt: "Your chatbot gets 1000 requests/sec during lunch and 0 overnight, and you want to pay only for usage. KServe gives you:",
      options: [
        "A fixed 10-replica deployment",
        "Knative-based scale-to-zero plus concurrency-based autoscale on demand",
        "A cron that scales manually at 9 AM and 10 PM",
        "Nothing, you manage this yourself"
      ],
      correctAnswer: "Knative-based scale-to-zero plus concurrency-based autoscale on demand",
      explanation: "Cold-start is the tradeoff. For bursty AI workloads it's the right default.",
      component: "KServe"
    },
    {
      id: "dev-model-version",
      prompt: "Before calling the inference endpoint, your app needs to know which model version is currently deployed. Where?",
      options: [
        "Parse the URL for a version string",
        "Query the Kubeflow Model Registry API, which stores the deployed version, checksum, and lineage",
        "Ask the data scientist via Slack",
        "Diff the responses between the old and new endpoints"
      ],
      correctAnswer: "Query the Kubeflow Model Registry API, which stores the deployed version, checksum, and lineage",
      explanation: "Model Registry is the contract between training and serving. Pin a version in your client.",
      component: "Kubeflow Hub"
    },
    {
      id: "dev-ci-trigger",
      prompt: "You want to auto-trigger a retraining pipeline every time a PR merges to main. The integration point:",
      options: [
        "Set up a cron job that checks for new commits",
        "Your CI/CD system (GitHub Actions, Jenkins) calls the KFP API to create a run on merge",
        "Manually kick it off after reviewing the PR",
        "Pipelines can't be triggered externally"
      ],
      correctAnswer: "Your CI/CD system (GitHub Actions, Jenkins) calls the KFP API to create a run on merge",
      explanation: "KFP exposes a REST API. Wire it from any CI/CD system: pipelines-as-code.",
      component: "Kubeflow Pipelines"
    },
    {
      id: "dev-inference-graph",
      prompt: "Your RAG app needs to embed the query, retrieve docs, then run the LLM, chained inside the cluster behind one entrypoint. The KServe primitive:",
      options: [
        "Three separate microservices you manage yourself",
        "InferenceGraph, which composes multiple InferenceServices as a DAG with one entry URL",
        "A single mega-container with all three models",
        "Nginx"
      ],
      correctAnswer: "InferenceGraph, which composes multiple InferenceServices as a DAG with one entry URL",
      explanation: "InferenceGraph is KServe's composition layer: fewer hops, a cleaner API for the caller.",
      component: "KServe"
    },
    {
      id: "dev-transformer",
      prompt: "Your LLM endpoint sometimes returns prose when your app expects JSON. The server-side fix (not patching every client):",
      options: [
        "Retrain the model until it always returns JSON",
        "Attach a KServe Transformer container for post-processing, enforcing the schema once instead of in N clients",
        "Add a JSON parser to every frontend",
        "Use guided decoding only if you rewrite the serving container yourself"
      ],
      correctAnswer: "Attach a KServe Transformer container for post-processing, enforcing the schema once instead of in N clients",
      explanation: "A Transformer is a pre/post-processing step attached to the predictor. One fix, all callers benefit.",
      component: "KServe"
    },
    {
      id: "dev-canary-validate",
      prompt: "A new model version is ready. You want to validate it with 5% of real traffic before full cutover. The pattern:",
      options: [
        "Deploy to production at 100% and monitor",
        "Deploy as a new InferenceService revision at 5% traffic weight, validate, then shift to 100%",
        "Stand up a separate cluster for testing",
        "A/B test in a spreadsheet"
      ],
      correctAnswer: "Deploy as a new InferenceService revision at 5% traffic weight, validate, then shift to 100%",
      explanation: "Canary weights in InferenceService plus Knative revision routing: safe, rollback-able, zero downtime.",
      component: "KServe"
    },
    {
      id: "dev-auth",
      prompt: "Your backend service needs to call the Kubeflow API server (KFP, Model Registry). The auth mechanism:",
      options: [
        "Hardcode your personal credentials",
        "Use a Kubernetes ServiceAccount token, or OAuth2 client credentials via Dex",
        "Disable auth in the Kubeflow config",
        "SSH tunnel forever"
      ],
      correctAnswer: "Use a Kubernetes ServiceAccount token, or OAuth2 client credentials via Dex",
      explanation: "ServiceAccount tokens for in-cluster; OAuth2 client credentials for external. Never personal credentials in code.",
      component: "Dex"
    },
    {
      id: "dev-spark-operator",
      prompt: "Before any training can happen, you have 10 TB of raw event logs that need to be joined, filtered, and turned into features. The Kubeflow component for this:",
      options: [
        "Kubeflow Notebooks, just load it all into one notebook",
        "Spark Operator, which submits Apache Spark jobs as Kubernetes-native SparkApplication CRDs",
        "KServe, it can preprocess data too",
        "A very large pandas DataFrame"
      ],
      correctAnswer: "Spark Operator, which submits Apache Spark jobs as Kubernetes-native SparkApplication CRDs",
      explanation: "Spark Operator is Kubeflow's data-at-scale arm. 10 TB is exactly what it's built for.",
      component: "Spark Operator"
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

// Normalize an email into a stable, path-safe Firestore document id so the same
// person always maps to one record.
function emailDocId(email) {
  return String(email).trim().toLowerCase().replace(/\//g, "_");
}

// One local record per email, keeping the best score (mirrors the Firestore rule).
function saveLocalSubmission(record) {
  const list = readJson(STORAGE_KEYS.submissions, []);
  const key = emailDocId(record.email);
  const index = list.findIndex((row) => emailDocId(row.email) === key);
  if (index >= 0) {
    if ((record.score || 0) > (list[index].score || 0)) {
      list[index] = record;
    }
  } else {
    list.push(record);
  }
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
        doc: fsMod.doc,
        getDoc: fsMod.getDoc,
        setDoc: fsMod.setDoc,
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
const feedbackChip = document.querySelector("#feedbackChip");

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

    label.append(input, text);
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

  recordLead({
    name,
    email,
    profession: state.profession,
    professionLabel: PROFESSION_BY_KEY[state.profession].label
  });

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

// Captured at quiz start so we keep the visitor's details even if they never
// finish. Keyed by email (one lead per person), best-effort, non-blocking.
async function recordLead(lead) {
  const firebase = await getFirebase();
  if (!firebase) return;
  try {
    const ref = firebase.doc(firebase.db, LEADS_COLLECTION, emailDocId(lead.email));
    await firebase.setDoc(ref, { ...lead, startedAt: firebase.serverTimestamp() });
  } catch (error) {
    console.warn("Lead capture failed.", error);
  }
}

async function saveSubmission(core) {
  resultNote.classList.add("is-hidden");
  resultNote.classList.remove("is-warning");

  const docId = emailDocId(core.email);
  const localRecord = { ...core, id: docId, submittedAt: Date.now() };
  localStorage.setItem(STORAGE_KEYS.lastSubmissionId, docId);

  const firebase = await getFirebase();

  if (!firebase) {
    saveLocalSubmission(localRecord);
    showResultNote("Saved on this device. The booth leaderboard isn't connected right now.");
    return;
  }

  try {
    // One record per email: read the existing best, only overwrite if this run
    // beats it. A worse retake leaves the standing score untouched.
    const ref = firebase.doc(firebase.db, SUBMISSIONS_COLLECTION, docId);
    const snapshot = await firebase.getDoc(ref);
    const previousScore = snapshot.exists() ? snapshot.data().score : null;

    if (previousScore === null || core.score > previousScore) {
      await firebase.setDoc(ref, { ...core, submittedAt: firebase.serverTimestamp() });
    }
    saveLocalSubmission(localRecord);
  } catch (error) {
    console.warn("Submission write failed, keeping result locally.", error);
    saveLocalSubmission(localRecord);
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

feedbackChip.addEventListener("click", () => {
  if (FEEDBACK_FORM_URL) {
    window.open(FEEDBACK_FORM_URL, "_blank", "noopener");
  }
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
  // One row per email (rows arrive sorted best-first, so the first wins). Guards
  // against any duplicate records left over from before email keying.
  const seenEmails = new Set();
  const deduped = rows.filter((row) => {
    const key = emailDocId(row.email || "");
    if (!key) return true;
    if (seenEmails.has(key)) return false;
    seenEmails.add(key);
    return true;
  });
  const top = deduped.slice(0, 20);
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
feedbackChip.classList.toggle("is-hidden", !FEEDBACK_FORM_URL);

// Deep link: opening /#leaderboard jumps straight to the board (handy for a
// booth display). Any other hash falls through to the start screen.
if (window.location.hash === "#leaderboard") {
  showScreen("leaderboard");
  loadLeaderboard();
} else {
  showScreen("start");
}
