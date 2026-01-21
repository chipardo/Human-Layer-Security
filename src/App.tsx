import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation, Link, BrowserRouter } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Zap, Menu, X, CheckCircle, Globe, Users, Mail, Phone, Activity } from 'lucide-react';
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }

const CONTACT_INFO = { email: "nicolassunobrega2@gmail.com", phone: "3052820302", phoneDisplay: "+1 (305) 282-0302", founder: "Nicolas Su Nobrega Garces" };
const PRICING = { tier1: "https://buy.stripe.com/9B67sMafFbrq3n03aOgnK03", tier2: "https://buy.stripe.com/6oU8wQ2Ndbrqg9M26KgnK01", tier3: "https://buy.stripe.com/dRmfZigE3cvu9Lo8v8gnK02" };

const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'outline', size?: 'sm' | 'md' | 'lg', fullWidth?: boolean }> = ({ className, variant = 'primary', size = 'md', fullWidth, children, ...props }) => {
  const base = "inline-flex items-center justify-center font-mono font-bold uppercase tracking-widest transition-all focus:outline-none disabled:opacity-50";
  const vars = { primary: "bg-[#00ff41] text-black hover:bg-[#00cc33] shadow-[0_0_15px_rgba(0,255,65,0.3)]", outline: "border border-[#00ff41] text-[#00ff41] hover:bg-[#00ff41] hover:text-black" };
  const sizes = { sm: "h-9 px-4 text-[10px]", md: "h-12 px-8 text-xs", lg: "h-14 px-10 text-sm" };
  return <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className={cn(base, vars[variant], sizes[size], fullWidth && "w-full", className)} {...props}>{children}</motion.button>;
};

const Section: React.FC<{ children: React.ReactNode, className?: string, id?: string }> = ({ children, className = "", id }) => (
  <section id={id} className={`py-24 px-6 ${className}`}><motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }} className="max-w-7xl mx-auto">{children}</motion.div></section>
);

const PricingCard: React.FC<{ title: string, price: string, features: string[], link: string, isPopular?: boolean, delay?: number }> = ({ title, price, features, link, isPopular, delay = 0 }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay }} className={`relative p-8 rounded-sm ${isPopular ? 'bg-[#111] border-2 border-[#00ff41] shadow-[0_0_40px_rgba(0,255,65,0.1)] -translate-y-4' : 'bg-[#0a0a0a] border border-gray-800'}`}>
    {isPopular && <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#00ff41] text-black px-4 py-1 font-bold text-xs uppercase tracking-wider">Most Popular</div>}
    <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
    <div className="mb-6"><span className="text-4xl font-bold text-white">{price}</span><span className="text-lg text-gray-500">/mo</span></div>
    <ul className="space-y-4 mb-8 text-sm text-gray-400">{features.map((f, i) => <li key={i} className="flex gap-3"><CheckCircle className="w-5 h-5 text-[#00ff41]" />{f}</li>)}</ul>
    <a href={link} target="_blank"><Button variant={isPopular ? 'primary' : 'outline'} fullWidth>Subscribe</Button></a>
  </motion.div>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  useEffect(() => setIsOpen(false), [location]);
  
  return (
    <nav className="fixed w-full z-50 bg-[#050505]/95 backdrop-blur-md border-b border-gray-900">
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2"><Shield className="w-8 h-8 text-[#00ff41]" /><span className="font-mono font-bold text-white text-xl">HUMAN<span className="text-[#00ff41]">LAYER</span></span></Link>
        <div className="hidden md:flex gap-8 font-mono text-xs font-bold text-gray-400">
          {['SERVICES', 'ABOUT', 'PARTNERSHIP', 'PRESS'].map((item) => (
             <Link key={item} to={`/${item.toLowerCase()}`} className="hover:text-[#00ff41] transition-colors">{item}</Link>
          ))}
        </div>
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>{isOpen ? <X /> : <Menu />}</button>
      </div>
      {isOpen && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="md:hidden bg-[#050505] border-b border-gray-800">
           {['SERVICES', 'ABOUT', 'PARTNERSHIP', 'PRESS'].map((item) => <Link key={item} to={`/${item.toLowerCase()}`} className="block p-4 text-white hover:text-[#00ff41]">{item}</Link>)}
        </motion.div>
      )}
    </nav>
  );
};

