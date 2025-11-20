import os
from dotenv import load_dotenv
from langchain_community.vectorstores import FAISS
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_huggingface import HuggingFaceEmbeddings



class EmailVectorDB:
    def __init__(self):
        load_dotenv()
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            raise ValueError("GEMINI_API_KEY not found in environment variables.")
        self.embeddings = GoogleGenerativeAIEmbeddings(google_api_key=api_key, model="models/text-embedding-004")
        self.db = None
    
    def save_summary(self, text):
        if self.db is None:
            self.db = FAISS.from_texts([text], self.embeddings)
        else:
            self.db.add_texts([text])
            print("------------Saved to DB.------------")
    
    def search_similar(self, query):
        if self.db is None:
            return "Database is Empty"
        else:
            results = self.db.similarity_search(query)
            if results:
                return results[0].page_content
            else:
                return "No similar emails found."
        
