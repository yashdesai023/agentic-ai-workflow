

# Developer Runbook — Agentic AI Workflow Automation System

This document guides contributors on setting up, running, and debugging the project in local development.

---

# 1. Environment Setup

### 1. Clone Repo

```
git clone <your-repo-url>
cd agentic-ai
```

### 2. Create Virtual Environment

```
python -m venv .venv
# activate
source .venv/bin/activate      # macOS / linux
.\.venv\Scripts\Activate.ps1   # windows powershell
```

### 3. Install Dependencies

```
pip install -r requirements.txt
```

### 4. Environment Variables

Copy environment template:

```
cp .env.example .env
```

Set:

* `GEMINI_API_KEY`
* `DATABASE_URL`
* `FAISS_INDEX_PATH`

Never commit `.env`.

---

# 2. Running the API (Dev Mode)

Start the FastAPI server:

```
uvicorn src.api.app:app --reload --port 8000
```

API will be available at:

```
http://localhost:8000
```

Swagger docs (auto-generated):

```
http://localhost:8000/docs
```

---

# 3. Running Celery Worker (later in Sprint 3)

```
celery -A src.workers.celery_app worker --loglevel=info
```

Redis must be running:

```
redis-server
```

---

# 4. Local FAISS Index Setup

Initial index generation script will run automatically when first embedding is created.

Check FAISS index location:

```
./data/faiss.index
```

Reset FAISS index (wipe):

```
rm ./data/faiss.index
```

---

# 5. Local DB Setup

SQLite dev database:

```
sqlite:///./data/dev.db
```

To inspect DB:

```
sqlite3 data/dev.db
.tables
```

Reset DB:

```
rm data/dev.db
```

---

# 6. Developer Workflow (Daily Checklist)

Every morning:

* Activate venv
* Pull latest code
* Run tests
* Start API server
* Process a sample email from `sample_data/`
* Verify task extractor output
* Commit and push small changes

---

# 7. Running Manual End-to-End Test

1. Pick a sample file from `sample_data/sample-01.txt`
2. Call:

```
POST /ingest
POST /process_email
GET /tasks
```

3. Verify:

   * Summary
   * Task JSON
   * Reply drafts
   * DB rows created

---

# 8. Debugging Guide

### ❗ LLM returns non-JSON output

Fix:

* Strengthen constraint: *"Respond ONLY with valid JSON"*
* Add `Stop at first invalid token` in parsing logic
* Reduce temperature

### ❗ FAISS retrieval irrelevant

Fix:

* Normalize text before embedding
* Verify embed model for both index + query
* Ensure metadata filtering works

### ❗ Task extraction missing tasks

Fix:

* Add more few-shot examples
* Increase summary clarity
* Add explicit instruction: *"Extract ALL actionable tasks"*

### ❗ Gmail OAuth errors

Fix:

* Check redirect URI
* Ensure test users added
* Check "external" app status

---

# 9. Useful Commands

Start API:

```
uvicorn src.api.app:app --reload
```

Run tests:

```
pytest -q
```

Format / lint (once you add linters):

```
ruff check .
```

Build Docker image (later):

```
docker build -t agentic-ai .
```
