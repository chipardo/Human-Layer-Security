import React from 'react';
import { Section } from '../ui/Section';

export const Philosophy = () => {
    return (
        <Section id="philosophy" className="py-32">
            <div className="max-w-5xl mx-auto text-center">
                <blockquote className="font-serif text-3xl md:text-5xl lg:text-6xl text-white leading-tight mb-8 italic">
                    "The supreme art of war is to subdue the enemy without fighting."
                </blockquote>
                <cite className="font-mono text-primary tracking-widest not-italic">
                    — SUN TZU
                </cite>
            </div>
        </Section>
    );
};
