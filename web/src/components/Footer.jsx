import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
    return (
        <footer style={{ borderTop: '1px solid var(--border-color)', padding: '3rem 0', marginTop: 'auto', background: 'var(--bg-secondary)' }}>
            <div className="container">
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
                    <div style={{ display: 'flex', gap: '1.5rem' }}>
                        <a href="https://github.com/yashdesai023" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)' }}>
                            <Github size={24} />
                        </a>
                        <a href="https://www.linkedin.com/in/yash-s-desai" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)' }}>
                            <Linkedin size={24} />
                        </a>
                        <a href="mailto:desaisyash1000@gmail.com" style={{ color: 'var(--text-secondary)' }}>
                            <Mail size={24} />
                        </a>
                    </div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                        © {new Date().getFullYear()} Agentic AI Workflow. Built by Yash Desai.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
