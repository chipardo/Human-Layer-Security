import React from 'react';
import { Navbar } from './components/layout/Navbar';
import { OpsBar } from './components/layout/OpsBar';
import { Hero } from './components/sections/Hero';
import { Process } from './components/sections/Process';
import { Services } from './components/sections/Services';
import { Partners } from './components/sections/Partners';
import { Philosophy } from './components/sections/Philosophy';
import { Press } from './components/sections/Press';
import { Section } from './components/ui/Section';
import { Button } from './components/ui/Button';

function App() {
    return (
        <div className="bg-background min-h-screen">
            <Navbar />

            <main>
                <Hero />
                <Process />
                <Services />
                <Partners />
                <Philosophy />
                <Press />

                {/* Contact Section Anchor */}
                <Section id="contact" className="py-32 flex flex-col items-center justify-center text-center bg-gradient-to-t from-primary/10 to-transparent">
                    <h2 className="font-mono text-4xl md:text-5xl text-white mb-6">SECURE YOUR FUTURE</h2>
                    <p className="text-gray-400 max-w-xl mb-8">
                        Initiate a confidential consultation with our incident response architects.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button className="w-full sm:w-auto">Initialize Protocol</Button>
                        <Button variant="outline" className="w-full sm:w-auto">Download Briefing</Button>
                    </div>
                </Section>
            </main>

            <OpsBar />
        </div>
    );
}

export default App;
