from crewai import LLM, Agent

def get_reply_agent(llm):
    return Agent(
        llm=llm,
        role="Professional Email Writer",
        goal="Draft a polite and professional email reply based on the summary and extracted tasks.",
        backstory="You are a communications expert. Your tone is professional, concise, and helpful. You never sound robotic.",
        verbose = True
    )