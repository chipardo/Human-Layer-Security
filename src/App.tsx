import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Shield, Zap, Menu, X, CheckCircle, Users, Mail, Phone, Activity, ArrowRight, Lock, Globe, Terminal, FileText, Award, ChevronRight } from 'lucide-react';
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import heroImage from './assets/hero-war-room.png';

// --- UTILS ---
function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }

// --- DATA ---
const CONTACT_INFO = { email: "nicolassunobrega2@gmail.com", phone: "3052820302", founder: "Nicolas Su Nobrega Garces" };
const PRICING = {
  tier1: "https://buy.stripe.com/9B67sMafFbrq3n03aOgnK03",
  tier2: "https://buy.stripe.com/6oU8wQ2Ndbrqg9M26KgnK01",
  tier3: "https://buy.stripe.com/dRmfZigE3cvu9Lo8v8gnK02"
};

// --- ANIMATION VARIANTS ---
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

// --- UI COMPONENTS ---
const Button: React.FC<React.ComponentProps<typeof motion.button> & { variant?: 'primary' | 'outline' | 'ghost', size?: 'sm' | 'md' | 'lg' }> = ({ className, variant = 'primary', size = 'md', children, ...props }) => {
  const base = "inline-flex items-center justify-center font-display font-semibold transition-all focus:outline-none disabled:opacity-50 rounded-full cursor-pointer";
  const vars = {
    primary: "bg-primary text-white hover:bg-secondary shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] border border-transparent",
    outline: "border border-white/20 text-white hover:border-primary hover:text-primary bg-transparent hover:bg-white/5",
    ghost: "text-white/70 hover:text-white hover:bg-white/5"
  };
  const sizes = { sm: "h-9 px-4 text-xs", md: "h-12 px-8 text-sm", lg: "h-14 px-10 text-base" };

  return (
    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className={cn(base, vars[variant], sizes[size], className)} {...props}>
      {children}
    </motion.button>
  );
};

const Section: React.FC<{ children: React.ReactNode, className?: string, id?: string }> = ({ children, className = "", id }) => (
  <section id={id} className={cn("py-24 px-6 relative overflow-hidden", className)}>
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp} className="max-w-7xl mx-auto relative z-10">
      {children}
    </motion.div>
  </section>
);

