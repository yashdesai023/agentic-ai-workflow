import streamlit as st
import requests
import json

# 1. Page Config (Tab Title & Icon)
st.set_page_config(page_title="Agentic AI Workflow", page_icon="🤖", layout="wide")

# 2. Constants
API_URL = "http://127.0.0.1:8000"

# 3. The Sidebar (Memory Feature)
with st.sidebar:
    st.header("🧠 Memory Bank")
    st.write("Search past email context:")
    
    # Search Input
    query = st.text_input("What do you want to recall?")
    
    if st.button(" Search Memory"):
        if query:
            with st.spinner("Searching vector database..."):
                try:
                    # Call the /recall endpoint
                    response = requests.get(f"{API_URL}/recall", params={"query": query})
                    
                    if response.status_code == 200:
                        data = response.json()
                        st.success("Found relevant info!")
                        st.info(data["result"])
                    else:
                        st.error("Failed to search memory.")
                except Exception as e:
                    st.error(f"Connection Error: {e}")

    st.markdown("---")
    st.caption("Agentic AI System v1.0")

# 4. Main Content Area
st.title(" Agentic Email Automation")
st.markdown("Paste an email below. The agents will **Summarize**, **Extract Tasks**, and **Draft a Reply**.")

# Email Input
email_content = st.text_area("Paste Email Content Here:", height=200)

# 5. Action Button
if st.button("🚀 Run Agents"):
    if email_content:
        with st.spinner("Agents are working... (Summarizing -> Extracting -> Drafting)"):
            try:
                # Call the /analyze endpoint
                payload = {"email_content": email_content}
                response = requests.post(f"{API_URL}/analyze", json=payload)
                
                if response.status_code == 200:
                    data = response.json()
                    result_text = data["result"]
                    
                    st.success("Process Complete!")
                    
                    # 6. Display Result with Copy Button
                    st.subheader("📨 Generated Response")
                    # Using st.code automatically adds a 'Copy' button to the top right!
                    st.code(result_text, language="markdown")
                    
                else:
                    st.error(f"Server Error: {response.status_code}")
            except Exception as e:
                st.error(f"Connection Error: Is the backend running? \nDetails: {e}")
    else:
        st.warning("Please paste an email first.")