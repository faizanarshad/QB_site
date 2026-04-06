export type PortfolioProject = {
  slug: string;
  title: string;
  subtitle: string;
  category: "healthcare" | "ai" | "data";
  emoji: string;
  summary: string;
  problem: string;
  solution: string;
  fullStackDetails?: string;
  stripeDetails?: string;
  technologies: string[];
  results: string;
};

export const portfolioProjects: PortfolioProject[] = [
  {
    slug: "health-data-vitals",
    title: "Health Data Vitals",
    subtitle:
      "Healthcare Business Intelligence & Paid Dashboard Platform | Full-Stack Web Application",
    category: "healthcare",
    emoji: "🏥",
    summary:
      "Full-stack BI platform with daily Python ETL, three operational dashboards (Quality, Cost, Service Delivery), and Stripe subscriptions—aggregated data only, no patient clinical information.",
    problem:
      "Healthcare organizations struggle with siloed administrative data across claims, staffing, and service systems. Manual financial and quality reporting consumes 40 hours weekly, with no mechanism to monetize analytics dashboards.",
    solution:
      "The platform connects to organizational databases via daily Python ETL scripts. Three dashboards deliver insights: Quality (HEDIS/STAR benchmarks), Cost (per-service-line expenses, staffing efficiency), and Service Delivery (appointment availability, length of stay). Only aggregated operational data is stored — no patient clinical information.",
    fullStackDetails: `Frontend: React 18 with Next.js 14 App Router provides server-side rendering and API routes. Tailwind CSS and Shadcn/ui deliver consistent component design. React Query handles server state caching. Axios manages authenticated API calls to the backend.

Backend: FastAPI (Python 3.11) runs asynchronous endpoints for dashboards, authentication, and subscriptions. Pydantic validates request schemas. Firebase JWT tokens authenticate users. Role-based access controls restrict data by organization.

Database: PostgreSQL 15 stores organizations, users, cached metrics, audit logs, and subscriptions. Prisma ORM provides type-safe queries. Redis 7 caches dashboard results (5-minute TTL) and manages rate limiting.

Infrastructure: Docker containers run the application. Frontend deploys to Firebase Hosting (CDN). Backend runs on AWS EC2 with auto-scaling. PostgreSQL uses AWS RDS (automated backups). S3 stores report exports with CloudFront CDN. GitHub Actions automates CI/CD.`,
    stripeDetails: `Subscription Tiers: Three tiers defined in Stripe Products API — Essentials (small clinics), Professional (mid-size practices), Enterprise (health systems). Each tier includes specific dashboard modules, user seats, and rate limits.

Checkout Flow: Frontend calls backend /create-checkout-session endpoint. Backend creates Stripe Checkout Session with price ID, success/cancel URLs, and organization metadata. Stripe hosts the payment page.

Webhook Processing: Stripe sends async events to /stripe-webhook endpoint. Signature verification confirms event authenticity. Key events handled: checkout.session.completed (provisions Firebase accounts, sends welcome email), invoice.payment_succeeded (updates subscription status), invoice.payment_failed (notifies organization, schedules retry), customer.subscription.deleted (revokes access after 7-day grace).

Access Provisioning: On successful payment, webhook triggers Firebase Authentication to create organization admin accounts. Stripe Customer Portal allows organizations to update payment methods, download invoices, and manage billing independently.`,
    technologies: [
      "React 18",
      "Next.js 14",
      "Tailwind CSS",
      "FastAPI 0.104",
      "PostgreSQL 15",
      "Prisma ORM",
      "Redis 7",
      "Firebase Authentication",
      "Stripe API",
      "Docker",
      "AWS (EC2, RDS, S3)",
      "GitHub Actions",
      "Pandas 2.0",
      "scikit-learn 1.3",
    ],
    results: `Deployed across multiple hospital authorities. Achieved 70% reduction in manual reporting (40 to 12 hours weekly). Achieved 33% improvement in payment collection. ROI report generation reduced from two weeks to under one day. System maintains 99.95% API uptime.`,
  },
  {
    slug: "ai-voice-assistant-pro",
    title: "AI Voice Assistant Pro",
    subtitle: "Multimodal Intelligent Agent | Voice • Text • Vision",
    category: "ai",
    emoji: "🎙️",
    summary:
      "Flask app with LangGraph routing: fast-path for simple queries, GPT-4o / Claude / Ollama for complex tasks, vision for images, Redis caching, and sub–2.5s voice latency.",
    problem:
      "Organizations need voice-enabled AI but face complex pipeline integration, vendor lock-in, high latency exceeding five seconds, and deployment requiring weeks.",
    solution:
      "The Flask application accepts voice via browser microphone. ffmpeg converts WebM to WAV. SpeechRecognition provides transcription. LangGraph agent checks simple queries (time, weather, calculator) returning cached results without LLM calls. Complex queries route to OpenAI GPT-4o, Claude 3.5 Sonnet, or local Ollama. Images upload for GPT-4o vision analysis. gTTS generates voice responses. Redis caches weather (5 minutes) and time (30 seconds). Deployment requires docker-compose up in under 15 minutes.",
    technologies: [
      "Flask 2.3",
      "LangGraph 0.0.20",
      "OpenAI API (GPT-4o, GPT-4o-mini)",
      "Anthropic Claude 3.5 Sonnet",
      "Ollama",
      "SpeechRecognition 3.10",
      "ffmpeg",
      "gTTS",
      "OpenCV 4.8",
      "Redis 7.0",
      "Tailwind CSS",
      "Docker",
    ],
    results: `Achieves 1.2–2.5 second voice latency. 60% of requests bypass LLM via fast-path routing. Token costs reduced by 40%. Cached responses under 50ms. 99.9% reliability over 5,000+ conversations.`,
  },
  {
    slug: "agentic-rag-system",
    title: "Agentic RAG System",
    subtitle: "Document Intelligence Platform with Medical CSV Support",
    category: "ai",
    emoji: "📚",
    summary:
      "Upload PDFs or CSVs; PHI redaction on medical CSVs with regex and spaCy; Pinecone vector search; GPT-4o-mini answers with citations.",
    problem:
      "Organizations cannot efficiently query private documents. Medical CSV files contain Protected Health Information requiring removal before processing.",
    solution:
      "Users upload PDFs or CSVs through React interface. For CSVs, regex patterns and spaCy scan for PHI (names, IDs, dates) and replace with [REDACTED]. Text splits into 1000-character overlapping chunks. OpenAI text-embedding-3-small generates 1536-dimension vectors stored in Pinecone. User questions embed similarly; system retrieves top 5 similar chunks via cosine similarity. GPT-4o-mini answers only from provided context with source citations.",
    technologies: [
      "FastAPI 0.104",
      "React 18.2",
      "OpenAI API (GPT-4o-mini, text-embedding-3-small)",
      "Pinecone",
      "PyPDF2",
      "pandas",
      "spaCy 3.7",
      "Tailwind CSS",
      "Docker",
    ],
    results: `Instant Q&A over 1,000+ page documents. Automatic PHI redaction for medical CSVs. Sub-second retrieval latency below 300 milliseconds.`,
  },
  {
    slug: "airlines-data-analysis-dashboard",
    title: "Airlines Data Analysis Dashboard",
    subtitle: "Indian Domestic Flight Analytics | 300,000+ Records",
    category: "data",
    emoji: "✈️",
    summary:
      "Pandas-backed analytics on 300,153 records with Plotly dashboards: pricing, routes, seasonality, and hub performance across four HTML pages.",
    problem:
      "Airlines lack interactive tools to analyze pricing patterns, route profitability, and booking behaviors across 300,000+ flight records.",
    solution:
      "The dashboard loads 300,153 records into Pandas. Four HTML pages embed Plotly visualizations. Main Dashboard shows average price by airline, price distribution by class, price versus days left scatter, route heatmap, and stop count impact. Price Analysis page examines dynamic pricing by airline, route, and days left. Time Trends page analyzes seasonality and booking window. Route and Airline page presents hub performance and stop penalties.",
    technologies: [
      "Python 3.10",
      "Pandas 2.0",
      "NumPy 1.24",
      "Plotly 5.17",
      "Altair 5.1",
      "HTML5",
      "CSS3",
      "JavaScript",
    ],
    results: `Booking 21+ days before departure saves 35% versus last-minute. Hyderabad–Chennai route lowest average price. Two-or-more stops cost 2.3x non-stop flights. Zero missing values.`,
  },
  {
    slug: "advanced-virtual-painter",
    title: "Advanced Virtual Painter",
    subtitle: "AI-Powered Hand Gesture Drawing Application",
    category: "ai",
    emoji: "🎨",
    summary:
      "MediaPipe hand landmarks, gesture-based drawing, AI shape completion (circles/rectangles), voice commands, and flood fill—30+ FPS.",
    problem:
      "Traditional digital drawing requires physical input devices. Users desire hands-free, gesture-based drawing with AI-assisted shape completion.",
    solution:
      "Webcam feeds into MediaPipe hand tracking (21 landmarks). Index finger up draws on canvas. Two fingers up selects colors (red, green, blue, yellow, purple, white, black) and tools. Three fingers up triggers AI shape completion — fitting circles via least-squares or detecting rectangles via convex hull. Voice commands (\"red\", \"clear\", \"save\", \"undo\") provide hands-free control. Flood fill uses queue-based algorithm for enclosed areas.",
    technologies: [
      "Python 3.7",
      "MediaPipe",
      "OpenCV",
      "SpeechRecognition",
      "pyttsx3",
      "NumPy",
    ],
    results: `30+ FPS real-time gesture recognition. 95%+ hand landmark accuracy. Supports 7 colors, 5 tools, 5 brush sizes, 20-level undo/redo. Cross-platform on Windows, macOS, Linux.`,
  },
  {
    slug: "diabetes-prediction-ai",
    title: "Diabetes Prediction AI — Complete Suite",
    subtitle: "Multi-Platform AI Prediction System | 95.2% Accuracy",
    category: "healthcare",
    emoji: "🩺",
    summary:
      "Ensemble RF + XGBoost + LightGBM with SHAP; Discord bot, web UI, FastAPI, and Kivy mobile app with local SQLite for offline predictions.",
    problem:
      "Healthcare administrators need diabetes risk prediction across web, chat, API, and mobile platforms with explainable AI.",
    solution:
      "Ensemble model combines Random Forest, XGBoost, and LightGBM using 11 clinical features (age, BMI, HbA1c, cholesterol, etc.). Data validation enforces medical ranges. Discord bot accepts /predict commands, returns predictions with SHAP feature importance charts, and stores history. Web interface accepts manual forms or CSV batch uploads. FastAPI provides REST endpoints with API key authentication. Kivy mobile app stores predictions locally in SQLite for offline use.",
    technologies: [
      "Python",
      "scikit-learn 1.3",
      "XGBoost 1.7",
      "LightGBM 3.3",
      "SHAP 0.41",
      "FastAPI 0.104",
      "Discord.py 2.3",
      "Bootstrap 5",
      "Kivy 2.1",
      "Docker",
    ],
    results: `95.2% accuracy across 11 clinical features. Four interfaces: Discord bot, web dashboard, REST API, mobile app. SHAP explainability, batch CSV processing, offline mobile predictions.`,
  },
  {
    slug: "electric-vehicle-analytics-hub-2025",
    title: "Electric Vehicle Analytics Hub 2025",
    subtitle: "Comprehensive EV Market Analysis | 478 Models | 59 Brands",
    category: "data",
    emoji: "🚗",
    summary:
      "Three dashboards: Streamlit (8 pages), Dash (ML/clustering/3D), Gradio (NL queries and recommendations) over 478 models and 22+ features.",
    problem:
      "EV market analysts need analytics for 478 models across 59 brands. Different users need different interfaces: business dashboards, ML exploration, and natural language queries.",
    solution:
      "Streamlit dashboard (port 8501) provides 8 analysis pages with scatter plots, bar charts, and real-time filtering. Dash dashboard (port 8050) features K-means clustering, range prediction models, and 3D visualizations. Gradio dashboard (port 7861) supports natural language queries (\"Show EVs with range exceeding 300 miles\"), AI-generated insights, and smart recommendations.",
    technologies: [
      "Python 3.10",
      "Streamlit 1.28",
      "Plotly Dash 2.14",
      "Gradio 4.8",
      "scikit-learn 1.3",
      "Pandas 2.0",
      "Plotly 5.17",
    ],
    results: `Analyzes 478 EV models across 59 brands with 22+ features. Three dashboards serving business users, data scientists, and AI enthusiasts. Natural language queries, ML-based range prediction, K-means segmentation.`,
  },
];

export function getProjectBySlug(slug: string): PortfolioProject | undefined {
  return portfolioProjects.find((p) => p.slug === slug);
}

export function getAllPortfolioSlugs(): string[] {
  return portfolioProjects.map((p) => p.slug);
}
