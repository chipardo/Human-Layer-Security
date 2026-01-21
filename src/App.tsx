import React, { useState, useEffect } from 'react';
import { Shield, Zap, Menu, X, CheckCircle, Globe, Lock, ArrowRight, Activity, Users, ChevronRight, Mail, Phone } from 'lucide-react';

// --- BUSINESS CONFIGURATION ---
const CONTACT_INFO = {
  email: "nicolassunobrega2@gmail.com",
  phone: "3052820302",
  phoneDisplay: "+1 (305) 282-0302",
  founder: "Nicolas Su Nobrega Garces"
};

// --- STRIPE LINKS ---
const PRICING_LINKS = {
  tier1: "https://buy.stripe.com/9B67sMafFbrq3n03aOgnK03", // Simulation Starter ($1,450)
  tier2: "https://buy.stripe.com/6oU8wQ2Ndbrqg9M26KgnK01", // Culture Shifter ($3,800)
  tier3: "https://buy.stripe.com/dRmfZigE3cvu9Lo8v8gnK02"  // Human Firewall ($7,500)
};

// --- QUOTE CONFIG ---
const INTELLECTUAL_PHRASE = {
  text: "The supreme art of war is to subdue the enemy without fighting.",
  author: "Sun Tzu, The Art of War"
};

