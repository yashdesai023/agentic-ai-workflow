import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Brain, ListTodo, MessageSquare, Database, ArrowRight } from 'lucide-react';

const WorkflowDiagram = () => {
    const steps = [
        { id: 1, icon: Mail, label: "Email Input", color: "#3b82f6" },
        { id: 2, icon: Brain, label: "AI Analysis", color: "#8b5cf6" },
        { id: 3, icon: ListTodo, label: "Task Extraction", color: "#ec4899" },
        { id: 4, icon: MessageSquare, label: "Reply Generation", color: "#10b981" },
        { id: 5, icon: Database, label: "Vector Memory", color: "#f59e0b" },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.3 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <div style={{ padding: '4rem 0', textAlign: 'center' }}>
            <h2 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '3rem' }}>Intelligent Workflow</h2>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: '1rem' }}
            >
                {steps.map((step, index) => (
                    <React.Fragment key={step.id}>
                        <motion.div
                            variants={itemVariants}
                            className="glass-panel"
                            style={{
                                padding: '2rem',
                                borderRadius: '1rem',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '1rem',
                                minWidth: '160px',
                                border: `1px solid ${step.color}40`,
                                boxShadow: `0 0 20px ${step.color}10`
                            }}
                        >
                            <div style={{
                                background: `${step.color}20`,
                                padding: '1rem',
                                borderRadius: '50%',
                                color: step.color
                            }}>
                                <step.icon size={32} />
                            </div>
                            <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{step.label}</span>
                        </motion.div>

                        {index < steps.length - 1 && (
                            <motion.div
                                variants={itemVariants}
                                style={{ color: 'var(--text-muted)' }}
                                className="arrow-connector"
                            >
                                <ArrowRight size={24} />
                            </motion.div>
                        )}
                    </React.Fragment>
                ))}
            </motion.div>

            <style>{`
        @media (max-width: 1024px) {
          .arrow-connector { transform: rotate(90deg); margin: 1rem 0; }
          div[style*="flex-wrap: wrap"] { flex-direction: column; }
        }
      `}</style>
        </div>
    );
};

export default WorkflowDiagram;