const PricingCard: React.FC<{ title: string, price: string, features: string[], link: string, isPopular?: boolean, delay?: number }> = ({ title, price, features, link, isPopular, delay = 0 }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay }}
    className={cn(
      "relative p-8 rounded-2xl glass-dark transition-all duration-300 group hover:bg-surface/80 flex flex-col h-full",
      isPopular ? 'border-primary/50 shadow-[0_0_30px_rgba(168,85,247,0.15)] ring-1 ring-primary/20' : 'border-white/5'
    )}>
    {isPopular && <div className="absolute top-0 right-0 bg-primary text-white px-4 py-1 font-bold text-xs uppercase tracking-wider rounded-bl-xl rounded-tr-xl">Most Popular</div>}
    <h3 className="text-xl font-bold text-white mb-2 font-display">{title}</h3>
    <div className="mb-6 flex items-baseline gap-1"><span className="text-4xl font-bold text-white">{price}</span><span className="text-sm text-gray-400">/mo</span></div>
    <ul className="space-y-4 mb-8 text-sm text-gray-400 flex-grow">{features.map((f, i) => <li key={i} className="flex gap-3 items-start"><CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />{f}</li>)}</ul>
    <a href={link} target="_blank" rel="noopener noreferrer" className="mt-auto"><Button variant={isPopular ? 'primary' : 'outline'} className="w-full rounded-xl">Subscribe</Button></a>
  </motion.div>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => setIsOpen(false), [location]);

  return (
    <nav className={cn("fixed w-full z-50 transition-all duration-500 px-4", scrolled ? "top-4" : "top-0")}>
      <div className={cn(
        "max-w-7xl mx-auto px-6 h-20 flex justify-between items-center transition-all duration-300",
        scrolled ? "glass rounded-full border border-white/10 shadow-lg shadow-black/50" : "bg-transparent border-transparent"
      )}>
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center border border-primary/50 backdrop-blur-md group-hover:bg-primary/30 transition-colors">
            <Shield className="w-6 h-6 text-primary" />
          </div>
          <span className="font-display font-bold text-white text-xl tracking-tight leading-none">HUMAN<br /><span className="text-primary text-sm tracking-widest">LAYER</span></span>
        </Link>

        <div className="hidden md:flex gap-1 bg-white/5 rounded-full p-1 border border-white/5 backdrop-blur-sm">
          {['SERVICES', 'ABOUT', 'PARTNERSHIP', 'PRESS'].map((item) => (
            <Link key={item} to={`/${item.toLowerCase()}`} className={cn(
              "px-6 py-2 text-xs font-bold text-gray-300 hover:text-white rounded-full transition-all tracking-wide",
              location.pathname === `/${item.toLowerCase()}` ? "bg-white/10 text-white shadow-inner" : "hover:bg-white/5"
            )}>{item}</Link>
          ))}
        </div>

        <div className="hidden md:flex gap-4">
          <Button size="sm" className="gap-2 shadow-none hover:shadow-lg bg-red-600 hover:bg-red-700 border-red-500/50 shadow-red-900/20"><Phone size={14} /> Emergency: 24/7</Button>
        </div>

        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>{isOpen ? <X /> : <Menu />}</button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="md:hidden bg-[#050014] border-b border-white/10 overflow-hidden absolute top-24 left-4 right-4 rounded-2xl border border-white/10 z-50 shadow-2xl">
            <div className="p-4 flex flex-col gap-2">
              {['SERVICES', 'ABOUT', 'PARTNERSHIP', 'PRESS'].map((item) => <Link key={item} to={`/${item.toLowerCase()}`} className="block p-4 text-white hover:bg-white/5 rounded-xl font-bold font-display">{item}</Link>)}
              <a href={`tel:${CONTACT_INFO.phone}`} className="block p-4 bg-red-600/20 text-red-500 hover:bg-red-600/30 rounded-xl font-bold text-center border border-red-500/20">Emergency Call</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-[#02000a] border-t border-white/5 pt-32 pb-12 relative overflow-hidden">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
    <div className="max-w-7xl mx-auto px-6 relative z-10">
      <div className="grid md:grid-cols-4 gap-12 mb-20">
        <div className="col-span-1 md:col-span-2">
          <Link to="/" className="flex items-center gap-2 mb-6">
            <Shield className="w-8 h-8 text-primary" />
            <span className="font-display font-bold text-white text-2xl">HUMAN<span className="text-primary">LAYER</span></span>
          </Link>
          <h2 className="text-3xl font-bold text-white mb-6 max-w-sm leading-tight">Securing the human operating system.</h2>
          <div className="flex gap-4">
            <Button>Book a Demo</Button>
          </div>
        </div>
        <div><h4 className="text-white font-bold mb-6 font-display tracking-widest text-sm">COMPANY</h4><ul className="space-y-4 text-sm text-gray-500"><li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li><li><Link to="/services" className="hover:text-primary transition-colors">Services</Link></li><li><Link to="/partnership" className="hover:text-primary transition-colors">Partnerships</Link></li><li><Link to="/press" className="hover:text-primary transition-colors">Press</Link></li></ul></div>
        <div><h4 className="text-white font-bold mb-6 font-display tracking-widest text-sm">CONTACT</h4><ul className="space-y-4 text-sm text-gray-500"><li><a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-primary flex items-center gap-2">Email Us <ArrowRight size={14} /></a></li><li><a href={`tel:${CONTACT_INFO.phone}`} className="hover:text-primary flex items-center gap-2">Call Now <ArrowRight size={14} /></a></li></ul></div>
      </div>
      <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
        <p>© 2026 HumanLayer Security. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0"><Link to="/privacy" className="hover:text-white">Privacy</Link><Link to="/terms" className="hover:text-white">Terms</Link></div>
      </div>
    </div>
  </footer>
);

// --- HOME PAGE ---
const Home = () => {
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(168,85,247,0.05),transparent_50%)]" />
        <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-primary/10 via-primary/5 to-transparent opacity-60 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 w-full grid md:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold mb-8 uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" /> System Active
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
              When the firewall <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">fails.</span>
            </h1>
            <p className="text-xl text-gray-400 mb-10 max-w-lg leading-relaxed">
              We specialize in securing the human layer through advanced simulation, ethical phishing, and crisis response.
            </p>
            <div className="flex gap-4">
              <Button size="lg" onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}>View Plans</Button>
              <Button size="lg" variant="outline" onClick={() => navigate('/services')}>Our Capabilities</Button>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative group perspective-1000">
            <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-primary/20 bg-surface/50 backdrop-blur-sm transform transition-transform duration-700 group-hover:rotate-y-2">
              <img src={heroImage} alt="Cyber War Room" className="w-full h-auto object-cover opacity-90 group-hover:scale-105 transition-transform duration-700 ease-out" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050014] via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-8 left-8 right-8 grid grid-cols-2 gap-4">
                <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10">
                  <div className="text-xs text-gray-400 mb-1">Threat Level</div>
                  <div className="text-xl font-bold text-red-500 flex items-center gap-2"><Activity size={18} className="animate-pulse" /> CRITICAL</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10">
                  <div className="text-xs text-gray-400 mb-1">Active Monitors</div>
                  <div className="text-xl font-bold text-primary">24/7</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="bg-white/5 border-y border-white/5 backdrop-blur-sm overflow-hidden py-4 flex relative z-20">
        <motion.div className="flex gap-20 whitespace-nowrap" animate={{ x: [0, -1000] }} transition={{ repeat: Infinity, duration: 40, ease: "linear" }}>
          {[...Array(10)].map((_, i) => (
            <React.Fragment key={i}>
              <span className="text-white/50 font-mono text-sm tracking-widest uppercase flex items-center gap-4"><Activity className="text-primary w-4 h-4" /> When every second counts</span>
              <span className="text-white/50 font-mono text-sm tracking-widest uppercase flex items-center gap-4"><Lock className="text-primary w-4 h-4" /> Protecting your reputation</span>
              <span className="text-white/50 font-mono text-sm tracking-widest uppercase flex items-center gap-4"><Shield className="text-primary w-4 h-4" /> Led by top-tier experts</span>
            </React.Fragment>
          ))}
        </motion.div>
      </div>

      {/* PROCESS */}
      <Section className="bg-[#080218]">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">How We Work</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Our methodology is built on speed, precision, and minimizing reputational damage.</p>
        </div>
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid md:grid-cols-4 gap-4">
          {[{ t: "Intake", d: "Immediate assessment of scope and severity.", i: Phone }, { t: "Containment", d: "Stopping the bleeding and securing vectors.", i: Lock }, { t: "Analysis", d: "Deep forensic dive into origin and impact.", i: Terminal }, { t: "Resolution", d: "Recovery, detailed reporting, and hardening.", i: CheckCircle }].map((s, i) => (
            <motion.div variants={fadeInUp} key={i} className="group relative p-8 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
              <div className="absolute top-0 right-0 p-4 text-7xl font-bold text-white/5 font-display select-none group-hover:text-white/10 transition-colors">0{i + 1}</div>
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"><s.i className="w-6 h-6 text-primary" /></div>
              <h3 className="text-xl font-bold text-white mb-2">{s.t}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{s.d}</p>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* SERVICES PREVIEW */}
      <Section id="services-preview">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div><h2 className="text-4xl font-bold text-white mb-4">Core Capabilities</h2><p className="text-gray-400">Beyond standard security. We handle the mess.</p></div>
          <Button variant="outline" className="hidden md:flex" onClick={() => navigate('/services')}>All Services</Button>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 p-10 rounded-3xl bg-gradient-to-br from-secondary/20 to-surface border border-white/10 min-h-[300px] flex flex-col justify-end group transition-all hover:border-primary/30">
            <Shield className="w-12 h-12 text-primary mb-auto" />
            <h3 className="text-2xl font-bold text-white mb-2">Crisis Management</h3>
            <p className="text-gray-300">When the breach happens, we are the first call. We handle negotiation, communications, and technical remediation.</p>
          </div>
          <div className="p-10 rounded-3xl bg-surface border border-white/10 flex flex-col justify-end group hover:bg-white/5 transition-colors">
            <Users className="w-12 h-12 text-white/50 mb-auto group-hover:text-primary transition-colors" />
            <h3 className="text-xl font-bold text-white mb-2">Training</h3>
            <p className="text-gray-400">Simulations that actually fool people.</p>
          </div>
        </div>
      </Section>

      {/* PRICING */}
      <Section id="pricing" className="bg-[#050014]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent opacity-50 pointer-events-none"></div>
        <div className="text-center mb-20 relative z-10"><h2 className="text-4xl font-bold text-white mb-4">Defense Presets</h2><p className="text-gray-400">Choose the level of engagement that fits your risk profile.</p></div>
        <div className="grid md:grid-cols-3 gap-8 items-stretch relative z-10">
          <PricingCard title="Simulation Starter" price="$1,450" features={["Monthly Phishing Tests", "Basic Reporting", "Email Support Only"]} link={PRICING.tier1} delay={0.1} />
          <PricingCard title="Culture Shifter" price="$3,800" features={["Weekly Simulations", "Interactive Training Library", "Executive Dashboard", "Priority Support"]} link={PRICING.tier2} isPopular delay={0.2} />
          <PricingCard title="Human Firewall" price="$7,500" features={["Unlimited Simulations", "Spear-Phishing Vectors", "Dedicated Security Consultant", "24/7 Crisis Access"]} link={PRICING.tier3} delay={0.3} />
        </div>
      </Section>
    </>
  );
};

