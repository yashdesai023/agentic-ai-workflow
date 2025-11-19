# Architecture — Agentic AI Workflow Automation System

## 1 — System Overview

This system ingests emails (Gmail/IMAP or local files), extracts a clean text + metadata representation, and routes the content through a set of specialized agents (Reader → Summarizer → TaskExtractor → ReplyAgent → ActionAgent). A Vector Store (FAISS locally, or Pinecone/Weaviate in production) holds embeddings for RAG; a SQL DB stores tasks, replies, audit logs and user settings. FastAPI exposes REST endpoints for demo and integration; asynchronous processing (Celery + Redis) decouples ingestion from heavy LLM work.

---

## 2 — Component list & responsibilities

1. **Ingestion Layer**

   * *Responsibility:* Fetch email content (IMAP/Gmail API or local .eml files), sanitize HTML → text, extract attachments & headers.
   * *Inputs:* raw email source
   * *Outputs:* `RawEmail` object (id, message_id, subject, from, body_text, raw_html, date)

2. **Orchestrator**

   * *Responsibility:* Control flow between agents, maintain correlation IDs, handle retries and error states, log audit events.
   * *Inputs:* `RawEmail`
   * *Outputs:* sequence of agent outputs + final `ProcessingRun` record

3. **Reader Agent**

   * *Responsibility:* Clean text, identify language, extract quoted text and signatures.
   * *Output:* `CleanEmail` (subject, body_text_clean, important_headers, attachments_meta)

4. **Summarizer Agent**

   * *Responsibility:* Produce concise summary and extract entities/asks that inform TaskExtractor. Uses RAG by retrieving top-K context from vector store if applicable.

5. **TaskExtractor Agent**

   * *Responsibility:* Convert summary → structured tasks `{title, description, due_date?, priority?, assignee?, confidence}` in strict JSON.

6. **ReplyAgent**

   * *Responsibility:* Generate 1–3 draft replies (tones: concise, formal, bullet-list), include rationale and citation to context if used.
   * *Note:* Must not send automatically without human approval.

7. **ActionAgent**

   * *Responsibility:* Execute or simulate concrete actions: create calendar events, create to-dos in DB, send replies (via Gmail API). Provide a mock adapter and a production adapter.

8. **VectorStore / RAG**

   * *Responsibility:* Index embeddings for emails & conversations, provide retrieval API.
   * *Options:* FAISS (local), Pinecone/Weaviate (managed).

9. **Persistence**

   * *Responsibility:* Store tasks, reply drafts, audit logs, user settings. SQLite for MVP; Postgres for production.

10. **API & UI**

    * *Responsibility:* FastAPI endpoints for ingesting, listing tasks, approving replies; optional minimal React UI for approvals.

11. **Workers**

    * *Responsibility:* Celery workers or background jobs to process ingestion and agent pipelines asynchronously.

---

## 3 — Dataflow (text sequence diagram)

![Dataflow (text sequence diagram)](diagrams\Dataflow-text-sequence-diagram.png)

---

## 4 — Deployment topology (text for diagram)

* **Containers:**

  * `api` (FastAPI app)
  * `worker` (Celery worker)
  * `redis` (message broker)
  * `faiss` (if you separate index service; otherwise local file store)
  * `db` (Postgres or sqlite volume)
* **CI/CD:** GitHub Actions builds Docker image, runs tests, then deploys to Render/Railway/AWS.
* **Optional managed services:** Pinecone (vector DB), Google Cloud (Gmail OAuth hosting), S3 (attachments).

---

## 5 — Sequence of a single email processing run (detailed)

1. **Ingest:** Email arrives via Gmail webhook or manual `POST /ingest`. Ingestion service stores raw email and enqueues a processing job with `run_id`.
2. **Reader:** Worker picks job, cleans HTML, strips signatures/quoted text; writes `CleanEmail`.
3. **Embed:** Create embedding for the email and store in VectorStore with metadata (email_id, date, sender).
4. **Summarizer:** Retrieve top-K related vectors (if any) and include them in the prompt; produce summary + key facts.
5. **TaskExtractor:** Use structured prompt + few-shot examples to extract JSON tasks.
6. **ReplyAgent:** Generate draft reply options (without sending), persist drafts.
7. **ActionAgent:** If auto-action is permitted, run action adapters (or create a pending action for human approval).
8. **AuditLog:** Persist all steps with timestamps and correlation IDs.

---

## 6 — RAG & embedding strategy (short)

* Embed raw cleaned email text + important metadata (subject, sender, date).
* Store vector with metadata tags for filtering by user, date, or thread.
* Use cosine similarity retrieval (top-k) and include top-3 results into Summarizer prompts.

---

## 7 — Failure modes & mitigation

* **LLM timeout / rate limit:** Retry with exponential backoff; fall back to simpler summarizer template.
* **Bad parse from TaskExtractor:** Persist “confidence” and route low-confidence tasks for manual review.
* **OAuth token expiry:** Implement refresh flow and alert on repeated failures.
* **Privacy leak:** redact PII before storing; add retention policies.

---

## 8 — Diagram drawing notes (for draw.io / Miro)

* Draw five horizontal swimlanes: Ingest, Orchestrator, Agents, Storage, External APIs.
* Use arrows for data flow; label each arrow with payload type (RawEmail, CleanEmail, Summary, Tasks, AuditLog).
* Highlight async boundaries (queue) and external trust boundaries (Gmail API, Calendar API).

---

## 9 — Suggested metrics to track

* Emails processed / day
* Average processing latency (ingest → tasks)
* Task extraction accuracy (manual sample)
* Number of auto-actions executed vs. approved
* LLM call counts and cost estimate

---

# Next small steps to complete these docs (what you should commit next)

1. Create the two files at the paths above and commit them.
2. Add a placeholder GIF/PNG referenced by `README.md` (put in `docs/media/` if you want).
3. Create the next doc: `docs/prompts.md` (I can generate that next — it includes summarizer + task extraction prompts and 8 few-shot examples).

---

