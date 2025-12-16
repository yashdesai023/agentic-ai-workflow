from fastapi import FastAPI
from pydantic import BaseModel
from src.pipeline.crew_pipeline import create_crew_pipeline
from src.tools.vector_db import EmailVectorDB

app = FastAPI()

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for dev
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

vector_db = EmailVectorDB()
class EmailInput(BaseModel):
    email_content: str

@app.get("/")
async def root():
    return {"status": "Agentic AI System is running"}

@app.post("/analyze")
def analyze_email(request: EmailInput):
    result = create_crew_pipeline().kickoff(inputs={"email_content": request.email_content})
    vector_db.save_summary(str(result))
    return {"result": str(result)}

@app.get("/recall")
def recall_info(query: str):
    result = vector_db.search_similar(query)
    return {"result": result}