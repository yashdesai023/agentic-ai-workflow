import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import WorkflowDiagram from '../components/WorkflowDiagram';
import Insights from '../components/Insights';
import '../styles/animations.css';

const Home = () => {
    return (
        <div className="home-page">
            {/* Hero Section */}
            <section style={{
                minHeight: '70vh',
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
                overflow: 'hidden',
                paddingTop: '4rem'
            }}>
                {/* Background Elements */}
                <div style={{
                    position: 'absolute',
                    top: '20%',
                    right: '-10%',
                    width: '500px',
                    height: '500px',
                    background: 'var(--accent-glow)',
                    filter: 'blur(150px)',
                    borderRadius: '50%',
                    opacity: 0.2,
                    zIndex: -1
                }} />

                <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 style={{ fontSize: '4rem', marginBottom: '1.5rem', lineHeight: 1.1 }}>
                            Automate Your <br />
                            <span className="text-gradient">Email Workflow</span>
                        </h1>
                        <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '2.5rem', maxWidth: '600px' }}>
                            Transform chaotic inboxes into organized tasks. Our Agentic AI reads, understands, and acts on your emails with human-like reasoning.
                        </p>

                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <Link to="/tool" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                Try the Tool <ArrowRight size={20} />
                            </Link>
                            <Link to="/docs" className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                View Docs <Play size={20} />
                            </Link>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="animate-float"
                        style={{ position: 'relative' }}
                    >
                        <div className="glass-panel" style={{ padding: '2rem', borderRadius: '1.5rem', border: '1px solid rgba(255,255,255,0.1)' }}>
                            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
                                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ef4444' }} />
                                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#eab308' }} />
                                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#22c55e' }} />
                            </div>
                            <div style={{ fontFamily: 'monospace', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                <p><span style={{ color: '#ec4899' }}>const</span> <span style={{ color: '#3b82f6' }}>agent</span> = <span style={{ color: '#eab308' }}>new</span> Agent();</p>
                                <p><span style={{ color: '#ec4899' }}>await</span> agent.<span style={{ color: '#8b5cf6' }}>analyze</span>(email);</p>
                                <br />
                                <p style={{ color: '#10b981' }}>// Output:</p>
                                <p>{`{`}</p>
                                <p style={{ paddingLeft: '1rem' }}>summary: "Project deadline updated...",</p>
                                <p style={{ paddingLeft: '1rem' }}>tasks: ["Update roadmap", "Notify team"],</p>
                                <p style={{ paddingLeft: '1rem' }}>priority: "High"</p>
                                <p>{`}`}</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Workflow Section */}
            <section style={{ background: 'var(--bg-secondary)' }}>
                <WorkflowDiagram />
            </section>

            {/* Insights Section */}
            <Insights />
        </div>
    );
};

export default Home;
