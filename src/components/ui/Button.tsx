import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Helper for tailwind class merging
function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'solid' | 'outline' | 'ghost';
    children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'solid', children, onClick, ...props }, ref) => {

        const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
            // GA4 Tracking
            if (typeof window !== 'undefined' && window.dataLayer) {
                window.dataLayer.push({
                    'event': 'lead_generation',
                    'lead_type': 'contact_button_click'
                });
                console.log('Analytics Event: Lead Generated');
            }

            if (onClick) {
                onClick(e);
            }
        };

        const variants = {
            solid: 'bg-primary text-black hover:bg-white hover:shadow-[0_0_20px_rgba(0,255,65,0.4)] border border-transparent',
            outline: 'bg-transparent border border-primary text-primary hover:bg-primary/10 hover:shadow-[0_0_15px_rgba(0,255,65,0.2)]',
            ghost: 'bg-transparent text-gray-400 hover:text-primary hover:bg-white/5',
        };

        return (
            <button
                ref={ref}
                onClick={handleClick}
                className={cn(
                    'px-6 py-3 font-mono text-sm uppercase tracking-wider transition-all duration-300 transform active:scale-95',
                    variants[variant],
                    className
                )}
                {...props}
            >
                {children}
            </button>
        );
    }
);
