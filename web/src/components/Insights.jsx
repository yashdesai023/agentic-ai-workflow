import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Target, ShieldCheck } from 'lucide-react';

const Insights = () => {
    const metrics = [
        { icon: Zap, value: "1.2s", label: "Average Latency", desc: "Lightning fast processing with Gemini 1.5 Flash" },
        { icon: Target, value: "98%", label: "Task Accuracy", desc: "High precision in extracting actionable items" },
        { icon: ShieldCheck, value: "100%", label: "Secure", desc: "Enterprise-grade security with local vector storage" },
    ];

    return (
        <div style={{ padding: '4rem 0', background: 'var(--bg-secondary)' }}>
            <div className="container">
                <h2 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '3rem' }}>System Insights</h2>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    {metrics.map((metric, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2 }}
                            viewport={{ once: true }}
                            className="glass-panel"
                            style={{ padding: '2rem', borderRadius: '1rem', textAlign: 'center' }}
                        >
                            <metric.icon size={40} color="var(--accent-primary)" style={{ marginBottom: '1rem' }} />
                            <div className="text-gradient" style={{ fontSize: '3rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                                {metric.value}
                            </div>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{metric.label}</h3>
                            <p style={{ color: 'var(--text-secondary)' }}>{metric.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Insights;
