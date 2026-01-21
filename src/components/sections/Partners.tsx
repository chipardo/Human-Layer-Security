import React from 'react';
import { Section } from '../ui/Section';

// Placeholder SVGs for logos - in a real app these would be exact brand assets
// Using distinct colors for the "hover" state to demonstrate the effect.

const PartnerLogo = ({ name, color, children }: { name: string, color: string, children: React.ReactNode }) => (
    <div className="group flex items-center justify-center p-8 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-cell">
        <div className="flex flex-col items-center gap-4">
            <div className={`w-16 h-16 ${color} transition-colors duration-500`}>
                {children}
            </div>
            <span className="font-mono text-sm font-bold tracking-widest text-gray-400 group-hover:text-white transition-colors">{name}</span>
        </div>
    </div>
);

export const Partners = () => {
    return (
        <Section id="partners" className="border-y border-white/5 bg-black">
            <div className="text-center mb-16">
                <h2 className="font-mono text-sm tracking-[0.3em] text-gray-500 mb-4">ALLIANCE NETWORK</h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <PartnerLogo name="CROWDSTRIKE" color="text-[#FC0E2C]">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                        <path d="M11.9 0l-2.6 3.1c-.8.9-1.5 2.1-1.9 3.5-.4 1.4-.4 2.8-.1 4.2.3 1.4.9 2.7 1.8 3.8l5.8-6.9H8.6l2.1-2.5 5.8 6.9h-6.3l2.1-2.5h-5.2c-.2-1.1-.1-2.3.4-3.4.4-1.1 1.1-2.1 2-2.9L11.9 0z" />
                        <path d="M12.1 24l2.6-3.1c.8-.9 1.5-2.1 1.9-3.5.4-1.4.4-2.8.1-4.2-.3-1.4-.9-2.7-1.8-3.8l-5.8 6.9h6.3l-2.1 2.5-5.8-6.9h6.3l-2.1 2.5h5.2c.2 1.1.1 2.3-.4 3.4-.4 1.1-1.1 2.1-2 2.9L12.1 24z" />
                    </svg>
                </PartnerLogo>

                <PartnerLogo name="AWS SECURITY" color="text-[#FF9900]">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                        <path d="M17.4 13h1.8v3.2h-1.8V13zm-3.6 0H16l1.3-6h-1.8l-.8 4.3-.8-4.3h-1.9l-.8 4.3-.8-4.3H8.3l1.8 8h1.8l.9-4.8.9 4.8zm-6.2 0h1.8v3.2H7.6V13zM6 13l-.9 3.2H3.3L2.4 13H.5l1.9 6h1.8L6 13h-.1zm15.4 5.3c-1.3 1-3.3 1.6-5.4 1.5-2.6 0-4.6-.7-4.6-.7l.3-1.4s1.8.6 4.1.6c1.7 0 3-.4 3.4-.7.4-.2.5-.5.5-.6 0-.6-1.5-.7-2.3-.8-1.5-.2-3.6-.6-3.6-2.6 0-1.4 1-2.3 2.8-2.6.5-.1 1.5-.1 2.5-.1 2.1 0 3.8.6 3.8.6l-.3 1.4s-1.5-.5-3.6-.5c-1.5 0-2.6.3-2.6 1 0 .6 1.8.7 2.4.8 1.5.2 3.6.6 3.6 2.6 0 1.2-.8 2.3-2.6 2.7l.1-.2z" />
                        <path d="M13.6 22.5c0-.4.3-.8.7-.8s.7.4.7.8c0 .4-.3.8-.7.8-.4 0-.7-.4-.7-.8zm5.2-1.9c-.3.2-.6.4-.9.5-1.7.9-5.1 1.7-8.1 1.6-4.5 0-8.2-2.8-8.2-2.8l.8-1.3s3.4 2.5 7.4 2.5c2.7 0 5.6-.7 7.2-1.6.3-.1.6-.3.9-.5l.9 1.6z" />
                    </svg>
                </PartnerLogo>

                <PartnerLogo name="CLOUDFLARE" color="text-[#F38020]">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                        <path d="M9.2 10.3c-.3 0-.6.1-.9.2-1.1-2.4-3.5-4-6.3-4-3.1 0-5.6 2-6.5 4.8 1.4-.2 2.7.3 3.6 1.3.8.9 1.2 2.1 1.2 3.4h14.7c1.7 0 3-1.4 3-3 0-1.7-1.3-3-3-3-.4 0-.8.1-1.1.2-.6-2.1-2.5-3.6-4.7-3.6-1.9 0-3.6 1.1-4.4 2.8h-1.6z" />
                    </svg>
                </PartnerLogo>

                <PartnerLogo name="ISO 27001" color="text-blue-500">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </PartnerLogo>
            </div>

            <div className="flex justify-center mt-12">
                <button className="text-primary text-xs font-mono border-b border-primary/50 hover:border-primary pb-1 transition-colors">
                    INITIALIZE PARTNERSHIP PROTOCOL
                </button>
            </div>
        </Section>
    );
};