const App = () => {
  const [view, setView] = useState('home'); // 'home', 'services', 'about', 'partnership', 'press', 'privacy', 'terms'
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigate = (newView) => {
    setView(newView);
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  };

  // --- REUSABLE COMPONENTS ---

  const PricingCards = () => (
    <div className="grid md:grid-cols-3 gap-6 items-start mt-12">
      {/* TIER 1 */}
      <div className="bg-[#0a0a0a] border border-gray-800 p-8 rounded-sm hover:border-gray-600 transition-colors">
        <h3 className="text-xl font-bold text-white">SIMULATION STARTER</h3>
        <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider">Compliance Focus</p>
        <div className="text-4xl font-bold text-white my-6">$1,450<span className="text-lg text-gray-500 font-normal">/mo</span></div>
        <ul className="space-y-4 mb-8 text-sm text-gray-400">
          <li className="flex gap-3"><CheckCircle className="w-5 h-5 text-[#00ff41]"/> Monthly Phishing Tests</li>
          <li className="flex gap-3"><CheckCircle className="w-5 h-5 text-[#00ff41]"/> Basic Reporting</li>
          <li className="flex gap-3"><CheckCircle className="w-5 h-5 text-gray-600"/> Email Support Only</li>
        </ul>
        <a href={PRICING_LINKS.tier1} className="block w-full py-4 text-center border border-gray-700 text-white hover:bg-white hover:text-black transition-all font-bold text-sm rounded-sm uppercase tracking-widest">
          Subscribe
        </a>
      </div>

      {/* TIER 2 */}
      <div className="bg-[#111] border-2 border-[#00ff41] p-8 rounded-sm relative transform md:-translate-y-4 shadow-[0_0_40px_rgba(0,255,65,0.1)]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#00ff41] text-black px-4 py-1 font-bold text-xs uppercase tracking-wider">Best Value</div>
        <h3 className="text-xl font-bold text-white">CULTURE SHIFTER</h3>
        <p className="text-xs text-[#00ff41] mt-1 uppercase tracking-wider">Full Managed Defense</p>
        <div className="text-4xl font-bold text-white my-6">$3,800<span className="text-lg text-gray-500 font-normal">/mo</span></div>
        <ul className="space-y-4 mb-8 text-sm text-gray-300">
          <li className="flex gap-3"><CheckCircle className="w-5 h-5 text-[#00ff41]"/> <strong>Weekly</strong> Simulations</li>
          <li className="flex gap-3"><CheckCircle className="w-5 h-5 text-[#00ff41]"/> Interactive Training Library</li>
          <li className="flex gap-3"><CheckCircle className="w-5 h-5 text-[#00ff41]"/> Executive Dashboard</li>
        </ul>
        <a href={PRICING_LINKS.tier2} className="block w-full py-4 text-center bg-[#00ff41] text-black hover:bg-[#00cc33] transition-all font-bold text-sm rounded-sm uppercase tracking-widest">
          Activate Plan
        </a>
      </div>

      {/* TIER 3 */}
      <div className="bg-[#0a0a0a] border border-gray-800 p-8 rounded-sm hover:border-gray-600 transition-colors">
        <h3 className="text-xl font-bold text-white">HUMAN FIREWALL</h3>
        <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider">Enterprise VIP</p>
        <div className="text-4xl font-bold text-white my-6">$7,500<span className="text-lg text-gray-500 font-normal">/mo</span></div>
        <ul className="space-y-4 mb-8 text-sm text-gray-400">
          <li className="flex gap-3"><CheckCircle className="w-5 h-5 text-[#00ff41]"/> Unlimited Simulations</li>
          <li className="flex gap-3"><CheckCircle className="w-5 h-5 text-[#00ff41]"/> Spear-Phishing (CEO Fraud)</li>
          <li className="flex gap-3"><CheckCircle className="w-5 h-5 text-[#00ff41]"/> Dedicated Security Consultant</li>
        </ul>
        <a href={PRICING_LINKS.tier3} className="block w-full py-4 text-center border border-gray-700 text-white hover:bg-white hover:text-black transition-all font-bold text-sm rounded-sm uppercase tracking-widest">
          Select Plan
        </a>
      </div>
    </div>
  );

  // --- PERSISTENT BOTTOM BAR (ALL PAGES) ---
  const StickyBottomBar = () => (
    <div className="fixed bottom-0 left-0 w-full bg-[#0a0a0a] border-t border-[#00ff41]/50 z-50 py-4 px-6 flex flex-col md:flex-row justify-between items-center shadow-[0_-5px_30px_rgba(0,255,65,0.15)]">
      <div className="mb-4 md:mb-0 text-center md:text-left flex items-center gap-3">
        <div className="w-2 h-2 bg-[#00ff41] rounded-full animate-pulse"></div>
        <div>
           <span className="text-white font-bold tracking-wider text-sm">READY TO SECURE YOUR TEAM?</span>
           <p className="text-gray-500 text-xs hidden md:block">Accepting new retainers for Q1 2026.</p>
        </div>
      </div>
      <div className="flex gap-4">
        <button onClick={() => navigate('partnership')} className="px-6 py-3 border border-gray-700 text-gray-300 hover:border-[#00ff41] hover:text-[#00ff41] transition-all text-xs font-bold uppercase tracking-wider">
          Partner With Us
        </button>
        <a href={`tel:${CONTACT_INFO.phone}`} className="px-6 py-3 bg-[#00ff41] text-black hover:bg-[#00cc33] transition-all text-xs font-bold uppercase tracking-wider flex items-center gap-2">
          <Phone size={14}/> {CONTACT_INFO.phoneDisplay}
        </a>
      </div>
    </div>
  );

  // --- NAVIGATION ---
  const Navbar = () => (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#050505]/95 backdrop-blur-md border-b border-gray-900' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        {/* LOGO - RESETS TO HOME */}
        <div className="flex items-center gap-2 cursor-pointer group" onClick={() => navigate('home')}>
          <div className="relative">
            <Shield className="w-8 h-8 text-[#00ff41] group-hover:scale-110 transition-transform" />
          </div>
          <span className="font-mono font-bold text-white tracking-tighter text-xl">HUMAN<span className="text-[#00ff41]">LAYER</span></span>
        </div>

        {/* CENTER TABS */}
        <div className="hidden md:flex items-center gap-8 font-mono text-xs tracking-widest font-bold text-gray-400">
          <button onClick={() => navigate('services')} className={`hover:text-[#00ff41] transition-colors ${view === 'services' ? 'text-[#00ff41]' : ''}`}>SERVICES</button>
          <button onClick={() => navigate('about')} className={`hover:text-[#00ff41] transition-colors ${view === 'about' ? 'text-[#00ff41]' : ''}`}>ABOUT</button>
          <button onClick={() => navigate('partnership')} className={`hover:text-[#00ff41] transition-colors ${view === 'partnership' ? 'text-[#00ff41]' : ''}`}>PARTNERSHIP</button>
          <button onClick={() => navigate('press')} className={`hover:text-[#00ff41] transition-colors ${view === 'press' ? 'text-[#00ff41]' : ''}`}>PRESS</button>
        </div>

        {/* TOP RIGHT CONTACT */}
        <a href={`mailto:${CONTACT_INFO.email}`} className="hidden md:flex px-6 py-2 border border-[#00ff41] text-[#00ff41] hover:bg-[#00ff41] hover:text-black transition-all rounded-sm font-bold text-xs tracking-widest uppercase">
          Contact Us
        </a>

        <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#050505] border-b border-gray-800 p-6 flex flex-col gap-4 font-mono text-white z-50 relative">
          <button onClick={() => navigate('services')}>SERVICES</button>
          <button onClick={() => navigate('about')}>ABOUT</button>
          <button onClick={() => navigate('partnership')}>PARTNERSHIP</button>
          <button onClick={() => navigate('press')}>PRESS</button>
          <a href={`tel:${CONTACT_INFO.phone}`} className="text-[#00ff41] font-bold">CALL US</a>
        </div>
      )}
    </nav>
  );

  // --- FOOTER ---
  const Footer = () => (
    <footer className="py-20 bg-[#050505] border-t border-gray-900 text-center md:text-left pb-32">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8 mb-8">
        <div className="col-span-1">
           <div className="flex items-center gap-2 mb-4 justify-center md:justify-start">
            <Shield className="w-6 h-6 text-[#00ff41]" />
            <span className="font-mono font-bold text-white tracking-tighter text-lg">HUMAN<span className="text-[#00ff41]">LAYER</span></span>
           </div>
           <p className="text-gray-500 text-xs">@ 2026 HumanLayer Security.<br/>Miami, FL.</p>
        </div>
        <div>
          <h4 className="text-white font-bold mb-4 font-mono text-sm">COMPANY</h4>
          <ul className="space-y-2 text-xs text-gray-500 font-mono">
            <li><button onClick={() => navigate('about')} className="hover:text-[#00ff41]">About Us</button></li>
            <li><button onClick={() => navigate('services')} className="hover:text-[#00ff41]">Services & Pricing</button></li>
            <li><button onClick={() => navigate('partnership')} className="hover:text-[#00ff41]">Partnerships</button></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-4 font-mono text-sm">LEGAL</h4>
          <ul className="space-y-2 text-xs text-gray-500 font-mono">
            <li><button onClick={() => navigate('privacy')} className="hover:text-[#00ff41]">Privacy Policy</button></li>
            <li><button onClick={() => navigate('terms')} className="hover:text-[#00ff41]">Terms & Conditions</button></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-4 font-mono text-sm">CONTACT</h4>
          <ul className="space-y-2 text-xs text-gray-500 font-mono">
            <li><a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-[#00ff41] flex items-center gap-2 justify-center md:justify-start"><Mail size={12}/> Email Team</a></li>
            <li><a href={`tel:${CONTACT_INFO.phone}`} className="hover:text-[#00ff41] flex items-center gap-2 justify-center md:justify-start"><Phone size={12}/> {CONTACT_INFO.phoneDisplay}</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );

  // --- PAGE ROUTING ---
  const renderContent = () => {

    // --- 2. SERVICES PAGE ---
    if (view === 'services') {
      return (
        <div className="pt-32 px-6 min-h-screen pb-20">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 font-mono border-l-4 border-[#00ff41] pl-6">
              SERVICES & PLANS
            </h1>
            
            {/* SERVICES LIST */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <div className="bg-[#111] p-8 border border-gray-800">
                <Shield className="w-10 h-10 text-[#00ff41] mb-4"/>
                <h3 className="text-xl font-bold text-white mb-2">Incident / Crisis Management</h3>
                <p className="text-gray-400 text-sm">Immediate containment of active threats. If you are under attack right now, call the emergency line.</p>
              </div>
              <div className="bg-[#111] p-8 border border-gray-800">
                <Users className="w-10 h-10 text-[#00ff41] mb-4"/>
                <h3 className="text-xl font-bold text-white mb-2">Ethical Phishing Training</h3>
                <p className="text-gray-400 text-sm">We hack your employees before the criminals do. Full reporting and behavioral modification.</p>
              </div>
            </div>

            {/* HOW WE WORK */}
            <div className="mb-20 bg-[#0a0a0a] p-8 border border-gray-900">
              <h2 className="text-2xl font-bold text-white mb-8 font-mono">HOW WE WORK</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {["ASSESSMENT", "SIMULATION", "TRAINING", "REPORTING"].map((step, i) => (
                  <div key={i} className="border-t-2 border-[#00ff41] pt-4">
                    <div className="text-[#00ff41] font-bold text-lg mb-1">0{i+1}</div>
                    <div className="text-white font-bold text-sm tracking-wider">{step}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* STATISTICS */}
            <div className="grid md:grid-cols-4 gap-4 mb-20">
               {[{val:"99%", lab:"Detection"}, {val:"<1hr", lab:"Response"}, {val:"500+", lab:"Simulations"}, {val:"24/7", lab:"Monitoring"}].map((stat, i) => (
                 <div key={i} className="bg-[#111] p-6 text-center border border-gray-800">
                    <div className="text-3xl font-bold text-[#00ff41] mb-1">{stat.val}</div>
                    <div className="text-gray-500 text-xs uppercase tracking-widest">{stat.lab}</div>
                 </div>
               ))}
            </div>

            {/* PRICING (Now visible on Services page too!) */}
            <h2 className="text-3xl font-bold text-white mb-8 text-center">SELECT YOUR DEFENSE LEVEL</h2>
            <PricingCards />
          </div>
        </div>
      );
    }

    // --- 3. ABOUT PAGE ---
    if (view === 'about') {
      return (
        <div className="pt-32 px-6 min-h-screen pb-20">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-white mb-12 font-mono border-l-4 border-[#00ff41] pl-6">ABOUT US</h1>
            <div className="bg-[#111] p-10 border border-gray-800 mb-12">
              <h2 className="text-2xl font-bold text-white mb-6">OUR BELIEF</h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                "We believe that the human element is both the greatest vulnerability and the strongest defense. 
                Technology can be bypassed, but a well-trained mind is adaptable. We believe in ethical hacking 
                as a force for immunity."
              </p>
            </div>
            <div className="flex flex-col md:flex-row gap-8 items-center border border-gray-800 p-8 bg-[#0a0a0a]">
              <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center text-gray-500 font-bold">NS</div>
              <div>
                <h2 className="text-2xl font-bold text-white">{CONTACT_INFO.founder}</h2>
                <div className="text-[#00ff41] font-mono text-xs mb-4 tracking-widest">FOUNDER & LEAD SECURITY ARCHITECT</div>
                <p className="text-gray-400 text-sm">
                  Cybersecurity Specialist and FIU Student. Founded Human Layer Security to bridge the gap between technical defense and human psychology.
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // --- 4. PARTNERSHIP PAGE ---
    if (view === 'partnership') {
      return (
        <div className="pt-32 px-6 min-h-screen text-center pb-20">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-white mb-8 font-mono">PARTNERSHIP</h1>
            <p className="text-xl text-gray-400 mb-12">
              We believe in the power of collaboration. Security is a team sport.
              Whether you are an MSP, a software vendor, or an insurance provider, we can align our defenses.
            </p>
            <a href={`mailto:${CONTACT_INFO.email}?subject=Partnership Inquiry`} className="inline-block px-12 py-4 bg-[#00ff41] text-black font-bold text-lg hover:bg-[#00cc33] transition-all mb-16 uppercase tracking-widest">
              Become a Partner
            </a>
            <div className="grid grid-cols-3 gap-8 opacity-40">
               <div className="flex flex-col items-center justify-center gap-2 text-white"><Globe className="w-8 h-8"/> GLOBAL</div>
               <div className="flex flex-col items-center justify-center gap-2 text-white"><Shield className="w-8 h-8"/> SECURE</div>
               <div className="flex flex-col items-center justify-center gap-2 text-white"><Users className="w-8 h-8"/> ALLIANCE</div>
            </div>
          </div>
        </div>
      );
    }

    // --- 5. PRESS PAGE ---
    if (view === 'press') {
      return (
        <div className="pt-32 px-6 min-h-screen pb-20">
           <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-white mb-8 font-mono border-l-4 border-[#00ff41] pl-6">PRESS ROOM</h1>
            <p className="text-xl text-gray-400 mb-12">
              Here you’ll find our latest news, media coverage, and press materials.
            </p>
            <div className="bg-[#111] p-8 border-l-2 border-[#00ff41] mb-8">
               <div className="text-[#00ff41] text-xs font-mono mb-2">LATEST RELEASE</div>
               <h3 className="text-xl font-bold text-white mb-2">Human Layer Security Launches in Miami</h3>
               <p className="text-gray-400 text-sm">January 2026 - Bringing military-grade ethical phishing to local businesses.</p>
            </div>
            <div className="p-8 bg-[#0a0a0a] border border-gray-800 text-center mt-12">
                <p className="text-gray-400 mb-6">For interviews, expert commentary, or additional information, please contact our team.</p>
                <a href={`mailto:${CONTACT_INFO.email}?subject=Press Inquiry`} className="inline-block px-8 py-3 border border-white text-white hover:bg-white hover:text-black font-bold transition-all uppercase text-xs tracking-widest">
                    Contact Press Team
                </a>
            </div>
           </div>
        </div>
      );
    }

    // --- 6. PRIVACY / TERMS ---
    if (view === 'privacy' || view === 'terms') {
        return (
            <div className="pt-32 px-6 min-h-screen max-w-4xl mx-auto pb-20">
                <h1 className="text-4xl font-bold text-white mb-8 font-mono">{view === 'privacy' ? 'PRIVACY POLICY' : 'TERMS AND CONDITIONS'}</h1>
                <div className="text-gray-400 space-y-4 font-mono text-sm">
                    <p>LAST UPDATED: JAN 2026</p>
                    <p>1. By using this site, you agree to our standard operating procedures.</p>
                    <p>2. We collect minimal data required for service execution.</p>
                    <p>3. Phishing simulations are conducted with full authorization.</p>
                    <p>4. For full legal text, please contact legal@{CONTACT_INFO.email.split('@')[1] || 'humanlayer.com'}</p>
                </div>
            </div>
        );
    }

    // --- 1. HOME PAGE (DEFAULT) ---
    return (
      <>
        {/* HERO SECTION */}
        <section className="relative pt-40 pb-20 px-6 min-h-screen flex items-center justify-center text-center">
            {/* Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20"></div>
            
            <div className="relative z-10 max-w-5xl mx-auto">
                <div className="inline-block border border-[#00ff41] px-4 py-1 rounded-full mb-8 bg-[#00ff41]/10">
                    <span className="text-[#00ff41] font-mono text-xs font-bold tracking-widest animate-pulse">● SYSTEM ACTIVE</span>
                </div>
                <h1 className="text-5xl md:text-8xl font-bold text-white mb-8 tracking-tighter leading-tight">
                  WHEN THE FIREWALL <br/>
                  FAILS, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ff41] to-emerald-700">WHO ANSWERS?</span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
                  Ethical Phishing & Security Training. <br/>
                  We secure the human layer.
                </p>
                <div className="flex flex-col md:flex-row justify-center gap-4">
                   <button onClick={() => {setView('home'); setTimeout(() => document.getElementById('pricing')?.scrollIntoView(), 100)}} className="px-10 py-4 bg-[#00ff41] text-black font-bold text-lg hover:bg-[#00cc33] uppercase tracking-widest">
                     View Plans
                   </button>
                   <button onClick={() => navigate('services')} className="px-10 py-4 border border-gray-700 text-white font-bold text-lg hover:border-[#00ff41] hover:text-[#00ff41] uppercase tracking-widest">
                     Our Capabilities
                   </button>
                </div>
            </div>
        </section>

        {/* HOW WE WORK */}
        <section className="py-24 bg-[#080808] border-y border-gray-900">
           <div className="max-w-7xl mx-auto px-6">
              <h2 className="text-3xl font-bold text-white mb-16 font-mono text-center tracking-widest">OPERATIONAL PROTOCOL</h2>
              <div className="grid md:grid-cols-4 gap-8">
                 {[
                    {title: "ASSESSMENT", desc: "We map your vulnerabilities.", icon: Activity},
                    {title: "SIMULATION", desc: "We deploy ethical attacks.", icon: Zap},
                    {title: "TRAINING", desc: "We educate the clickers.", icon: Users},
                    {title: "REPORTING", desc: "We prove the improvement.", icon: CheckCircle}
                 ].map((step, i) => (
                    <div key={i} className="bg-[#0a0a0a] border border-gray-800 p-8 relative group hover:border-[#00ff41] transition-all">
                        <div className="text-[#00ff41] text-6xl font-bold opacity-10 absolute top-2 right-4 group-hover:opacity-20">0{i+1}</div>
                        <step.icon className="w-8 h-8 text-[#00ff41] mb-6" />
                        <h3 className="text-xl font-bold text-white mb-2 font-mono">{step.title}</h3>
                        <p className="text-gray-400 text-sm">{step.desc}</p>
                    </div>
                 ))}
              </div>
           </div>
        </section>

        {/* SERVICES PREVIEW */}
        <section className="py-24 bg-[#050505]">
           <div className="max-w-7xl mx-auto px-6 text-center">
              <h2 className="text-3xl font-bold text-white mb-8 font-mono tracking-widest">OUR SERVICES</h2>
              <p className="text-gray-400 max-w-2xl mx-auto mb-16">
                  Comprehensive human risk management. From training to containment.
              </p>
              
              {/* Insert Pricing Cards Here for Home Page Visibility */}
              <div id="pricing">
                 <PricingCards />
              </div>
           </div>
        </section>

        {/* INCIDENT RESPONSE PARTNER */}
        <section className="py-24 bg-[#080808] text-center border-t border-gray-900">
            <h2 className="text-gray-500 font-mono text-xs tracking-[0.3em] mb-12">INCIDENT RESPONSE PARTNERS</h2>
            <div className="flex flex-wrap justify-center gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                <div className="flex items-center gap-3 text-2xl font-bold text-white"><Shield className="text-[#00ff41]"/> CROWDSTRIKE</div>
                <div className="flex items-center gap-3 text-2xl font-bold text-white"><Lock className="text-[#00ff41]"/> AWS SECURITY</div>
            </div>
        </section>

        {/* INTELLECTUAL PHRASE */}
        <section className="py-40 px-6 bg-black flex items-center justify-center text-center">
            <div className="max-w-4xl">
                <p className="text-3xl md:text-5xl font-serif text-white italic leading-tight mb-8">
                    "{INTELLECTUAL_PHRASE.text}"
                </p>
                <p className="text-[#00ff41] font-mono tracking-widest">— {INTELLECTUAL_PHRASE.author}</p>
            </div>
        </section>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-[#050505] text-gray-300 font-sans selection:bg-[#00ff41] selection:text-black">
      <Navbar />
      {renderContent()}
      <StickyBottomBar />
      <Footer />
    </div>
  );
};

export default App;
