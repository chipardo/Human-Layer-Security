import React from 'react';
import { Button } from '../ui/Button';

export const OpsBar = () => {
    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-t border-primary/20 h-16 md:h-20 flex items-center justify-between px-4 md:px-8 shadow-[0_-5px_20px_rgba(0,0,0,0.5)]">
            <div className="hidden md:flex flex-col">
                <span className="font-mono text-xs text-primary animate-pulse">● SYSTEM ACTIVE</span>
                <span className="font-mono text-sm font-bold tracking-widest text-white">SECURE YOUR INFRASTRUCTURE</span>
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto justify-end">
                <Button variant="outline" className="hidden sm:block text-xs md:text-sm">
                    Partner With Us
                </Button>
                <Button
                    variant="solid"
                    className="w-full sm:w-auto text-xs md:text-sm shadow-[0_0_15px_rgba(0,255,65,0.3)]"
                    onClick={() => document.getElementById('contact')?.scrollIntoView()}
                >
                    Contact Command
                </Button>
            </div>
        </div>
    );
};
