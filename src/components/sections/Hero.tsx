import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section } from '../ui/Section';
import { Activity } from 'lucide-react';

export const Hero = () => {
    const [expanded, setExpanded] = useState(false);

    return (
        <Section className="h-screen flex flex-col items-center justify-center relative overflow-hidden" id="hero">
            {/* Background Grid Effect */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#121212_1px,transparent_1px),linear-gradient(to_bottom,#121212_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] z-0 opacity-20 pointer-events-none" />

            <div className="z-10 flex flex-col items-center">
                <AnimatePresence mode="wait">
                    {!expanded ? (
                        <motion.div
                            key="node"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 1.5, opacity: 0 }}
                            whileHover={{ scale: 1.1 }}
                            onClick={() => setExpanded(true)}
                            className="cursor-pointer group relative"
                        >
                            {/* Pulsing Rings */}
                            <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
                            <div className="absolute -inset-4 rounded-full bg-primary/10 animate-pulse duration-1000" />

                            <div className="relative w-24 h-24 rounded-full bg-black border-2 border-primary flex items-center justify-center shadow-[0_0_30px_rgba(0,255,65,0.4)] group-hover:shadow-[0_0_50px_rgba(0,255,65,0.6)] transition-all duration-500">
                                <Activity className="w-10 h-10 text-primary" />
                            </div>

                            <div className="mt-8 text-center">
                                <p className="font-mono text-xs text-primary/60 tracking-[0.2em] animate-pulse">INITIATE PROTOCOL</p>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="content"
                            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="text-center max-w-4xl px-4"
                        >
                            <h1 className="font-mono text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50">
                                When the automated walls fail, <br />
                                <span className="text-primary inline-block relative">
                                    who stands in the gap?
                                    <span className="absolute -bottom-2 left-0 w-full h-1 bg-primary/50 blur-sm" />
                                </span>
                            </h1>
                            <p className="font-mono text-lg md:text-xl text-gray-400 tracking-wide">
                                Elite Incident Response & Crisis Management.
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </Section>
    );
};
