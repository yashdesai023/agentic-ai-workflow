import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
    return (
        <div className="container" style={{ padding: '4rem 2rem' }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}
            >
                <h1 className="text-gradient" style={{ fontSize: '3rem', marginBottom: '2rem' }}>About the Project</h1>
                <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: 1.8 }}>
                    This Agentic AI Workflow system is designed to revolutionize how we handle email communication.
                    By leveraging the power of Large Language Models (LLMs) and autonomous agents, it transforms
                    unstructured email threads into structured, actionable data.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', textAlign: 'left' }}>
                    <div className="glass-panel" style={{ padding: '2rem', borderRadius: '1rem' }}>
                        <h3 style={{ marginBottom: '1rem', color: 'var(--accent-primary)' }}>Our Mission</h3>
                        <p style={{ color: 'var(--text-muted)' }}>
                            To eliminate email overload and help professionals focus on what truly matters—executing tasks, not managing inboxes.
                        </p>
                    </div>
                    <div className="glass-panel" style={{ padding: '2rem', borderRadius: '1rem' }}>
                        <h3 style={{ marginBottom: '1rem', color: 'var(--accent-primary)' }}>Technology</h3>
                        <p style={{ color: 'var(--text-muted)' }}>
                            Built with CrewAI, FastAPI, and React. Powered by Gemini 1.5 Flash for lightning-fast reasoning.
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default About;
