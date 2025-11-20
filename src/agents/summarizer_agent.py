from langchain_google_genai import ChatGoogleGenerativeAI
from crewai import LLM, Agent




def get_summarizer_agent(llm):
    return Agent(
        role="Email Summarizer",
        llm=llm,
        goal="Summarize incoming emails into concise bullet points, identifying the sender and main intent.",
        backstory="You are an expert executive assistant. You read complex emails and turn them into 3-sentence summaries so your boss can read them quickly.",
        verbose = True
    )


# summarizer_agent = Agent(
#         role="Email Summarizer",
#         llm=llm,
#         goal="Summarize incoming emails into concise bullet points, identifying the sender and main intent.",
#         backstory="You are an expert executive assistant. You read complex emails and turn them into 3-sentence summaries so your boss can read them quickly.",
#         verbose = True
# )


