import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Menu, X, ShieldAlert } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export const Navbar = () => {
    const [missionOpen, setMissionOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navLinks = [
        { name: 'Services', href: '#services' },
        { name: 'About', href: '#philosophy' },
        { name: 'Alliance', href: '#partners' },
        { name: 'Press', href: '#press' },
    ];

    return (
        <>
            <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    {/* Logo / Mission Trigger */}
                    <div
                        className="flex items-center gap-3 cursor-pointer group"
                        onClick={() => setMissionOpen(true)}
                    >
                        <ShieldAlert className="w-6 h-6 text-primary animate-pulse" />
                        <span className="font-mono font-bold tracking-widest text-white group-hover:text-primary transition-colors">
                            HUMAN LAYER SECURITY
                        </span>
                    </div>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="text-sm font-mono text-gray-400 hover:text-primary transition-colors"
                            >
                                {link.name}
                            </a>
                        ))}
                        <Button variant="solid" onClick={() => document.getElementById('contact')?.scrollIntoView()}>
                            Contact
                        </Button>
                    </nav>

                    {/* Mobile Toggle */}
                    <button
                        className="md:hidden text-white"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </header>

            {/* Mission Brief Modal */}
            <AnimatePresence>
                {missionOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
                        onClick={() => setMissionOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="bg-surface border border-primary/20 p-8 max-w-lg w-full relative shadow-[0_0_50px_rgba(0,255,65,0.1)]"
                            onClick={e => e.stopPropagation()}
                        >
                            <button
                                className="absolute top-4 right-4 text-gray-500 hover:text-white"
                                onClick={() => setMissionOpen(false)}
                            >
                                <X />
                            </button>
                            <h2 className="font-mono text-2xl text-primary mb-4 border-b border-primary/20 pb-2">
                // MISSION BRIEF
                            </h2>
                            <p className="font-mono text-gray-300 leading-relaxed mb-6">
                                We operate in the shadows to protect your light. When automated defenses crumble, HLS deploys elite cyber-psychology protocols to neutralize human-vector threats.
                            </p>
                            <div className="flex gap-4">
                                <div className="flex-1 bg-black/50 p-4 border border-white/5">
                                    <div className="text-2xl font-bold text-white mb-1">24/7</div>
                                    <div className="text-xs text-gray-500 uppercase">Active Monitoring</div>
                                </div>
                                <div className="flex-1 bg-black/50 p-4 border border-white/5">
                                    <div className="text-2xl font-bold text-white mb-1">Global</div>
                                    <div className="text-xs text-gray-500 uppercase">Deployment Ready</div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        className="fixed top-20 left-0 right-0 bg-background border-b border-white/10 z-40 md:hidden overflow-hidden"
                    >
                        <nav className="flex flex-col p-6 gap-4">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="font-mono text-lg text-gray-300"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </a>
                            ))}
                            <Button className="w-full mt-4">Contact Command</Button>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
