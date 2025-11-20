from crewai import LLM, Agent

def get_task_agent(llm):
    return Agent(
        llm=llm,
        role="Senior Task Analyst",
        goal="Extract actionable tasks from the email. Output must be a clear list of action items.",
        backstory="You are a detail-oriented project manager. You ignore fluff and focus only on what needs to be done, by whom, and by when.",
        verbose = True
    )