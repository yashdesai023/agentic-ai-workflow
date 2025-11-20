from src.pipeline.crew_pipeline import create_crew_pipeline 

inputs = {'email_content': "Subject: Project Alpha Sprint Review - Action Required From: sarah.manager@techcorp.com To: you@techcorp.com Hi Team, Great work on the deployment yesterday. However, we have a few lingering issues that need immediate attention before the Monday release. 1. The login page alignment is broken on mobile devices. 2. The API rate limiter is kicking in too early for premium users. 3. We need the updated API documentation by Friday EOD. Please let me know who is picking up which task. Also, dont forget to update the Jira board. Best, Sarah"}
crew = create_crew_pipeline()
result = crew.kickoff(inputs=inputs)
print(result)