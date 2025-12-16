import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader, CheckCircle, AlertCircle, Copy } from 'lucide-react';
import Recall from '../components/Recall';

const Tool = () => {
    const [emailContent, setEmailContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const handleAnalyze = async () => {
        if (!emailContent.trim()) return;

        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const response = await fetch('http://localhost:8000/analyze', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email_content: emailContent }),
            });

            if (!response.ok) {
                throw new Error('Failed to analyze email');
            }

            const data = await response.json();
            // Parse the result string if it's a string representation of a dict/json
            // The backend returns { result: str(result) }, where result is likely a CrewOutput object string representation
            // For better UX, we might need to parse this string or adjust backend to return JSON.
            // Assuming for now we display the raw text or try to parse it if possible.
            // Since the backend returns str(result), it might be unstructured text.
            // We will display it as is for now, or try to format it.

            setResult(data.result);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container" style={{ padding: '4rem 2rem' }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ maxWidth: '800px', margin: '0 auto' }}
            >
                <h1 className="text-gradient" style={{ fontSize: '3rem', textAlign: 'center', marginBottom: '1rem' }}>
                    Email Intelligence Tool
                </h1>
                <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '3rem' }}>
                    Paste your email thread below to extract tasks, summaries, and draft replies instantly.
                </p>

                <div className="glass-panel" style={{ padding: '2rem', borderRadius: '1rem' }}>
                    <textarea
                        value={emailContent}
                        onChange={(e) => setEmailContent(e.target.value)}
                        placeholder="Paste email content here..."
                        style={{
                            width: '100%',
                            minHeight: '200px',
                            background: 'rgba(0,0,0,0.3)',
                            border: '1px solid var(--border-color)',
                            borderRadius: '0.5rem',
                            padding: '1rem',
                            color: 'var(--text-primary)',
                            fontSize: '1rem',
                            resize: 'vertical',
                            marginBottom: '1.5rem',
                            fontFamily: 'inherit'
                        }}
                    />

                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <button
                            className="btn-primary"
                            onClick={handleAnalyze}
                            disabled={loading || !emailContent.trim()}
                            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', opacity: (loading || !emailContent.trim()) ? 0.7 : 1 }}
                        >
                            {loading ? <Loader className="animate-spin" size={20} /> : <Send size={20} />}
                            {loading ? 'Analyzing...' : 'Analyze Email'}
                        </button>
                    </div>
                </div>

                {error && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', borderRadius: '0.5rem', color: '#ef4444', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                    >
                        <AlertCircle size={20} />
                        {error}
                    </motion.div>
                )}

                {result && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{ marginTop: '3rem' }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                            <CheckCircle size={24} color="var(--accent-primary)" />
                            <h2 style={{ fontSize: '1.5rem' }}>Analysis Result</h2>
                        </div>

                        <div className="glass-panel" style={{ padding: '2rem', borderRadius: '1rem', whiteSpace: 'pre-wrap' }}>
                            {result}
                        </div>
                    </motion.div>
                )}

                <Recall />
            </motion.div>

            <style>{`
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
        </div>
    );
};

export default Tool;
