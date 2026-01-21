import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
    children: React.ReactNode;
    fullWidth?: boolean;
}

export const Section = ({ children, className, fullWidth = false, ...props }: SectionProps) => {
    return (
        <section className={cn("py-20 relative overflow-hidden", className)} {...props}>
            <div className={cn("mx-auto px-6", fullWidth ? "w-full" : "max-w-7xl")}>
                {children}
            </div>
        </section>
    );
};
