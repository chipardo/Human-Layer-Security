import React, { useEffect, useState, useRef } from 'react';
import { Section } from '../ui/Section';
import { motion, useInView } from 'framer-motion';

const services = [
    { title: 'Incident Management', desc: 'Rapid response teams deployed within 15 minutes of breach detection.' },
    { title: 'Crisis Negotiation', desc: 'Expert handling of ransomware situations and threat actor communication.' },
    { title: 'Preventive Training', desc: 'Immunizing your human layer against social engineering and phishing.' },
];

const Counter = ({ from, to }: { from: number; to: number }) => {
    const [count, setCount] = useState(from);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (isInView) {
            const controls = {
                value: from
            };

            const duration = 2000; // ms
            const startTime = performance.now();

            const animate = (currentTime: number) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);

                // Easing function for smooth count
                const easeOutQuart = 1 - Math.pow(1 - progress, 4);

                setCount(Math.floor(from + (to - from) * easeOutQuart));

                if (progress < 1) {
                    requestAnimationFrame(animate);
                }
            };

            requestAnimationFrame(animate);
        }
    }, [isInView, from, to]);

    return <span ref={ref}>{count}</span>;
};

export const Services = () => {
    return (
        <Section id="services">
            <div className="flex flex-col md:flex-row gap-12">
                <div className="flex-1">
                    <h2 className="font-mono text-3xl md:text-4xl text-white mb-8">// THE ARSENAL</h2>

                    <div className="grid gap-6">
                        {services.map((service, index) => (
                            <motion.div
                                key={service.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="glass-card p-8 rounded-sm border-l-4 border-l-transparent hover:border-l-primary"
                            >
                                <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                                <p className="text-gray-400 leading-relaxed text-sm md:text-base">{service.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Live Stats Module */}
                <div className="md:w-1/3">
                    <div className="sticky top-32">
                        <div className="glass-panel p-8 rounded-lg border border-primary/20 shadow-[0_0_30px_rgba(0,255,65,0.05)]">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                                <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">Live Metadata</span>
                            </div>

                            <div className="text-5xl md:text-6xl font-mono font-bold text-white mb-2">
                                <Counter from={0} to={543} />+
                            </div>
                            <p className="text-primary font-mono text-sm border-t border-white/10 pt-4 mt-2">
                                INCIDENTS RESOLVED
                            </p>
                            <div className="mt-8 space-y-2">
                                <div className="h-1 w-full bg-white/5 overflow-hidden rounded-full">
                                    <div className="h-full bg-primary w-[85%] animate-pulse" />
                                </div>
                                <div className="flex justify-between text-xs font-mono text-gray-500">
                                    <span>SUCCESS_RATE</span>
                                    <span>99.8%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    );
};
