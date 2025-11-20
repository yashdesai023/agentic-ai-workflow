from crewai import Task, Crew, Process, LLM # Added LLM here
from src.agents.summarizer_agent import get_summarizer_agent
from src.agents.task_agent import get_task_agent
from src.agents.reply_agent import get_reply_agent
from dotenv import load_dotenv
import os

load_dotenv()

def create_crew_pipeline():
    llm = LLM(
        model="gemini/gemini-2.0-flash", # Use 1.5-flash for stability
        api_key=os.getenv("GEMINI_API_KEY"),
        temperature=0.7
    )


    summary_agent = get_summarizer_agent(llm)
    task_agent = get_task_agent(llm)
    reply_agent = get_reply_agent(llm)

  
    summary_task = Task(
        agent=summary_agent,
        description="Analyze the following email thoroughly and generate a concise summary: {email_content}",
        expected_output="A bullet-point summary of the email."
    )

    task_extraction_task = Task(
        agent=task_agent,
        description="Extract actionable tasks from the email. Output must be a clear list of action items.",
        expected_output="A JSON-formatted list of tasks."
    )

    reply_task = Task(
        agent=reply_agent, 
        description="Draft a polite and professional email reply based on the summary and extracted tasks.",
        expected_output="A polite email draft ready to be sent." 
    )

    # 4. Create Crew
    crew = Crew(
        agents=[summary_agent, task_agent, reply_agent],
        tasks=[summary_task, task_extraction_task, reply_task],
        verbose=True,
        process=Process.sequential
    )

    return crew