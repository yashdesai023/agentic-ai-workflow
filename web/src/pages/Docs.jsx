import React from 'react';
import { motion } from 'framer-motion';
import { Code, Terminal, FileJson } from 'lucide-react';

const Docs = () => {
    const codeSnippet = `
# Example: Initialize the Crew
from src.pipeline.crew_pipeline import create_crew_pipeline

def run_agentic_workflow(email_content):
    crew = create_crew_pipeline()
    result = crew.kickoff(inputs={"email_content": email_content})
    return result
`;

    const apiSnippet = `
POST /analyze
Content-Type: application/json

{
  "email_content": "Meeting at 10am tomorrow..."
}
`;

    return (
        <div className="container" style={{ padding: '4rem 2rem' }}>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-gradient" style={{ fontSize: '3rem', marginBottom: '2rem' }}>Documentation</h1>

                <div className="glass-panel" style={{ padding: '2rem', borderRadius: '1rem', marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                        <Terminal size={24} color="var(--accent-primary)" />
                        <h2 style={{ fontSize: '1.5rem' }}>Python Implementation</h2>
                    </div>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                        The core logic is handled by CrewAI agents. Here's how to initialize the pipeline:
                    </p>
                    <pre style={{ background: '#000', padding: '1.5rem', borderRadius: '0.5rem', overflowX: 'auto', color: '#a5b4fc' }}>
                        <code>{codeSnippet}</code>
                    </pre>
                </div>

                <div className="glass-panel" style={{ padding: '2rem', borderRadius: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                        <FileJson size={24} color="var(--accent-primary)" />
                        <h2 style={{ fontSize: '1.5rem' }}>API Usage</h2>
                    </div>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                        Interact with the agentic system via the REST API:
                    </p>
                    <pre style={{ background: '#000', padding: '1.5rem', borderRadius: '0.5rem', overflowX: 'auto', color: '#34d399' }}>
                        <code>{apiSnippet}</code>
                    </pre>
                </div>
            </motion.div>
        </div>
    );
};

export default Docs;
