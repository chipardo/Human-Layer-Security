import React, { useState, useEffect } from 'react';
import { Shield, Zap, Menu, X, CheckCircle, Globe, Lock, ArrowRight, TrendingUp, Users, Activity, ChevronRight } from 'lucide-react';

// --- CONFIGURATION ---
const CONTACT_INFO = {
  email: "nicolassunobrega2@gmail.com",
  phone: "3052820302",
  founder: "Nicolas Su Nobrega Garces"
};

// --- STRIPE LINKS (YOUR SPECIFIC LINKS) ---
const PRICING_LINKS = {
  tier1: "https://buy.stripe.com/9B67sMafFbrq3n03aOgnK03", // Compliance
  tier2: "https://buy.stripe.com/6oU8wQ2Ndbrqg9M26KgnK01", // Active Defense
  tier3: "https://buy.stripe.com/dRmfZigE3cvu9Lo8v8gnK02"  // War Room
};

// --- QUOTE CONFIG ---
const INTELLECTUAL_PHRASE = {
  text: "The supreme art of war is to subdue the enemy without fighting.",
  author: "Sun Tzu, The Art of War"
};

const App = () => {
  const [view, setView] = useState('home'); // 'home', 'intro', 'services', 'about', 'partnership', 'press', 'privacy', 'terms'
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

  // --- PERSISTENT BOTTOM BAR (ALL PAGES) ---
  const StickyBottomBar = () => (
    <div className="fixed bottom-0 left-0 w-full bg-[#111] border-t border-[#00ff41]/30 z-50 py-4 px-6 flex flex-col md:flex-row justify-between items-center shadow-[0_-5px_20px_rgba(0,255,65,0.1)]">
      <div className="mb-4 md:mb-0 text-center md:text-left">
        <span className="text-[#00ff41] font-mono font-bold tracking-widest text-sm animate-pulse">JOIN THE DEFENSE</span>
        <p className="text-gray-500 text-xs hidden md:block">Secure your infrastructure before the incident occurs.</p>
      </div>
      <div className="flex gap-4">
        <button onClick={() => navigate('partnership')} className="px-6 py-2 border border-gray-600 text-white hover:border-[#00ff41] hover:text-[#00ff41] transition-all text-sm font-bold uppercase tracking-wider">
          Partnerships
        </button>
        <button onClick={() => window.location.href = `tel:${CONTACT_INFO.phone}`} className="px-6 py-2 bg-[#00ff41] text-black hover:bg-[#00cc33] transition-all text-sm font-bold uppercase tracking-wider flex items-center gap-2">
          <Zap size={16}/> Contact Us
        </button>
      </div>
    </div>
  );

  // --- NAVIGATION ---
  const Navbar = () => (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#050505]/95 backdrop-blur-md border-b border-gray-900' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        {/* TOP LEFT ICON (CLICK FOR INTRO PAGE) */}
        <div className="flex items-center gap-2 cursor-pointer group" onClick={() => navigate('intro')}>
          <div className="relative">
            <Shield className="w-8 h-8 text-[#00ff41] group-hover:scale-110 transition-transform" />
            <div className="absolute inset-0 bg-[#00ff41] blur-md opacity-20 group-hover:opacity-40 transition-opacity"></div>
          </div>
          <span className="font-mono font-bold text-white tracking-tighter text-xl group-hover:text-[#00ff41] transition-colors">HUMAN<span className="text-[#00ff41]">LAYER</span></span>
        </div>

        {/* CENTER TABS */}
        <div className="hidden md:flex items-center gap-8 font-mono text-xs tracking-widest font-bold text-gray-400">
          <button onClick={() => navigate('services')} className={`hover:text-[#00ff41] transition-colors ${view === 'services' ? 'text-[#00ff41]' : ''}`}>SERVICES</button>
          <button onClick={() => navigate('about')} className={`hover:text-[#00ff41] transition-colors ${view === 'about' ? 'text-[#00ff41]' : ''}`}>ABOUT</button>
          <button onClick={() => navigate('partnership')} className={`hover:text-[#00ff41] transition-colors ${view === 'partnership' ? 'text-[#00ff41]' : ''}`}>PARTNERSHIP</button>
          <button onClick={() => navigate('press')} className={`hover:text-[#00ff41] transition-colors ${view === 'press' ? 'text-[#00ff41]' : ''}`}>PRESS</button>
        </div>

        {/* TOP RIGHT CONTACT */}
        <a href={`tel:${CONTACT_INFO.phone}`} className="hidden md:flex px-6 py-2 border border-[#00ff41] text-[#00ff41] hover:bg-[#00ff41] hover:text-black transition-all rounded-sm font-bold text-xs tracking-widest">
          CONTACT US
        </a>

        <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#050505] border-b border-gray-800 p-6 flex flex-col gap-4 font-mono text-white">
          <button onClick={() => navigate('services')}>SERVICES</button>
          <button onClick={() => navigate('about')}>ABOUT</button>
          <button onClick={() => navigate('partnership')}>PARTNERSHIP</button>
          <button onClick={() => navigate('press')}>PRESS</button>
          <button onClick={() => window.location.href = `tel:${CONTACT_INFO.phone}`} className="text-[#00ff41]">CONTACT US</button>
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
           <p className="text-gray-500 text-xs">@ 2026 HumanLayer Security.<br/>All Systems Nominal.</p>
        </div>
        <div>
          <h4 className="text-white font-bold mb-4 font-mono text-sm">COMPANY</h4>
          <ul className="space-y-2 text-xs text-gray-500 font-mono">
            <li><button onClick={() => navigate('about')} className="hover:text-[#00ff41]">About</button></li>
            <li><button onClick={() => navigate('services')} className="hover:text-[#00ff41]">Services</button></li>
            <li><button onClick={() => navigate('partnership')} className="hover:text-[#00ff41]">Partnership</button></li>
            <li><button onClick={() => navigate('press')} className="hover:text-[#00ff41]">Press</button></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-4 font-mono text-sm">LEGAL</h4>
          <ul className="space-y-2 text-xs text-gray-500 font-mono">
            <li><button onClick={() => navigate('privacy')} className="hover:text-[#00ff41]">Privacy Policy</button></li>
            <li><button onClick={() => navigate('terms')} className="hover:text-[#00ff41]">Terms & Conditions</button></li>
            <li><button onClick={() => navigate('home')} className="hover:text-[#00ff41]">Retainer</button></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-4 font-mono text-sm">CONTACT</h4>
          <ul className="space-y-2 text-xs text-gray-500 font-mono">
            <li><a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-[#00ff41]">Email Team</a></li>
            <li><a href={`tel:${CONTACT_INFO.phone}`} className="hover:text-[#00ff41]">Direct Line</a></li>
            <li>Miami, FL</li>
          </ul>
        </div>
      </div>
    </footer>
  );

  // --- PAGE CONTENT RENDERER ---
  const renderContent = () => {
    
    // 1. INTRO PAGE (CLICKING LOGO)
    if (view === 'intro') {
      return (
        <div className="pt-40 px-6 min-h-screen max-w-4xl mx-auto text-center">
          <div className="mb-12 animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
              WHEN THE FIREWALL FAILS, <br/>
              <span className="text-[#00ff41]">WHO ANSWERS?</span>
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto mb-12">
              Human Layer Security exists because technology alone is not enough. 
              We are the ethical hackers who train your people, and the elite responders who 
              answer the call when the breach happens. We don't just secure machines; we secure minds.
            </p>
            <button onClick={() => navigate('home')} className="px-8 py-4 bg-[#00ff41] text-black font-bold text-lg hover:bg-[#00cc33] transition-all">
              ENTER SITE
            </button>
          </div>
        </div>
      );
    }

    // 2. SERVICES PAGE
    if (view === 'services') {
      return (
        <div className="pt-32 px-6 min-h-screen">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold text-white mb-16 font-mono border-l-4 border-[#00ff41] pl-6">OUR SERVICES</h1>
            
            {/* SERVICES LIST */}
            <div className="grid md:grid-cols-2 gap-12 mb-20">
              <div className="bg-[#0a0a0a] border border-gray-800 p-8 hover:border-[#00ff41] transition-all">
                <Shield className="w-12 h-12 text-[#00ff41] mb-6"/>
                <h3 className="text-2xl font-bold text-white mb-4">Incident / Crisis Management</h3>
                <p className="text-gray-400">Immediate containment of active threats. We deploy within hours to isolate breaches, eradicate malware, and restore operations.</p>
              </div>
              <div className="bg-[#0a0a0a] border border-gray-800 p-8 hover:border-[#00ff41] transition-all">
                <Users className="w-12 h-12 text-[#00ff41] mb-6"/>
                <h3 className="text-2xl font-bold text-white mb-4">Ethical Phishing Training</h3>
                <p className="text-gray-400">Continuous simulation campaigns that inoculate your workforce against social engineering.</p>
              </div>
            </div>

            {/* HOW WE WORK (AGAIN) */}
            <div className="mb-20">
              <h2 className="text-2xl font-bold text-white mb-8 font-mono">HOW WE WORK</h2>
              <div className="flex flex-col md:flex-row gap-4">
                {[1,2,3,4].map((step) => (
                  <div key={step} className="flex-1 bg-[#111] p-6 border-t-2 border-[#00ff41]">
                    <span className="text-[#00ff41] font-bold text-xl mb-2 block">0{step}</span>
                    <p className="text-gray-400 text-sm">Protocol Step {step} description goes here.</p>
                  </div>
                ))}
              </div>
            </div>

            {/* STATISTICS */}
            <div className="grid md:grid-cols-4 gap-8 mb-20 text-center">
              <div className="p-6 bg-[#0a0a0a]">
                <div className="text-4xl font-bold text-[#00ff41] mb-2">99%</div>
                <div className="text-gray-500 text-xs uppercase tracking-widest">Detection Rate</div>
              </div>
              <div className="p-6 bg-[#0a0a0a]">
                <div className="text-4xl font-bold text-[#00ff41] mb-2">24/7</div>
                <div className="text-gray-500 text-xs uppercase tracking-widest">Active Monitoring</div>
              </div>
              <div className="p-6 bg-[#0a0a0a]">
                <div className="text-4xl font-bold text-[#00ff41] mb-2">&lt;1hr</div>
                <div className="text-gray-500 text-xs uppercase tracking-widest">Response Time</div>
              </div>
              <div className="p-6 bg-[#0a0a0a]">
                <div className="text-4xl font-bold text-[#00ff41] mb-2">500+</div>
                <div className="text-gray-500 text-xs uppercase tracking-widest">Simulations</div>
              </div>
            </div>
            
            <div className="text-center">
                <button onClick={() => window.location.href = `tel:${CONTACT_INFO.phone}`} className="px-8 py-4 bg-[#00ff41] text-black font-bold">CONTACT US FOR SERVICES</button>
            </div>
          </div>
        </div>
      );
    }

    // 3. ABOUT PAGE
    if (view === 'about') {
      return (
        <div className="pt-32 px-6 min-h-screen">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-white mb-12 font-mono border-l-4 border-[#00ff41] pl-6">ABOUT US</h1>
            
            <div className="bg-[#111] p-8 border border-gray-800 mb-12">
              <h2 className="text-2xl font-bold text-white mb-6">OUR BELIEF</h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-6">
                We believe that the human element is both the greatest vulnerability and the strongest defense. 
                Technology can be bypassed, but a well-trained mind is adaptable. We believe in ethical hacking 
                as a force for immunity.
              </p>
            </div>

            <div className="flex flex-col md:flex-row gap-12 items-start">
              <div className="w-full md:w-1/3 bg-gray-900 h-64 flex items-center justify-center text-gray-700 font-mono">
                [FOUNDER PHOTO]
              </div>
              <div className="w-full md:w-2/3">
                <h2 className="text-2xl font-bold text-white mb-2">{CONTACT_INFO.founder}</h2>
                <div className="text-[#00ff41] font-mono text-sm mb-6">FOUNDER & LEAD SECURITY ARCHITECT</div>
                <p className="text-gray-400 mb-4">
                  With a background in cybersecurity and a passion for ethical hacking, Nicolas founded Human Layer Security 
                  to bridge the gap between technical defense and human psychology.
                </p>
                <p className="text-gray-400">
                  Student at FIU, Cybersecurity Specialist, and advocate for proactive defense.
                </p>
              </div>
            </div>
            
            <div className="mt-12 text-center">
                 <button onClick={() => window.location.href = `tel:${CONTACT_INFO.phone}`} className="px-8 py-4 border border-[#00ff41] text-[#00ff41] font-bold hover:bg-[#00ff41] hover:text-black">CONTACT THE TEAM</button>
            </div>
          </div>
        </div>
      );
    }

    // 4. PARTNERSHIP PAGE
    if (view === 'partnership') {
      return (
        <div className="pt-32 px-6 min-h-screen text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-white mb-8 font-mono">PARTNERSHIP</h1>
            <p className="text-xl text-gray-400 mb-12">
              We believe in the power of collaboration. Security is a team sport.
              Whether you are an MSP, a software vendor, or an insurance provider, we can align our defenses.
            </p>
            <button onClick={() => window.location.href = `mailto:${CONTACT_INFO.email}?subject=Partnership Inquiry`} className="px-8 py-4 bg-[#00ff41] text-black font-bold text-lg hover:bg-[#00cc33] transition-all mb-12">
              BECOME A PARTNER
            </button>
            <div className="grid grid-cols-3 gap-8 opacity-30">
               {/* Partner Placeholders */}
               <div className="flex items-center justify-center gap-2 text-white"><Globe/> GLOBAL</div>
               <div className="flex items-center justify-center gap-2 text-white"><Shield/> SECURE</div>
               <div className="flex items-center justify-center gap-2 text-white"><Users/> ALLIANCE</div>
            </div>
          </div>
        </div>
      );
    }

    // 5. PRESS PAGE
    if (view === 'press') {
      return (
        <div className="pt-32 px-6 min-h-screen">
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
                <button onClick={() => window.location.href = `mailto:${CONTACT_INFO.email}?subject=Press Inquiry`} className="px-8 py-3 border border-white text-white hover:bg-white hover:text-black font-bold transition-all">
                    CONTACT PRESS TEAM
                </button>
            </div>
           </div>
        </div>
      );
    }
    
    // 6. PRIVACY / TERMS
    if (view === 'privacy' || view === 'terms') {
        return (
            <div className="pt-32 px-6 min-h-screen max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-white mb-8 font-mono">{view === 'privacy' ? 'PRIVACY POLICY' : 'TERMS AND CONDITIONS'}</h1>
                <div className="text-gray-400 space-y-4">
                    <p>Standard legal boilerplate placeholder.</p>
                    <p>1. Data collection is minimal.</p>
                    <p>2. We respect user privacy.</p>
                    <p>3. Contact {CONTACT_INFO.email} for details.</p>
                </div>
            </div>
        );
    }

    // 7. HOME PAGE (DEFAULT SCROLL)
    return (
      <>
        {/* HERO */}
        <section className="relative pt-40 pb-20 px-6 min-h-screen flex items-center justify-center text-center">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20"></div>
            <div className="relative z-10 max-w-5xl mx-auto">
                <h1 className="text-6xl md:text-9xl font-bold text-white mb-6 tracking-tighter">
                  HUMAN <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ff41] to-emerald-700">LAYER</span>
                </h1>
                <p className="text-2xl text-gray-400 mb-12 max-w-2xl mx-auto">
                  Ethical Phishing & Security Training.
                </p>
                <div className="flex justify-center gap-4">
                   <button onClick={() => navigate('services')} className="px-8 py-4 bg-[#00ff41] text-black font-bold text-lg hover:bg-[#00cc33]">START TRAINING</button>
                </div>
            </div>
        </section>

        {/* HOW WE WORK (STEPS) */}
        <section className="py-24 bg-[#050505]">
           <div className="max-w-7xl mx-auto px-6">
              <h2 className="text-3xl font-bold text-white mb-16 font-mono text-center">HOW WE WORK</h2>
              <div className="grid md:grid-cols-4 gap-4">
                 {[
                    {title: "Assessment", desc: "We map your vulnerabilities."},
                    {title: "Simulation", desc: "We deploy ethical phishing attacks."},
                    {title: "Training", desc: "We educate the clickers."},
                    {title: "Reporting", desc: "We prove the improvement."}
                 ].map((step, i) => (
                    <div key={i} className="bg-[#0a0a0a] border border-gray-800 p-8 relative">
                        <div className="text-[#00ff41] text-6xl font-bold opacity-20 absolute top-4 right-4">0{i+1}</div>
                        <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                        <p className="text-gray-400 text-sm">{step.desc}</p>
                    </div>
                 ))}
              </div>
           </div>
        </section>

        {/* SERVICES PREVIEW */}
        <section className="py-24 bg-[#0a0a0a] border-y border-gray-900">
           <div className="max-w-7xl mx-auto px-6 text-center">
              <h2 className="text-3xl font-bold text-white mb-16 font-mono">OUR SERVICES</h2>
              <div className="grid md:grid-cols-3 gap-8 mb-12">
                 {/* COPY OF TIERS FOR VISIBILITY */}
                 <div className="p-8 border border-gray-800 hover:border-[#00ff41] transition-all">
                    <h3 className="text-white font-bold mb-2">Simulation Starter</h3>
                    <div className="text-[#00ff41] text-xl font-bold mb-4">$1,450/mo</div>
                    <a href={PRICING_LINKS.tier1} className="block w-full py-2 bg-[#111] text-white border border-gray-600 hover:bg-[#00ff41] hover:text-black font-bold uppercase text-xs">Subscribe</a>
                 </div>
                 <div className="p-8 border-2 border-[#00ff41] transform scale-105 bg-[#111]">
                    <h3 className="text-white font-bold mb-2">Culture Shifter</h3>
                    <div className="text-[#00ff41] text-xl font-bold mb-4">$3,800/mo</div>
                    <a href={PRICING_LINKS.tier2} className="block w-full py-2 bg-[#00ff41] text-black font-bold uppercase text-xs">Subscribe</a>
                 </div>
                 <div className="p-8 border border-gray-800 hover:border-[#00ff41] transition-all">
                    <h3 className="text-white font-bold mb-2">Human Firewall</h3>
                    <div className="text-[#00ff41] text-xl font-bold mb-4">$7,500/mo</div>
                    <a href={PRICING_LINKS.tier3} className="block w-full py-2 bg-[#111] text-white border border-gray-600 hover:bg-[#00ff41] hover:text-black font-bold uppercase text-xs">Contact</a>
                 </div>
              </div>
           </div>
        </section>

        {/* INCIDENT RESPONSE PARTNER */}
        <section className="py-24 bg-[#050505] text-center">
            <h2 className="text-gray-500 font-mono text-xs tracking-[0.3em] mb-12">INCIDENT RESPONSE PARTNERS</h2>
            <div className="flex flex-wrap justify-center gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                <div className="flex items-center gap-3 text-2xl font-bold text-white"><Shield className="text-[#00ff41]"/> CROWDSTRIKE</div>
                <div className="flex items-center gap-3 text-2xl font-bold text-white"><Lock className="text-[#00ff41]"/> AWS SECURITY</div>
            </div>
        </section>

        {/* INTELLECTUAL PHRASE */}
        <section className="py-40 px-6 bg-[#000] flex items-center justify-center text-center">
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
export default App;

