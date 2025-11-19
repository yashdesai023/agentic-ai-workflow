# Agentic AI — Workflow Automation System

**One-liner:** An Agentic AI system that ingests emails, summarizes content, extracts structured tasks, proposes draft replies, and performs or suggests actions — built for demoing LLM orchestration, RAG/memory, and deployment.

---

## Demo (what to show)

* Short 60–90s demo: ingest an email → summary → extracted tasks → draft reply → approve action (create calendar event / add todo).
* Include a GIF or short MP4 here showing the flow.

---

## Features

* Email ingestion (mock files, Gmail/IMAP planned)
* LLM-based summarization & structured task extraction
* Multi-agent orchestration (Reader, Summarizer, TaskExtractor, ReplyAgent, ActionAgent)
* Vector memory + RAG (FAISS local; easily swappable to Pinecone/Weaviate)
* FastAPI backend with REST endpoints for demo & integration
* SQLite/Postgres for persistence; audit logs + metrics
* Dockerized services + CI/CD (GitHub Actions)
* Simple UI (optional) for approving replies & viewing tasks

---

## Quick start (local / mock-first)

1. Clone the repo.
2. Create a Python virtual environment and install dependencies (requirements listed in `README` later).
3. Populate `sample_data/` with example `.eml` or `.txt` emails (we include 10 sample emails).
4. Run the mock ingestion flow (ingest a sample email → get summary + tasks).

> Note: This README is the documentation entrypoint — see `docs/` for architecture, prompts, OAuth setup, API specs, and runbook.

---

## Repo structure (short)

```
agentic-ai/
├── docs/                # Documentation: architecture, prompts, oauth, runbook
├── src/
│   ├── api/             # FastAPI endpoints
│   ├── agents/          # Reader, Summarizer, TaskExtractor, ReplyAgent, ActionAgent
│   ├── services/        # email_service, calendar_service, oauth, storage_adapter
│   ├── embeddings/      # embedder wrapper + vectorstore adapter
│   ├── workers/         # Celery / background tasks
│   ├── models/          # pydantic-style model specs (docs)
│   └── core.py          # orchestrator entrypoints
├── tests/
├── sample_data/         # sample emails for testing
├── infra/
├── docker/
└── README.md
```

---

## Running locally (conceptual steps)

* Create virtual environment: `python -m venv .venv`
* Install dependencies (add list to `requirements.txt`): e.g., FastAPI, httpx, langchain, faiss-cpu (or faiss-gpu), sqlalchemy, pydantic, celery, redis, pytest, structlog.
* Add environment variables (LLM keys, Gmail OAuth client, DB URL). **Do not commit secrets.**
* Start with mock adapters: ingest `sample_data/` files to test the pipeline.
* When ready, enable Gmail OAuth and production adapters.

(We’ll fill exact commands later when you’re ready to implement; at this stage the README must remain provider-agnostic.)

---

## Environment variables (example list — document in docs/runbook.md)

* `LLM_PROVIDER` — e.g., openai, local
* `LLM_API_KEY` — provider API key
* `GMAIL_CLIENT_ID`, `GMAIL_CLIENT_SECRET`
* `DATABASE_URL` — sqlite:///./data.db or postgres URL
* `REDIS_URL` — for Celery (optional)

---

## API (placeholder)

* `POST /ingest` — ingest an email (raw or message_id)
* `POST /process_email` — process an ingested email through agents
* `GET /tasks` — list tasks
* `POST /tasks/{id}/action` — approve/execute an action

(Full endpoint specs are in `docs/api_spec.md`.)

---

## Contribution & issues

* Open issues for features (MVP: `mvp-ingest`, `prompts`, `rag`) and use GitHub Projects to track sprints.
* Use PR templates and require at least one reviewer before merge.

---

## Roadmap (high level)

* MVP: mock ingestion, summarization, task extraction, SQLite persistence, local FAISS.
* Iteration: multi-agent orchestration, reply generation, action adapters (mock).
* Harden: Gmail OAuth, Celery+Redis, managed vector DB (Pinecone), CI/CD & deploy.
* Future: UI for approvals, multi-user support, RBAC, analytics.