// --- INNER PAGES ---
const PageHeader: React.FC<{ title: string, subtitle: string }> = ({ title, subtitle }) => (
  <section className="pt-40 pb-20 px-6 relative overflow-hidden">
    <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/10 to-transparent opacity-30 pointer-events-none" />
    <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="max-w-7xl mx-auto relative z-10">
      <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">{title}</h1>
      <p className="text-xl text-gray-400 max-w-2xl leading-relaxed border-l-4 border-primary pl-6">{subtitle}</p>
    </motion.div>
  </section>
);

const Services = () => (
  <div className="min-h-screen bg-background text-white pb-20">
    <PageHeader title="Our Services" subtitle="We provide a full spectrum of human-centric security services, ranging from preventative education to active crisis management." />
    <Section className="!pt-0">
      <div className="grid gap-4">
        {[
          { t: "Incident Response", d: "We take command of the situation immediately. From technical containment to public relations management, we guide you through the storm.", i: Activity },
          { t: "Dark Web Monitoring", d: "We track your data leaks before they become breaches. Continuous scanning of underground forums for your credentials.", i: Globe },
          { t: "Ransom Negotiation", d: "Professional intermediaries for ransomware situations. We handle the criminals so you don't have to.", i: Lock },
          { t: "Executive Protection", d: "Securing the personal digital lives of high-value targets. Home network audits and family security training.", i: Shield },
          { t: "Spear Phishing Sims", d: "Highly targeted campaigns designed to test your C-suite's resilience against sophisticated social engineering.", i: Mail }
        ].map((s, i) => (
          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} key={i} className="flex flex-col md:flex-row gap-8 p-10 border border-white/5 bg-white/5 rounded-2xl hover:border-primary/30 hover:bg-white/10 transition-all group">
            <div className="w-16 h-16 bg-surface rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-lg shadow-black/50 border border-white/5">
              <s.i className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-3 text-white">{s.t}</h3>
              <p className="text-gray-400 leading-relaxed max-w-3xl">{s.d}</p>
            </div>
            <div className="md:ml-auto flex items-center">
              <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-colors">
                <ArrowRight size={18} className="text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  </div>
);

const About = () => (
  <div className="min-h-screen bg-background text-white pb-20">
    <PageHeader title="Who We Are" subtitle="We are a collective of former white-hat hackers, intelligence analysts, and psychological operations experts." />
    <Section className="!pt-0">
      <div className="grid md:grid-cols-2 gap-16 items-start">
        <div className="space-y-8 text-lg text-gray-300 leading-relaxed">
          <p>The "Human Layer" is the final frontier of cybersecurity. While firewalls utilize advanced AI to block threats, human psychology remains static—and vulnerable.</p>
          <p>We founded HumanLayer Security with a simple mission: <span className="text-white font-bold">To harden the human operating system.</span></p>
          <p>We don't just send automated emails. We study your organization's culture, identify communication patterns, and design simulations that mirror the exact tactics real attackers will use against you.</p>
        </div>
        <div className="bg-surface rounded-3xl p-8 border border-white/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-[60px] pointer-events-none" />
          <h3 className="text-sm font-bold text-primary uppercase tracking-widest mb-8">Leadership</h3>
          <div className="flex gap-6 items-center">
            <div className="w-24 h-24 rounded-full bg-black border-2 border-primary/20 flex items-center justify-center text-xl font-bold text-gray-700 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent" />
              NS
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{CONTACT_INFO.founder}</div>
              <div className="text-primary font-mono text-sm mb-2">FOUNDER & PRINCIPAL</div>
              <p className="text-gray-500 text-sm">Ex-Offensive Security Specialist.</p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  </div>
);

const Partnership = () => (
  <div className="min-h-screen bg-background text-white pb-20">
    <PageHeader title="Partnership" subtitle="Security is a team sport. We enable MSPs and agencies to offer elite human-layer defense." />
    <Section>
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {[
          { t: "White Label", d: "Deploy our simulations under your brand.", i: FileText },
          { t: "Rev Share", d: "Generous recurring commissions for referrals.", i: Award },
          { t: "Sales Support", d: "We help you close the deal with technical expertise.", i: Users }
        ].map((s, i) => (
          <div key={i} className="p-8 bg-surface border border-white/5 rounded-2xl text-center hover:-translate-y-2 transition-transform">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6"><s.i className="w-8 h-8 text-primary" /></div>
            <h3 className="text-xl font-bold mb-2">{s.t}</h3>
            <p className="text-gray-400 text-sm">{s.d}</p>
          </div>
        ))}
      </div>
      <div className="bg-gradient-to-r from-surface to-background border border-white/10 rounded-3xl p-12 text-center max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">Become a Partner</h2>
        <p className="text-gray-400 mb-8">Join our network of elite security providers.</p>
        <a href={`mailto:${CONTACT_INFO.email}?subject=Partnership Inquiry`}><Button size="lg">Contact Partner Team</Button></a>
      </div>
    </Section>
  </div>
);

const Press = () => (
  <div className="min-h-screen bg-background text-white pb-20">
    <PageHeader title="Press Room" subtitle="Latest news, research, and updates from the HumanLayer Security team." />
    <Section className="!pt-0">
      <div className="grid gap-6">
        {[
          { date: "Jan 15, 2026", title: "HumanLayer Security Launches in Miami Tech Hub", source: "Press Release" },
          { date: "Dec 10, 2025", title: "The Rise of AI-Driven Social Engineering", source: "Security Week Op-Ed" },
          { date: "Nov 22, 2025", title: "Interview: Why Firewalls Can't Save You From Phishing", source: "Cyber Daily" }
        ].map((n, i) => (
          <div key={i} className="flex gap-6 items-center p-6 border-b border-white/5 group hover:bg-white/5 transition-colors cursor-pointer">
            <div className="text-sm font-mono text-primary w-32 shrink-0">{n.date}</div>
            <div className="flex-grow">
              <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">{n.title}</h3>
              <div className="text-gray-500 text-sm mt-1">{n.source}</div>
            </div>
            <ChevronRight className="text-gray-600 group-hover:text-white transition-colors" />
          </div>
        ))}
      </div>
      <div className="mt-12 p-8 border border-white/10 rounded-2xl bg-surface flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-xl font-bold">Media Inquiries</h3>
          <p className="text-gray-400 text-sm mt-1">For comment or interviews, contact our media team.</p>
        </div>
        <Button variant="outline">Download Media Kit</Button>
      </div>
    </Section>
  </div>
);

const Legal = () => (
  <div className="pt-32 px-6 min-h-screen pb-20 bg-background text-white">
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 font-display">Legal</h1>
      <div className="prose prose-invert prose-lg">
        <p>Please contact our legal department for full documentation regarding Privacy Policy and Terms of Service.</p>
        <p className="text-gray-500">Last updated: January 2026</p>
      </div>
    </div>
  </div>
);

// --- MAIN APP ---
function App() {
  const location = useLocation();
  const navigate = useNavigate();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="min-h-screen bg-background text-white selection:bg-primary selection:text-white font-sans overflow-x-hidden">
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
          <Route path="*" element={<Home />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </div>
  );
}

export default App;
