import React, { useState, useEffect } from 'react';
import { Shield, Lock, Zap, Menu, X, CheckCircle, ArrowRight, MousePointer, AlertTriangle, FileText, ChevronLeft, Globe } from 'lucide-react';

// --- CONFIGURATION ---
const CONTACT_INFO = {
  email: "nicolassunobrega2@gmail.com",
  phone: "3052820302"
};

// --- STRIPE LINKS (CONNECTED) ---
const PRICING_LINKS = {
  tier1: "https://buy.stripe.com/9B67sMafFbrq3n03aOgnK03", // Simulation Starter
  tier2: "https://buy.stripe.com/6oU8wQ2Ndbrqg9M26KgnK01", // Culture Shifter
  tier3: "https://buy.stripe.com/dRmfZigE3cvu9Lo8v8gnK02"  // Human Firewall VIP
};

// --- PAGES COMPONENT (ROUTER) ---
const App = () => {
  const [view, setView] = useState('home'); // 'home', 'privacy', 'terms'
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [phishDemo, setPhishDemo] = useState('idle'); // 'idle', 'clicked'

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- NAVIGATION ---
  const Navbar = () => (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#050505]/95 backdrop-blur-md border-b border-gray-900' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('home')}>
          <div className="relative">
            <Shield className="w-8 h-8 text-[#00ff41]" />
            <div className="absolute inset-0 bg-[#00ff41] blur-md opacity-20"></div>
          </div>
          <span className="font-mono font-bold text-white tracking-tighter text-xl">HUMAN<span className="text-[#00ff41]">LAYER</span></span>
        </div>

        <div className="hidden md:flex items-center gap-8 font-mono text-xs tracking-widest font-bold text-gray-400">
          <button onClick={() => setView('home')} className="hover:text-[#00ff41] transition-colors">TRAINING</button>
          <button onClick={() => {setView('home'); setTimeout(() => document.getElementById('pricing')?.scrollIntoView(), 100)}} className="hover:text-[#00ff41] transition-colors">PLANS</button>
          <a href={`mailto:${CONTACT_INFO.email}`} className="px-6 py-2 border border-[#00ff41] text-[#00ff41] hover:bg-[#00ff41] hover:text-black transition-all rounded-sm">
            BOOK DEMO
          </a>
        </div>

        <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>
    </nav>
  );

  // --- FOOTER ---
  const Footer = () => (
    <footer className="py-12 bg-[#050505] border-t border-gray-900 text-center md:text-left relative z-10">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8 mb-8">
        <div className="col-span-1">
            <span className="font-mono font-bold text-white tracking-tighter text-lg">HUMAN<span className="text-[#00ff41]">LAYER</span></span>
            <p className="text-gray-500 text-sm mt-4">We hack your employees before the real hackers do.</p>
        </div>
        <div>
          <h4 className="text-white font-bold mb-4 font-mono">LEGAL</h4>
          <ul className="space-y-2 text-sm text-gray-500">
            <li><button onClick={() => {setView('privacy'); window.scrollTo(0,0)}} className="hover:text-[#00ff41]">Privacy Policy</button></li>
            <li><button onClick={() => {setView('terms'); window.scrollTo(0,0)}} className="hover:text-[#00ff41]">Terms of Service</button></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-4 font-mono">CONTACT</h4>
          <ul className="space-y-2 text-sm text-gray-500">
            <li>{CONTACT_INFO.email}</li>
            <li>Miami, FL</li>
          </ul>
        </div>
      </div>
      <div className="text-center text-gray-600 text-xs font-mono pt-8 border-t border-gray-900">
        © 2026 HUMAN LAYER SECURITY.
      </div>
    </footer>
  );

  // --- VIEW: PRIVACY POLICY ---
  if (view === 'privacy') {
    return (
      <div className="min-h-screen bg-[#050505] text-gray-300 font-sans">
        <Navbar />
        <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
          <button onClick={() => setView('home')} className="flex items-center text-[#00ff41] mb-8 hover:underline"><ChevronLeft className="w-4 h-4" /> Back to Home</button>
          <h1 className="text-4xl font-bold text-white mb-8">Privacy Policy</h1>
          <div className="prose prose-invert prose-green">
            <p>Last Updated: January 2026</p>
            <p>At Human Layer Security, we take privacy seriously. We simulate breaches; we don't cause them.</p>
            <h3>1. Information We Collect</h3>
            <p>We collect information necessary to provide our training services, including employee email addresses (for simulation purposes only) and performance metrics.</p>
            <h3>2. How We Use Data</h3>
            <p>Data is used exclusively to generate training reports and improve your organization's security posture. We never sell data.</p>
            <h3>3. Contact</h3>
            <p>For privacy concerns, contact {CONTACT_INFO.email}.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // --- VIEW: TERMS OF SERVICE ---
  if (view === 'terms') {
    return (
      <div className="min-h-screen bg-[#050505] text-gray-300 font-sans">
        <Navbar />
        <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
          <button onClick={() => setView('home')} className="flex items-center text-[#00ff41] mb-8 hover:underline"><ChevronLeft className="w-4 h-4" /> Back to Home</button>
          <h1 className="text-4xl font-bold text-white mb-8">Terms of Service</h1>
          <div className="prose prose-invert prose-green">
            <p>By using Human Layer Security's services, you agree to these terms.</p>
            <h3>1. Authorization</h3>
            <p>You verify that you own the domain(s) you are asking us to target for ethical phishing simulations.</p>
            <h3>2. Liability</h3>
            <p>Our simulations are safe. However, Human Layer Security is not liable for any misunderstanding caused by employees who fail to recognize the simulation.</p>
            <h3>3. Payments</h3>
            <p>Subscriptions are billed monthly via Stripe. You may cancel at any time with 30 days notice.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // --- VIEW: HOME (MAIN SITE) ---
  return (
    <div className="min-h-screen bg-[#050505] text-gray-300 font-sans selection:bg-[#00ff41] selection:text-black">
      <Navbar />

      {/* --- HERO: INTERACTIVE --- */}
      <section className="relative pt-40 pb-20 px-6 min-h-[90vh] flex flex-col items-center justify-center overflow-hidden">
        {/* Animated Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20"></div>
        
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          
          <h1 className="text-5xl md:text-8xl font-bold text-white mb-6 tracking-tight leading-none">
            DON'T LET THEM <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ff41] to-emerald-700">CLICK THE LINK</span>
          </h1>
          
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            We turn your employees from your biggest liability into your strongest firewall. 
            Fun, interactive ethical phishing that actually changes behavior.
          </p>

          {/* INTERACTIVE DEMO CARD */}
          <div className="max-w-md mx-auto bg-[#111] border border-gray-800 rounded-lg p-6 mb-12 transform hover:scale-105 transition-all duration-300 shadow-2xl">
            {phishDemo === 'idle' ? (
              <>
                <div className="flex items-center gap-3 mb-4 border-b border-gray-800 pb-3">
                  <div className="w-8 h-8 bg-red-500/10 rounded-full flex items-center justify-center text-red-500"><AlertTriangle size={16}/></div>
                  <div className="text-left">
                    <div className="text-white font-bold text-sm">Urgent: Payroll Update Required</div>
                    <div className="text-gray-500 text-xs">From: hr-support@googIe.com</div>
                  </div>
                </div>
                <p className="text-left text-gray-400 text-sm mb-4">"Please click below to verify your salary details immediately."</p>
                <button 
                  onClick={() => setPhishDemo('clicked')}
                  className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-bold text-sm flex items-center justify-center gap-2"
                >
                  <MousePointer size={14}/> CLICK TO VERIFY
                </button>
              </>
            ) : (
              <div className="text-center py-4">
                <div className="inline-block p-4 bg-[#00ff41]/10 rounded-full mb-2">
                  <Lock className="w-8 h-8 text-[#00ff41]" />
                </div>
                <h3 className="text-white font-bold text-lg">You just got phished!</h3>
                <p className="text-gray-400 text-sm mt-2">See how easy it is? Your employees do this every day.</p>
                <button 
                  onClick={() => setPhishDemo('idle')}
                  className="mt-4 text-[#00ff41] text-xs font-mono hover:underline"
                >
                  RESET SIMULATION
                </button>
              </div>
            )}
          </div>

          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a 
              href="#pricing"
              className="group px-8 py-4 bg-[#00ff41] text-black font-bold text-lg hover:bg-[#00cc33] transition-all flex items-center justify-center gap-2 rounded-sm"
            >
              START TRAINING NOW <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* --- HOW IT WORKS (FUN & SIMPLE) --- */}
      <section className="py-24 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">HOW WE FIX THE HUMAN BUG</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div className="relative">
              <div className="w-16 h-16 mx-auto bg-[#111] border border-[#00ff41] rounded-full flex items-center justify-center mb-6 text-[#00ff41] font-bold text-2xl">1</div>
              <h3 className="text-xl font-bold text-white mb-2">We Send the Bait</h3>
              <p className="text-gray-400">We send harmless simulated attacks that look exactly like the real thing (Netflix, HR, Microsoft).</p>
            </div>
            <div className="relative">
              <div className="w-16 h-16 mx-auto bg-[#111] border border-[#00ff41] rounded-full flex items-center justify-center mb-6 text-[#00ff41] font-bold text-2xl">2</div>
              <h3 className="text-xl font-bold text-white mb-2">They Click (Oops)</h3>
              <p className="text-gray-400">If they fall for it, they are instantly redirected to a 60-second fun training video. No shame, just learning.</p>
            </div>
            <div className="relative">
              <div className="w-16 h-16 mx-auto bg-[#111] border border-[#00ff41] rounded-full flex items-center justify-center mb-6 text-[#00ff41] font-bold text-2xl">3</div>
              <h3 className="text-xl font-bold text-white mb-2">You Get the Stats</h3>
              <p className="text-gray-400">Watch your "Click Rate" drop from 30% to 2% in weeks. Show the report to your boss.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- PRICING (REBRANDED) --- */}
      <section id="pricing" className="py-24 px-6 relative bg-[#050505] border-t border-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">TRAINING PACKAGES</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Simple monthly pricing. Cancel anytime.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 items-start">
            {/* TIER 1 */}
            <div className="bg-[#0a0a0a] border border-gray-800 p-8 rounded-sm hover:border-gray-600 transition-colors">
              <h3 className="text-xl font-bold text-white">SIMULATION STARTER</h3>
              <div className="text-4xl font-bold text-white my-6">$1,450<span className="text-lg text-gray-500 font-normal">/mo</span></div>
              <ul className="space-y-4 mb-8 text-sm text-gray-400">
                <li className="flex gap-3"><CheckCircle className="w-5 h-5 text-[#00ff41]"/> Monthly Phishing Tests</li>
                <li className="flex gap-3"><CheckCircle className="w-5 h-5 text-[#00ff41]"/> Basic Reporting</li>
                <li className="flex gap-3"><CheckCircle className="w-5 h-5 text-gray-600"/> Email Support Only</li>
              </ul>
              <a href={PRICING_LINKS.tier1} className="block w-full py-4 text-center border border-gray-700 text-white hover:bg-white hover:text-black transition-all font-bold text-sm rounded-sm">
                START TESTING
              </a>
            </div>

            {/* TIER 2 */}
            <div className="bg-[#111] border-2 border-[#00ff41] p-8 rounded-sm relative transform md:-translate-y-4 shadow-[0_0_40px_rgba(0,255,65,0.1)]">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#00ff41] text-black px-4 py-1 font-bold text-xs uppercase tracking-wider">Most Popular</div>
              <h3 className="text-xl font-bold text-white">CULTURE SHIFTER</h3>
              <div className="text-4xl font-bold text-white my-6">$3,800<span className="text-lg text-gray-500 font-normal">/mo</span></div>
              <ul className="space-y-4 mb-8 text-sm text-gray-300">
                <li className="flex gap-3"><CheckCircle className="w-5 h-5 text-[#00ff41]"/> <strong>Weekly</strong> Simulations</li>
                <li className="flex gap-3"><CheckCircle className="w-5 h-5 text-[#00ff41]"/> "The Click" Training Video Library</li>
                <li className="flex gap-3"><CheckCircle className="w-5 h-5 text-[#00ff41]"/> Executive Dashboard</li>
              </ul>
              <a href={PRICING_LINKS.tier2} className="block w-full py-4 text-center bg-[#00ff41] text-black hover:bg-[#00cc33] transition-all font-bold text-sm rounded-sm">
                TRANSFORM CULTURE
              </a>
            </div>

            {/* TIER 3 */}
            <div className="bg-[#0a0a0a] border border-gray-800 p-8 rounded-sm hover:border-gray-600 transition-colors">
              <h3 className="text-xl font-bold text-white">HUMAN FIREWALL</h3>
              <div className="text-4xl font-bold text-white my-6">$7,500<span className="text-lg text-gray-500 font-normal">/mo</span></div>
              <ul className="space-y-4 mb-8 text-sm text-gray-400">
                <li className="flex gap-3"><CheckCircle className="w-5 h-5 text-[#00ff41]"/> Unlimited Simulations</li>
                <li className="flex gap-3"><CheckCircle className="w-5 h-5 text-[#00ff41]"/> Spear-Phishing (CEO Fraud)</li>
                <li className="flex gap-3"><CheckCircle className="w-5 h-5 text-[#00ff41]"/> Dedicated Security Consultant</li>
              </ul>
              <a href={PRICING_LINKS.tier3} className="block w-full py-4 text-center border border-gray-700 text-white hover:bg-white hover:text-black transition-all font-bold text-sm rounded-sm">
                CONTACT SALES
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* --- TRUST BADGES --- */}
      <section className="py-20 bg-black text-center border-t border-gray-900">
        <p className="text-gray-600 font-mono text-xs mb-8 tracking-[0.3em]">INTEGRATED TRAINING STANDARDS</p>
        <div className="flex flex-wrap justify-center gap-12 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
          <div className="text-xl font-bold text-white flex items-center gap-2"><Globe className="w-6 h-6"/> NIST FRAMEWORK</div>
          <div className="text-xl font-bold text-white flex items-center gap-2"><Lock className="w-6 h-6"/> SOC2 COMPLIANT</div>
          <div className="text-xl font-bold text-white flex items-center gap-2"><Shield className="w-6 h-6"/> GDPR READY</div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default App;
