import React from 'react';
import { Section } from '../ui/Section';
import { Button } from '../ui/Button';

export const Press = () => {
    return (
        <Section id="press" className="bg-surface/20">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                <h2 className="font-mono text-3xl md:text-4xl text-white">// INTELLIGENCE & MEDIA</h2>
                <Button variant="ghost" className="hidden md:block">View All Coverage</Button>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="group cursor-pointer">
                        <div className="h-48 bg-white/5 mb-4 border border-white/10 group-hover:border-primary/50 transition-all overflow-hidden relative">
                            <div className="absolute inset-0 bg-primary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                        </div>
                        <div className="text-xs font-mono text-primary mb-2">CYBER DEFENSE MAGAZINE</div>
                        <h3 className="text-lg text-white font-bold leading-tight group-hover:text-primary transition-colors">
                            The Human Firewall: Why Tech Stacks Aren't Enough
                        </h3>
                    </div>
                ))}
            </div>

            <div className="mt-16 pt-8 border-t border-white/5 text-center">
                <p className="text-gray-500 font-mono text-sm">For expert commentary, contact our media team.</p>
            </div>
        </Section>
    );
};
