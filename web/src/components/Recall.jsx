import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Database, Loader, AlertCircle } from 'lucide-react';

const Recall = () => {
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState(null);
    const [error, setError] = useState(null);

    const handleRecall = async () => {
        if (!query.trim()) return;

        setLoading(true);
        setError(null);
        setResults(null);

        try {
            const response = await fetch(`http://localhost:8000/recall?query=${encodeURIComponent(query)}`);

            if (!response.ok) {
                throw new Error('Failed to recall information');
            }

            const data = await response.json();
            setResults(data.result);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="glass-panel" style={{ padding: '2rem', borderRadius: '1rem', marginTop: '3rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                <Database size={24} color="var(--accent-primary)" />
                <h2 style={{ fontSize: '1.5rem' }}>Memory Recall</h2>
            </div>

            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                Search the agent's long-term memory for past context, project codes, or specific details.
            </p>

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="What is the project code?..."
                    style={{
                        flex: 1,
                        padding: '0.75rem',
                        background: 'rgba(0,0,0,0.3)',
                        border: '1px solid var(--border-color)',
                        borderRadius: '0.5rem',
                        color: 'var(--text-primary)',
                        fontSize: '1rem'
                    }}
                    onKeyDown={(e) => e.key === 'Enter' && handleRecall()}
                />
                <button
                    className="btn-secondary"
                    onClick={handleRecall}
                    disabled={loading || !query.trim()}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                >
                    {loading ? <Loader className="animate-spin" size={20} /> : <Search size={20} />}
                    Search
                </button>
            </div>

            {error && (
                <div style={{ padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', borderRadius: '0.5rem', color: '#ef4444', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <AlertCircle size={20} />
                    {error}
                </div>
            )}

            {results && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)' }}
                >
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--accent-primary)' }}>Found Context:</h3>
                    <p style={{ whiteSpace: 'pre-wrap', color: 'var(--text-secondary)' }}>
                        {results}
                    </p>
                </motion.div>
            )}
        </div>
    );
};

export default Recall;
