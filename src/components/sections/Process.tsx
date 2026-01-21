import React from 'react';
import { Section } from '../ui/Section';
import { Radar, Lock, Crosshair, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const steps = [
    { id: 1, title: 'Detect', icon: Radar, desc: 'Real-time threat vector identification.' },
    { id: 2, title: 'Isolate', icon: Lock, desc: 'Immediate containment of compromised assets.' },
    { id: 3, title: 'Neutralize', icon: Crosshair, desc: 'Active threat elimination and expulsion.' },
    { id: 4, title: 'Fortify', icon: Shield, desc: 'Post-incident hardening and resilience.' },
];

export const Process = () => {
    return (
        <Section id="process" className="bg-surface/30">
            <div className="mb-16">
                <h2 className="font-mono text-3xl md:text-4xl text-white mb-2">// OPERATIONAL PROTOCOL</h2>
                <div className="h-1 w-20 bg-primary shadow-[0_0_10px_rgba(0,255,65,0.5)]" />
            </div>

            <div className="relative max-w-3xl mx-auto">
                {/* Vertical Line */}
                <div className="absolute left-[27px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 via-primary/20 to-transparent" />

                <div className="space-y-12">
                    {steps.map((step, index) => (
                        <motion.div
                            key={step.id}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="relative pl-24 group"
                        >
                            {/* Node on line */}
                            <div className="absolute left-0 top-1 w-14 h-14 bg-background border border-white/10 rounded-full flex items-center justify-center z-10 group-hover:border-primary group-hover:shadow-[0_0_20px_rgba(0,255,65,0.3)] transition-all">
                                <step.icon className="w-6 h-6 text-gray-400 group-hover:text-primary transition-colors" />
                            </div>

                            {/* Content */}
                            <div className="glass-card p-6 rounded-lg pointer-events-none group-hover:bg-primary/5 transition-colors">
                                <h3 className="font-mono text-xl text-primary mb-2">0{step.id} // {step.title}</h3>
                                <p className="text-gray-400 font-sans">{step.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </Section>
    );
};
