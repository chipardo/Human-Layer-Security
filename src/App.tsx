import React, { useState, useEffect } from 'react';
import { Shield, Lock, Crosshair, Menu, X, Activity, Users, Globe, Zap, CheckCircle } from 'lucide-react';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // --- BUSINESS CONFIGURATION ---
  const CONTACT_INFO = {
    email: "nicolassunobrega2@gmail.com",
    phone: "3052820302", 
    phoneDisplay: "+1 (305) 282-0302"
  };

  // --- YOUR STRIPE LINKS (ALREADY CONNECTED) ---
  const PRICING_LINKS = {
    tier1: "https://buy.stripe.com/9B67sMafFbrq3n03aOgnK03", // Compliance Core
    tier2: "https://buy.stripe.com/6oU8wQ2Ndbrqg9M26KgnK01", // Active Defense
    tier3: "https://buy.stripe.com/dRmfZigE3cvu9Lo8v8gnK02"  // War Room VIP
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-gray-300 font-sans selection:bg-[#00ff41] selection:text-black">
      
      {/* --- NAVIGATION --- */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#050505]/95 backdrop-blur-md border-b border-gray-900' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
            <div className="relative">
              <Shield className="w-8 h-8 text-[#00ff41]" />
              <div className="absolute inset-0 bg-[#00ff41] blur-md opacity-20"></div>
            </div>
            <span className="font-mono font-bold text-white tracking-tighter text-xl">HUMAN<span className="text-[#00ff41]">LAYER</span></span>
          </div>

          <div className="hidden md:flex items-center gap-8 font-mono text-xs tracking-widest font-bold">
            <a href="#services" className="hover:text-[#00ff41] transition-colors">CAPABILITIES</a>
            <a href="#pricing" className="hover:text-[#00ff41] transition-colors">RETAINERS</a>
            <a href="#about" className="hover:text-[#00ff41] transition-colors">INTEL</a>
            <a 
              href={`tel:${CONTACT_INFO.phone}`}
              className="px-6 py-2 border border-[#00ff41] text-[#00ff41] bg-[#00ff41]/5 hover:bg-[#00ff41] hover:text-black transition-all"
            >
              EMERGENCY: {CONTACT_INFO.phoneDisplay}
            </a>
          </div>

          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-40 pb-20 px-6 min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20"></div>
        
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-red-950/30 border border-red-900/50 mb-8 animate-fade-in-up">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <span className="text-xs font-mono text-red-500 tracking-[0.2em] uppercase font-bold">Current Threat Level: Critical</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-bold text-white mb-8 tracking-tight leading-none">
            HUMAN RISK <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ff41] to-emerald-700">MANAGEMENT</span>
          </h1>
          
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            We are the Incident Response Partner that prevents the incident in the first place. 
            Behavioral training met with military-grade response protocols.
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a 
              href={`tel:${CONTACT_INFO.phone}`}
              className="group px-8 py-4 bg-[#00ff41] text-black font-bold text-lg hover:bg-[#00cc33] transition-all flex items-center justify-center gap-2"
            >
              <Zap className="w-5 h-5 group-hover:fill-black" />
              DEPLOY RESPONSE TEAM
            </a>
            <a 
              href="#pricing"
              className="px-8 py-4 border border-gray-800 bg-[#111] text-white font-bold text-lg hover:border-[#00ff41] hover:text-[#00ff41] transition-all"
            >
              VIEW RETAINER PLANS
            </a>
          </div>
        </div>
      </section>

      {/* --- SERVICES --- */}
      <section id="services" className="py-24 bg-[#080808] border-t border-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-10 bg-[#0a0a0a] border border-gray-800 hover:border-[#00ff41] transition-all group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Shield className="w-32 h-32 text-[#00ff41]" />
              </div>
              <Shield className="w-12 h-12 text-[#00ff41] mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">Incident Response</h3>
              <p className="text-gray-400 leading-relaxed">
                When the breach happens, we don't just advise. We contain, eradicate, and restore. 24/7/365 availability for retainer clients.
              </p>
            </div>
            
            <div className="p-10 bg-[#0a0a0a] border border-gray-800 hover:border-[#00ff41] transition-all group relative overflow-hidden">
              <Activity className="w-12 h-12 text-[#00ff41] mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">Human Layer Training</h3>
              <p className="text-gray-400 leading-relaxed">
                Sophisticated phishing simulations and training that actually changes behavior. We turn your weakest link into your strongest sensor.
              </p>
            </div>

            <div className="p-10 bg-[#0a0a0a] border border-gray-800 hover:border-[#00ff41] transition-all group relative overflow-hidden">
              <Lock className="w-12 h-12 text-[#00ff41] mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">Compliance & Audit</h3>
              <p className="text-gray-400 leading-relaxed">
                Get the checkmark for cyber insurance, SOC2, and HIPAA. We manage the paperwork and the proof.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- PRICING (STRIPE CONNECTED) --- */}
      <section id="pricing" className="py-24 px-6 relative bg-[#050505]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">DEFENSE RETAINERS</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Secure your spot in our response queue. Prices reflect 2026 Market Standards.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 items-start">
            {/* TIER 1: COMPLIANCE */}
            <div className="bg-[#0a0a0a] border border-gray-800 p-8 rounded-sm hover:border-gray-600 transition-colors">
              <div className="mb-4">
                <h3 className="text-xl font-bold text-white">COMPLIANCE CORE</h3>
                <p className="text-gray-500 text-sm mt-1">For Insurance Requirements</p>
              </div>
              <div className="text-4xl font-bold text-white mb-8">$1,450<span className="text-lg text-gray-500 font-normal">/mo</span></div>
              
              <ul className="space-y-4 mb-8 text-sm text-gray-400">
                <li className="flex gap-3"><CheckCircle className="w-5 h-5 text-gray-600"/> 9-5 Incident Hotline</li>
                <li className="flex gap-3"><CheckCircle className="w-5 h-5 text-[#00ff41]"/> Monthly Phishing Tests</li>
                <li className="flex gap-3"><CheckCircle className="w-5 h-5 text-[#00ff41]"/> Basic Quarterly Reporting</li>
                <li className="flex gap-3"><CheckCircle className="w-5 h-5 text-gray-600"/> Discounted IR Hourly Rate</li>
              </ul>
              <a href={PRICING_LINKS.tier1} className="block w-full py-4 text-center border border-gray-700 text-white hover:bg-white hover:text-black transition-all font-bold tracking-widest text-sm">
                SUBSCRIBE NOW
              </a>
            </div>

            {/* TIER 2: ACTIVE DEFENSE (HIGHLIGHTED) */}
            <div className="bg-[#111] border-2 border-[#00ff41] p-8 rounded-sm relative transform md:-translate-y-4 shadow-[0_0_40px_rgba(0,255,65,0.1)]">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#00ff41] text-black px-4 py-1 font-bold text-xs uppercase tracking-wider">Recommended</div>
              <div className="mb-4">
                <h3 className="text-xl font-bold text-white">ACTIVE DEFENSE</h3>
                <p className="text-[#00ff41] text-sm mt-1">Full-Service Protection</p>
              </div>
              <div className="text-4xl font-bold text-white mb-8">$3,800<span className="text-lg text-gray-500 font-normal">/mo</span></div>
              
              <ul className="space-y-4 mb-8 text-sm text-gray-300">
                <li className="flex gap-3"><CheckCircle className="w-5 h-5 text-[#00ff41]"/> <strong>24/7 Priority Hotline</strong></li>
                <li className="flex gap-3"><CheckCircle className="w-5 h-5 text-[#00ff41]"/> Weekly Phishing & Training</li>
                <li className="flex gap-3"><CheckCircle className="w-5 h-5 text-[#00ff41]"/> Weekly Threat Hunting Logs</li>
                <li className="flex gap-3"><CheckCircle className="w-5 h-5 text-[#00ff41]"/> <strong>20 Hours IR Included</strong></li>
              </ul>
              <a href={PRICING_LINKS.tier2} className="block w-full py-4 text-center bg-[#00ff41] text-black hover:bg-[#00cc33] transition-all font-bold tracking-widest text-sm">
                INITIATE DEFENSE
              </a>
            </div>

            {/* TIER 3: WAR ROOM */}
            <div className="bg-[#0a0a0a] border border-gray-800 p-8 rounded-sm hover:border-gray-600 transition-colors">
              <div className="mb-4">
                <h3 className="text-xl font-bold text-white">WAR ROOM VIP</h3>
                <p className="text-gray-500 text-sm mt-1">High-Risk Environments</p>
              </div>
              <div className="text-4xl font-bold text-white mb-8">$7,500<span className="text-lg text-gray-500 font-normal">/mo</span></div>
              
              <ul className="space-y-4 mb-8 text-sm text-gray-400">
                <li className="flex gap-3"><CheckCircle className="w-5 h-5 text-[#00ff41]"/> Dedicated Slack Channel</li>
                <li className="flex gap-3"><CheckCircle className="w-5 h-5 text-[#00ff41]"/> Unlimited IR Response</li>
                <li className="flex gap-3"><CheckCircle className="w-5 h-5 text-[#00ff41]"/> Quarterly Penetration Test</li>
                <li className="flex gap-3"><CheckCircle className="w-5 h-5 text-[#00ff41]"/> Executive OSINT Scrub</li>
              </ul>
              {/* This link now goes to Stripe Payment Page for $7,500 */}
              <a href={PRICING_LINKS.tier3} className="block w-full py-4 text-center border border-gray-700 text-white hover:bg-white hover:text-black transition-all font-bold tracking-widest text-sm">
                JOIN WAR ROOM
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* --- TRUST BADGES --- */}
      <section className="py-20 bg-black text-center border-t border-gray-900">
        <p className="text-gray-600 font-mono text-xs mb-8 tracking-[0.3em]">INTEGRATED TECHNOLOGIES & STANDARDS</p>
        <div className="flex flex-wrap justify-center gap-12 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
          <div className="text-xl font-bold text-white flex items-center gap-2"><Globe className="w-6 h-6"/> ISO 27001</div>
          <div className="text-xl font-bold text-white flex items-center gap-2"><Lock className="w-6 h-6"/> SOC2 TYPE II</div>
          <div className="text-xl font-bold text-white flex items-center gap-2"><Shield className="w-6 h-6"/> CROWDSTRIKE</div>
          <div className="text-xl font-bold text-white flex items-center gap-2"><Users className="w-6 h-6"/> KNOWBE4 PARTNER</div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-12 bg-[#050505] border-t border-gray-900 text-center md:text-left">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1">
             <span className="font-mono font-bold text-white tracking-tighter text-lg">HUMAN<span className="text-[#00ff41]">LAYER</span></span>
             <p className="text-gray-500 text-sm mt-4">Defending the human element of your security infrastructure.</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 font-mono">LEGAL</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="#" className="hover:text-[#00ff41]">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-[#00ff41]">Terms of Service</a></li>
              <li><a href="#" className="hover:text-[#00ff41]">SLA Agreement</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 font-mono">CONTACT</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>{CONTACT_INFO.email}</li>
              <li>{CONTACT_INFO.phoneDisplay}</li>
              <li>Miami, FL</li>
            </ul>
          </div>
        </div>
        <div className="text-center text-gray-600 text-xs font-mono pt-8 border-t border-gray-900">
          © 2026 HUMAN LAYER SECURITY. ALL SYSTEMS NOMINAL.
        </div>
      </footer>
    </div>
  );
};

export default App;