const Footer = () => (
  <footer className="py-20 bg-[#050505] border-t border-gray-900 text-center md:text-left pb-32">
    <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12">
      <div className="col-span-1">
        <div className="flex items-center gap-2 mb-4 justify-center md:justify-start"><Shield className="w-6 h-6 text-[#00ff41]" /><span className="font-mono font-bold text-white tracking-tighter text-lg">HUMAN<span className="text-[#00ff41]">LAYER</span></span></div>
        <p className="text-gray-500 text-xs leading-relaxed">Securing the human operating system.<br/>© 2026 HumanLayer Security. Miami, FL.</p>
      </div>
      <div><h4 className="text-white font-bold mb-4 font-mono text-sm tracking-widest">COMPANY</h4><ul className="space-y-3 text-xs text-gray-500 font-mono"><li><Link to="/about" className="hover:text-[#00ff41]">About Us</Link></li><li><Link to="/services" className="hover:text-[#00ff41]">Services</Link></li><li><Link to="/partnership" className="hover:text-[#00ff41]">Partnerships</Link></li></ul></div>
      <div><h4 className="text-white font-bold mb-4 font-mono text-sm tracking-widest">LEGAL</h4><ul className="space-y-3 text-xs text-gray-500 font-mono"><li><Link to="/privacy" className="hover:text-[#00ff41]">Privacy</Link></li><li><Link to="/terms" className="hover:text-[#00ff41]">Terms</Link></li></ul></div>
      <div><h4 className="text-white font-bold mb-4 font-mono text-sm tracking-widest">CONTACT</h4><ul className="space-y-3 text-xs text-gray-500 font-mono"><li><a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-[#00ff41] flex items-center gap-2 justify-center md:justify-start"><Mail size={14}/> Email</a></li><li><a href={`tel:${CONTACT_INFO.phone}`} className="hover:text-[#00ff41] flex items-center gap-2 justify-center md:justify-start"><Phone size={14}/> Phone</a></li></ul></div>
    </div>
  </footer>
);

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#050505]">
      <section className="relative pt-40 pb-20 px-6 min-h-screen flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20 pointer-events-none"></div>
        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="inline-block border border-[#00ff41] px-4 py-1 rounded-full mb-8 bg-[#00ff41]/10"><span className="text-[#00ff41] font-mono text-xs font-bold tracking-widest animate-pulse">● SYSTEM ACTIVE</span></div>
          <h1 className="text-5xl md:text-8xl font-bold text-white mb-8 tracking-tighter leading-tight">WHEN THE FIREWALL <br/>FAILS, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ff41] to-emerald-700">WHO ANSWERS?</span></h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">Ethical Phishing & Security Training. <br/>We secure the human layer.</p>
          <div className="flex flex-col md:flex-row justify-center gap-4"><Button size="lg" onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}>View Plans</Button><Button size="lg" variant="outline" onClick={() => navigate('/services')}>Our Capabilities</Button></div>
        </div>
      </section>
      <Section className="bg-[#080808] border-y border-gray-900">
        <div className="grid md:grid-cols-4 gap-8">
           {[ {t: "ASSESSMENT", d: "We map your vulnerabilities.", i: Activity}, {t: "SIMULATION", d: "We deploy ethical attacks.", i: Zap}, {t: "TRAINING", d: "We educate the clickers.", i: Users}, {t: "REPORTING", d: "We prove the improvement.", i: CheckCircle} ].map((s, i) => (
              <div key={i} className="bg-[#0a0a0a] border border-gray-800 p-8 relative group hover:border-[#00ff41] transition-all duration-300 hover:-translate-y-2"><div className="text-[#00ff41] text-6xl font-bold opacity-10 absolute top-2 right-4 group-hover:opacity-20 transition-opacity">0{i+1}</div><s.i className="w-8 h-8 text-[#00ff41] mb-6 group-hover:scale-110 transition-transform" /><h3 className="text-xl font-bold text-white mb-2 font-mono">{s.t}</h3><p className="text-gray-400 text-sm">{s.d}</p></div>
           ))}
        </div>
      </Section>
      <Section className="bg-[#050505]" id="pricing">
        <h2 className="text-3xl font-bold text-white mb-8 font-mono tracking-widest text-center">DEFENSE PRESETS</h2>
        <div className="grid md:grid-cols-3 gap-6 items-start">
          <PricingCard title="SIMULATION STARTER" price="$1,450" features={["Monthly Phishing Tests", "Basic Reporting", "Email Support Only"]} link={PRICING.tier1} delay={0.1} />
          <PricingCard title="CULTURE SHIFTER" price="$3,800" features={["Weekly Simulations", "Interactive Training Library", "Executive Dashboard"]} link={PRICING.tier2} isPopular delay={0.2} />
          <PricingCard title="HUMAN FIREWALL" price="$7,500" features={["Unlimited Simulations", "Spear-Phishing", "Dedicated Consultant"]} link={PRICING.tier3} delay={0.3} />
        </div>
      </Section>
    </div>
  );
};

