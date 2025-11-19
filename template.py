import os
from pathlib import Path

# Define your package name here
package_name = "agentic-ai"

# Define the full list of files & structure for your AI/LLM pipeline package
list_of_files = [
    f"{package_name}/docs/architecture.md",
    f"{package_name}/docs/prompts.md",
    f"{package_name}/docs/oauth_gmail_setup.md",
    f"{package_name}/docs/runbook.md",
    f"{package_name}/infra/docker-compose.yml",
    f"{package_name}/infra/k8s/",
    f"{package_name}/infra/github-actions/",
    f"{package_name}/docker/Dockerfile",
    f"{package_name}/src/api/v1",
    f"{package_name}/src/agents/",
    f"{package_name}/src/services/",
    f"{package_name}/src/embeddings/",
    f"{package_name}/src/workers/",
    f"{package_name}/src/models/",
    f"{package_name}/src/db/",
    f"{package_name}/src/core.py",
    f"{package_name}/tests/",
    f"{package_name}/sample_data/",
    f"{package_name}/README.md",
    f"{package_name}/LICENSE",
    f"{package_name}/requirements.txt",
    f"{package_name}/.gitignore",
]

# Create directories and files
for filepath in list_of_files:
    filepath = Path(filepath)
    filedir, filename = os.path.split(filepath)
    
    if filedir != "":
        os.makedirs(filedir, exist_ok=True)
    
    if (not os.path.exists(filepath)) or (os.path.getsize(filepath) == 0):
        with open(filepath, "w") as f:
            pass  # create an empty file

print(f"✅ Project structure for '{package_name}' created successfully!")