const Services = () => (
  <div className="pt-32 min-h-screen pb-20 bg-[#050505] text-white">
    <div className="max-w-7xl mx-auto px-6">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 font-mono border-l-4 border-[#00ff41] pl-6">SERVICES & PLANS</h1>
      <Section className="!px-0 !py-8">
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-[#111] p-8 border border-gray-800 hover:border-[#00ff41] transition-colors group"><Shield className="w-10 h-10 text-[#00ff41] mb-4 group-hover:scale-110 transition-transform" /><h3 className="text-xl font-bold mb-2">Incident / Crisis Management</h3><p className="text-gray-400 text-sm">Immediate containment of active threats.</p></div>
          <div className="bg-[#111] p-8 border border-gray-800 hover:border-[#00ff41] transition-colors group"><Users className="w-10 h-10 text-[#00ff41] mb-4 group-hover:scale-110 transition-transform" /><h3 className="text-xl font-bold mb-2">Ethical Phishing Training</h3><p className="text-gray-400 text-sm">We hack your employees before the criminals do.</p></div>
        </div>
      </Section>
    </div>
  </div>
);

const About = () => <div className="pt-32 px-6 min-h-screen pb-20 bg-[#050505] text-white"><div className="max-w-4xl mx-auto"><h1 className="text-4xl font-bold mb-12 font-mono border-l-4 border-[#00ff41] pl-6">ABOUT US</h1><div className="bg-[#111] p-10 border border-gray-800 mb-12"><h2 className="text-2xl font-bold mb-6">OUR BELIEF</h2><p className="text-gray-400 text-lg">"We believe that the human element is both the greatest vulnerability and the strongest defense."</p></div><div className="flex border border-gray-800 p-8 bg-[#0a0a0a] gap-8"><div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center text-gray-500 font-bold border border-gray-700">NS</div><div><h2 className="text-2xl font-bold">{CONTACT_INFO.founder}</h2><div className="text-[#00ff41] font-mono text-xs">FOUNDER</div></div></div></div></div>;
const Partnership = () => <div className="pt-32 px-6 min-h-screen text-center pb-20 bg-[#050505] text-white"><h1 className="text-4xl font-bold mb-8 font-mono">PARTNERSHIP</h1><p className="text-gray-400 mb-12">Security is a team sport.</p><a href={`mailto:${CONTACT_INFO.email}`}><Button size="lg">Become a Partner</Button></a></div>;
const Press = () => <div className="pt-32 px-6 min-h-screen pb-20 bg-[#050505] text-white"><h1 className="text-4xl font-bold mb-8 font-mono border-l-4 border-[#00ff41] pl-6">PRESS ROOM</h1><div className="bg-[#111] p-8 border-l-2 border-[#00ff41]"><h3 className="text-xl font-bold">Human Layer Security Launches in Miami</h3></div></div>;
const Legal = () => <div className="pt-32 px-6 min-h-screen pb-20 bg-[#050505] text-white"><h1 className="text-4xl font-bold mb-8 font-mono">LEGAL</h1><p className="text-gray-400">Contact legal for full documentation.</p></div>;

function App() {
  const location = useLocation();
  return (
    <div className="min-h-screen bg-[#050505] text-gray-300 font-sans selection:bg-[#00ff41] selection:text-black">
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/partnership" element={<Partnership />} />
          <Route path="/press" element={<Press />} />
          <Route path="/privacy" element={<Legal />} />
          <Route path="/terms" element={<Legal />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </div>
  );
}

export default App;
