import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation, Link } from 'react-router-dom';
import { Shield, Menu, X, CheckCircle, Users, Mail, Activity, ArrowRight, Globe, Terminal, FileText, Award, Twitter, Linkedin, Building, Stethoscope, Scale } from 'lucide-react';
// Custom SEO component to replace react-helmet-async
const PageMeta = ({ title, description }: { title: string, description?: string }) => {
  useEffect(() => {
    document.title = title;
    if (description) {
      let meta = document.querySelector("meta[name='description']");
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", "description");
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", description);
    }
  }, [title, description]);
  return null;
};
import { AnimatePresence, motion, useScroll, useInView, useAnimation } from 'framer-motion';
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Explicitly check window to avoid SSR issues (though simple here)

const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;


// --- UTILS ---
function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }



// --- DATA ---
const CONTACT_INFO = { email: "contact@humanls.com", phone: "3052820302", founder: "Nicolas Su Nobrega Garces" };

const QUOTES = [
  { text: "Amateurs hack systems, professionals hack people.", author: "Bruce Schneier" },
  { text: "There is no patch for human stupidity.", author: "Kevin Mitnick" },
  { text: "Security is not a product, but a process.", author: "Bruce Schneier" },
  { text: "Social engineering bypasses all technologies.", author: "Kevin Mitnick" },
  { text: "Humans are the weakest link in security.", author: "Kevin Mitnick" }
];




// --- ANIMATION VARIANTS ---
// --- ANIMATION SYSTEM ---
const EASING = [0.22, 1, 0.36, 1]; // Custom cubic-bezier for "buttery" feel

const fadeInUp = {
  hidden: {
    opacity: 0,
    y: prefersReducedMotion ? 0 : 40,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: prefersReducedMotion ? 0.01 : 0.6,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
      when: "beforeChildren"
    }
  }
};



// --- CUSTOM INTERACTION COMPONENTS ---

const Reveal: React.FC<{ children: React.ReactNode, width?: "fit-content" | "100%", delay?: number, className?: string }> = ({ children, width = "fit-content", delay = 0, className = "" }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-75px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      variants={{
        hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay, ease: EASING } }
      }}
      initial="hidden"
      animate={controls}
      className={className}
      style={{ width, willChange: 'transform, opacity' }}
    >
      {children}
    </motion.div>
  );
};

const CountUp: React.FC<{ from?: number, to: number, duration?: number, suffix?: string, className?: string }> = ({ from = 0, to, duration = 2, suffix = "", className }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(from);

  useEffect(() => {
    if (isInView) {
      let startTime: number;
      let animationFrame: number;

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        const percentage = Math.min(progress / (duration * 1000), 1);

        // Easing function: easeOutExpo
        const ease = percentage === 1 ? 1 : 1 - Math.pow(2, -10 * percentage);

        setCount(from + (to - from) * ease);

        if (percentage < 1) {
          animationFrame = requestAnimationFrame(animate);
        }
      };

      animationFrame = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationFrame);
    }
  }, [isInView, from, to, duration]);

  return <span ref={ref} className={className}>{Math.floor(count)}{suffix}</span>;
};

const TextReveal: React.FC<{ children: string, className?: string }> = ({ children, className }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <span ref={ref} className={cn("inline-block overflow-hidden", className)}>
      <motion.span
        initial={{ y: "100%", opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="inline-block"
      >
        {children}
      </motion.span>
    </span>
  );
};

const CardShimmer = () => (
  <div className="absolute inset-0 overflow-hidden rounded-[inherit] pointer-events-none">
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
      initial={{ x: "-100%" }}
      animate={{ x: "200%" }}
      transition={{
        duration: 2,
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: 5
      }}
    />
  </div>
);

const CardWithMagnet: React.FC<{ children: React.ReactNode, className?: string, onClick?: () => void }> = ({ children, className, ...props }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 20;
    const y = (e.clientY - rect.top - rect.height / 2) / 20;
    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: mousePosition.x, y: mousePosition.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

const ImageWithLoad: React.FC<{ src: string, alt: string, className?: string }> = ({ src, alt, className }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: loaded ? 0 : 1 }}
        className="absolute inset-0 bg-surface/50 backdrop-blur-sm flex items-center justify-center pointer-events-none z-10"
      >
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </motion.div>

      <motion.img
        src={src}
        alt={alt}
        className={className}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: loaded ? 1 : 0, scale: loaded ? 1 : 0.95 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
};

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary to-emerald-400 origin-left z-50"
      style={{ scaleX: scrollYProgress }}
    />
  );
};

// --- UI COMPONENTS ---
// --- UI COMPONENTS ---
const Button: React.FC<Omit<React.ComponentProps<typeof motion.button>, 'children'> & { variant?: 'primary' | 'outline' | 'ghost', size?: 'sm' | 'md' | 'lg', children: React.ReactNode }> = ({ className, variant = 'primary', size = 'md', children, ...props }) => {
  const base = "inline-flex items-center justify-center font-display font-semibold transition-all focus:outline-none disabled:opacity-50 rounded-full cursor-pointer relative overflow-hidden group transform-gpu";
  const vars = {
    primary: "bg-primary text-black hover:bg-green-400 shadow-[0_0_30px_rgba(34,197,94,0.4),0_0_60px_rgba(34,197,94,0.2),0_0_90px_rgba(34,197,94,0.1)] hover:shadow-[0_0_40px_rgba(34,197,94,0.6),0_0_80px_rgba(34,197,94,0.3),0_0_120px_rgba(34,197,94,0.15)] border border-transparent",
    outline: "border border-white/20 text-white hover:border-primary hover:text-primary bg-transparent hover:bg-white/5",
    ghost: "text-white/70 hover:text-white hover:bg-white/5"
  };
  const sizes = { sm: "h-9 px-4 text-xs", md: "h-12 px-8 text-sm", lg: "h-14 px-10 text-base" };

  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();

    setRipples(prev => [...prev, { x, y, id }]);
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== id));
    }, 600);

    if (props.onClick) props.onClick(e);
  };

  return (
    <motion.button
      onClick={handleClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(base, vars[variant], sizes[size], className)}
      {...props}
    >
      {ripples.map(ripple => (
        <motion.span
          key={ripple.id}
          className="absolute rounded-full bg-white/30"
          initial={{ width: 0, height: 0, x: ripple.x, y: ripple.y }}
          animate={{ width: 300, height: 300, x: ripple.x - 150, y: ripple.y - 150, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{ pointerEvents: 'none' }}
        />
      ))}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  );
};





const ACCENT_COLORS: Record<string, { text: string; border: string; bg: string; shadow: string; hoverShadow: string }> = {
  emerald: { text: "text-emerald-400", border: "border-emerald-500/20", bg: "bg-emerald-500/10", shadow: "shadow-[0_0_50px_rgba(16,185,129,0.2)]", hoverShadow: "hover:shadow-[0_0_40px_rgba(16,185,129,0.15)]" },
  amber: { text: "text-amber-400", border: "border-amber-500/20", bg: "bg-amber-500/10", shadow: "shadow-[0_0_50px_rgba(245,158,11,0.2)]", hoverShadow: "hover:shadow-[0_0_40px_rgba(245,158,11,0.15)]" },
  cyan: { text: "text-cyan-400", border: "border-cyan-400/20", bg: "bg-cyan-500/10", shadow: "shadow-[0_0_50px_rgba(34,211,238,0.2)]", hoverShadow: "hover:shadow-[0_0_40px_rgba(34,211,238,0.15)]" },
  rose: { text: "text-rose-400", border: "border-rose-500/20", bg: "bg-rose-500/10", shadow: "shadow-[0_0_50px_rgba(244,63,94,0.2)]", hoverShadow: "hover:shadow-[0_0_40px_rgba(244,63,94,0.15)]" },
  violet: { text: "text-violet-400", border: "border-violet-400/20", bg: "bg-violet-500/10", shadow: "shadow-[0_0_50px_rgba(167,139,250,0.2)]", hoverShadow: "hover:shadow-[0_0_40px_rgba(167,139,250,0.15)]" },
  orange: { text: "text-orange-400", border: "border-orange-400/20", bg: "bg-orange-500/10", shadow: "shadow-[0_0_50px_rgba(251,146,60,0.2)]", hoverShadow: "hover:shadow-[0_0_40px_rgba(251,146,60,0.15)]" }
};

const Section: React.FC<{ children: React.ReactNode, className?: string, id?: string }> = ({ children, className = "", id }) => (
  <section id={id} className={cn("py-20 md:py-24 px-6 relative overflow-hidden bg-transparent", className)}>
    {/* Subtle grid overlay — global BackgroundLayers handles the heavy lifting */}
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none -z-10" />

    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
      className="max-w-7xl mx-auto relative z-10"
    >
      {children}
    </motion.div>
  </section>
);



const HowWeWork = () => (
  <Section className="bg-transparent relative overflow-hidden">

    <div className="text-center mb-20 relative z-10">
      <Reveal className="inline-block" width="100%">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold mb-6 uppercase tracking-widest">
          <Activity className="w-3 h-3" /> Process
        </div>
      </Reveal>
      <Reveal delay={0.1} width="100%"><h2 className="text-4xl md:text-5xl font-bold text-white mb-6">How We <span className="text-primary">Work</span></h2></Reveal>
      <Reveal delay={0.2} width="100%"><p className="text-gray-400 max-w-2xl mx-auto text-lg">Four steps to turn your biggest vulnerability into your strongest defense.</p></Reveal>
    </div>

    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="grid md:grid-cols-4 gap-6 relative z-10"
    >
      {[
        { t: "Test", d: "Realistic phishing emails. Custom templates. Real threats.", i: Mail, step: "01", c: "text-cyan-400", bg: "group-hover:bg-cyan-500/20", shadow: "group-hover:shadow-[0_0_25px_rgba(34,211,238,0.15)]" },
        { t: "Catch", d: "Safe fail page. No shame. No reporting to manager.", i: FileText, step: "02", c: "text-rose-400", bg: "group-hover:bg-rose-500/20", shadow: "group-hover:shadow-[0_0_25px_rgba(244,63,94,0.15)]" },
        { t: "Teach", d: "90-second instant lesson. Teach the 'why' and 'how'.", i: Activity, step: "03", c: "text-amber-400", bg: "group-hover:bg-amber-500/20", shadow: "group-hover:shadow-[0_0_25px_rgba(245,158,11,0.15)]" },
        { t: "Improve", d: "Track metrics. Watch click rates drop. Export reports.", i: CheckCircle, step: "04", c: "text-emerald-400", bg: "group-hover:bg-emerald-500/20", shadow: "group-hover:shadow-[0_0_25px_rgba(16,185,129,0.15)]" }
      ].map((s, i) => (
        <motion.div variants={fadeInUp} key={i} className="group relative p-8 bg-black/40 border border-white/5 rounded-[2rem] hover:bg-white/[0.03] hover:border-white/10 transition-all duration-300 will-change-transform overflow-hidden" whileHover={{ y: -5, transition: { duration: 0.3 } }}>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/[0.03] rounded-full blur-[40px] pointer-events-none group-hover:bg-white/[0.06] transition-colors" />

          <div className="inline-block px-3 py-1 mb-6 border border-white/10 rounded-full text-xs font-mono font-bold group-hover:border-white/20 transition-colors text-gray-400 bg-surface">
            STEP {s.step}
          </div>

          <div className={cn("mb-6 w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center transition-all duration-300 group-hover:scale-110", s.c, s.bg, s.shadow)}>
            <s.i className="w-7 h-7" />
          </div>

          <h3 className="text-xl font-bold text-white mb-3">{s.t}</h3>
          <p className="text-gray-400 text-sm leading-relaxed">{s.d}</p>
        </motion.div>
      ))}
    </motion.div>
  </Section>
);

const WhyChoose = () => (
  <Section className="bg-transparent relative overflow-hidden">

    <div className="text-center mb-16 relative z-10">
      <Reveal width="100%">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300 text-xs font-bold mb-6 uppercase tracking-widest backdrop-blur-md">
          <Shield className="w-3 h-3 text-primary" /> The Standard
        </div>
      </Reveal>
      <Reveal delay={0.1} width="100%">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Why Companies Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">Human Layer</span>
        </h2>
      </Reveal>
      <Reveal delay={0.2} width="100%">
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          We built this platform to solve the problems other security training companies ignore.
        </p>
      </Reveal>
    </div>

    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto relative z-10">
      {[
        { t: "Zero Shame", d: "No public humiliation. Just private, immediate training.", i: Shield, c: "text-emerald-400", border: "group-hover:border-emerald-500/50", shadow: "group-hover:shadow-[0_0_50px_rgba(16,185,129,0.2)]", iconBg: "bg-emerald-500/10" },
        { t: "Compliance Ready", d: "Automatic SOC 2, ISO 27001, & HIPAA documentation.", i: Award, c: "text-amber-400", border: "group-hover:border-amber-500/50", shadow: "group-hover:shadow-[0_0_50px_rgba(245,158,11,0.2)]", iconBg: "bg-amber-500/10" },
        { t: "5 Minute Setup", d: "No IT department needed. Launch your first campaign today.", i: Activity, c: "text-cyan-400", border: "group-hover:border-cyan-400/50", shadow: "group-hover:shadow-[0_0_50px_rgba(34,211,238,0.2)]", iconBg: "bg-cyan-500/10" },
        { t: "Real Templates", d: "Law firms get court notices. Finance gets wire transfers.", i: FileText, c: "text-rose-400", border: "group-hover:border-rose-500/50", shadow: "group-hover:shadow-[0_0_50px_rgba(244,63,94,0.2)]", iconBg: "bg-rose-500/10" },
        { t: "Clear Analytics", d: "Track improvement. Export reports for insurance.", i: Terminal, c: "text-violet-400", border: "group-hover:border-violet-400/50", shadow: "group-hover:shadow-[0_0_50px_rgba(167,139,250,0.2)]", iconBg: "bg-violet-500/10" },
        { t: "Instant Learning", d: "Training happens the second they click. Not next week.", i: Mail, c: "text-orange-400", border: "group-hover:border-orange-400/50", shadow: "group-hover:shadow-[0_0_50px_rgba(251,146,60,0.2)]", iconBg: "bg-orange-500/10" }
      ].map((f, i) => (
        <motion.div
          variants={fadeInUp}
          key={i}
          className={cn(
            "flex flex-col items-start text-left group p-8 rounded-[2rem] border border-white/5 bg-surface/30 backdrop-blur-sm transition-all duration-500 hover:bg-surface/50 cursor-default relative overflow-hidden",
            f.border, f.shadow
          )}
          whileHover={{ y: -4 }}
        >
          <div className={cn("absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-white/5 to-transparent")} />

          <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 shadow-inner border border-white/5", f.iconBg)}>
            <f.i className={cn("w-7 h-7 transition-colors duration-300", f.c)} />
          </div>
          <h3 className="text-xl font-bold text-white mb-3 relative z-10">{f.t}</h3>
          <p className="text-gray-400 leading-relaxed text-sm relative z-10">{f.d}</p>

        </motion.div>
      ))}
    </motion.div>
  </Section>
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
    <nav className={cn("fixed w-full z-50 transition-all duration-300 px-4", scrolled ? "top-4" : "top-0")}>
      <div className={cn(
        "max-w-7xl mx-auto px-6 h-20 flex justify-between items-center transition-all duration-300",
        scrolled ? "glass rounded-full border border-white/10 shadow-lg shadow-black/50" : "bg-transparent border-transparent"
      )}>
        <Link to="/" className="flex items-center gap-3 group relative z-10">
          <img src="/humanlayerlogo.png" alt="Human Layer Security" loading="lazy" decoding="async" className="h-10 sm:h-12 md:h-14 w-auto object-contain transition-all duration-300 group-hover:scale-105 filter drop-shadow-[0_0_8px_rgba(34,197,94,0.3)]" />
          <div className="flex flex-col justify-center gap-0.5">
            <span className="font-display font-bold text-white text-lg md:text-xl tracking-tight leading-none group-hover:text-primary transition-colors">HUMAN&nbsp;&nbsp;LAYER</span>
            <span className="font-display font-bold text-primary text-[10px] md:text-sm tracking-[0.2em] leading-none">SECURITY</span>
          </div>
        </Link>

        <div className="hidden md:flex gap-1 bg-white/5 rounded-full p-1 border border-white/5 backdrop-blur-sm relative z-10">
          {['SERVICES', 'ABOUT', 'PARTNERSHIP'].map((item) => (
            <Link key={item} to={`/${item.toLowerCase()}`} className="relative px-6 py-2 text-xs font-bold text-gray-300 hover:text-white rounded-full transition-colors tracking-wide group">
              <span className="relative z-10">{item}</span>
              {location.pathname === `/${item.toLowerCase()}` && (
                <motion.div layoutId="navbar-indicator" className="absolute inset-0 bg-white/10 rounded-full" transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />
              )}
              <div className="absolute inset-x-0 bottom-0 h-px bg-primary/0 group-hover:bg-primary/50 transition-colors duration-300 origin-left scale-x-0 group-hover:scale-x-100" />
            </Link>
          ))}
        </div>

        <div className="hidden md:flex gap-4 items-center">
          <div className="flex items-center gap-3 pr-4 border-r border-white/10 mr-4">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-gray-400 hover:text-[#1DA1F2] transition-colors"><Twitter className="w-4 h-4" /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-gray-400 hover:text-[#0A66C2] transition-colors"><Linkedin className="w-4 h-4" /></a>
          </div>
          <Link to="/contact"><Button size="sm" className="gap-2 shadow-none hover:shadow-lg bg-green-600 hover:bg-green-500 border-green-500/50 shadow-green-900/20 text-white">Secure My Team</Button></Link>
        </div>

        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>{isOpen ? <X /> : <Menu />}</button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="md:hidden bg-black border-b border-white/10 overflow-hidden absolute top-24 left-4 right-4 rounded-2xl border border-white/10 z-50 shadow-2xl">
            <div className="p-4 flex flex-col gap-2">
              {['SERVICES', 'ABOUT', 'PARTNERSHIP'].map((item) => <Link key={item} to={`/${item.toLowerCase()}`} className="block p-4 text-white hover:bg-white/5 rounded-xl font-bold font-display">{item}</Link>)}
              <div className="flex justify-center gap-6 py-4 border-t border-white/5">
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-gray-400 hover:text-[#1DA1F2] transition-colors"><Twitter className="w-6 h-6" /></a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-gray-400 hover:text-[#0A66C2] transition-colors"><Linkedin className="w-6 h-6" /></a>
              </div>
              <Link to="/contact" className="block p-4 bg-green-600/20 text-green-500 hover:bg-green-600/30 rounded-xl font-bold text-center border border-green-500/20">Secure My Team</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-black border-t border-white/5 pt-0 relative overflow-hidden">
    {/* NEW CTA SECTION */}
    <div className="border-b border-white/5 bg-surface/30 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Ready to Secure <span className="text-primary">Your Team?</span></h2>
          <p className="text-gray-400 max-w-lg">Get a free risk assessment and see your baseline phishing risk in 24 hours.</p>
        </div>
        <div className="flex gap-4 shrink-0">
          <Link to="/contact"><Button size="lg" className="bg-green-600 hover:bg-green-500 text-white">Get Free Assessment</Button></Link>
        </div>
      </div>
    </div>

    <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
      <div className="grid md:grid-cols-4 gap-12 mb-20">
        <div className="col-span-1 md:col-span-2">
          <Link to="/" className="flex items-center gap-4 mb-6 group">
            <img src="/humanlayerlogo.png" alt="Human Layer Security" loading="lazy" decoding="async" className="h-24 w-auto object-contain transition-transform group-hover:scale-102" />
            <div className="flex flex-col justify-center">
              <span className="font-display font-bold text-white text-2xl tracking-tight leading-none group-hover:text-primary transition-colors">HUMAN&nbsp;&nbsp;LAYER</span>
              <span className="font-display font-bold text-primary text-sm tracking-[0.25em] leading-none">SECURITY</span>
            </div>
          </Link>
          <p className="text-gray-400 mb-6 max-w-sm leading-relaxed">
            The first phishing defense platform built for the way people actually learn. No shame. No boring videos. Just real security.
          </p>
          <div className="flex gap-4">
            <Link to="/contact"><Button variant="outline">Contact Support</Button></Link>
          </div>
        </div>
        <div><h4 className="text-white font-bold mb-6 font-display tracking-widest text-sm">COMPANY</h4><ul className="space-y-4 text-sm text-gray-500"><li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li><li><Link to="/services" className="hover:text-primary transition-colors">Services</Link></li><li><Link to="/partnership" className="hover:text-primary transition-colors">Partnerships</Link></li></ul></div>
        <div><h4 className="text-white font-bold mb-6 font-display tracking-widest text-sm">LEGAL</h4><ul className="space-y-4 text-sm text-gray-500"><li><Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li><li><Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li></ul></div>
      </div>
      <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
        <p>© 2026 HumanLayer Security. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0 items-center">
          {/* New X Logo */}
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="X (formerly Twitter)" className="text-gray-400 hover:text-white transition-colors">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 md:w-6 md:h-6">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-gray-400 hover:text-[#0A66C2] transition-colors"><Linkedin className="w-5 h-5 md:w-6 md:h-6" /></a>
          <Link to="/privacy" className="hover:text-white text-sm md:text-base">Privacy</Link>
          <Link to="/terms" className="hover:text-white text-sm md:text-base">Terms</Link>
        </div>
      </div>
    </div>
  </footer>
);

// --- HOME PAGE ---
const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    { q: "Won't this upset our employees?", a: "No — and here's why: We don't report clicks to management. We don't publish 'walls of shame.' We don't make anyone feel stupid. When someone clicks, they see a private learning moment. Most employees actually appreciate the training because it helps them protect themselves." },
    { q: "How is this different from KnowBe4 or Proofpoint?", a: "Three main differences: (1) We're faster to set up (minutes vs weeks), (2) Our scenarios are more realistic because we customize to your actual threats, (3) Our pricing is transparent and simple. Most importantly, we built this platform from scratch in 2024 with modern technology — not legacy systems from 2010." },
    { q: "What if employees figure out it's a test?", a: "That's actually good! It means they're being vigilant. The goal isn't to trick people — it's to build instincts. If someone thinks 'this might be a phishing test,' they're already thinking more carefully about email security. That's exactly what we want." },
    { q: "How long until we see results?", a: "Most companies see measurable improvement within 60–90 days. Click rates typically drop 50–80% within the first six months. But you'll notice behavioral changes sooner — employees start forwarding suspicious emails to IT instead of clicking them." },
    { q: "Do you handle the technical setup?", a: "Yes. Setup takes under 5 minutes. We handle email authentication, domain configuration, and platform setup. You just provide your employee list and select your first campaign. We take care of the technical details." },
    { q: "Can we cancel anytime?", a: "Yes. Month-to-month contracts. Cancel with 30 days notice. No long-term commitments. No cancellation fees. We're confident you'll see value, so we don't lock you in." }
  ];

  return (
    <Section className="bg-black">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">
          Common <span className="text-primary">Questions</span>
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className={cn(
                "p-6 rounded-2xl border transition-all duration-300 cursor-pointer group relative overflow-hidden",
                openIndex === i
                  ? "bg-surface/60 border-primary/30"
                  : "bg-surface/40 border-white/10 hover:border-primary/20"
              )}
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            >
              {/* Gradient background on open */}
              <div className={cn(
                "absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-300",
                openIndex === i && "opacity-100"
              )} />

              {/* Question */}
              <div className="flex justify-between items-center relative z-10">
                <span className="font-bold text-white text-lg pr-4">{faq.q}</span>
                <motion.div
                  animate={{ rotate: openIndex === i ? 90 : 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <ArrowRight className="w-5 h-5 text-primary shrink-0" />
                </motion.div>
              </div>

              {/* Answer */}
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="mt-4 text-gray-400 leading-relaxed relative z-10">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-400 mb-4">Still have questions?</p>
          <Link to="/contact"><Button variant="outline">Talk to Us</Button></Link>
        </div>
      </div>
    </Section>
  );
};

const BackgroundLayers = () => (
  <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
    {/* Noise Overlay */}
    <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay">
      <svg width="100%" height="100%">
        <filter id="global-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#global-noise)" />
      </svg>
    </div>

    {/* Global Gradient Grid */}
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808006_1px,transparent_1px),linear-gradient(to_bottom,#80808006_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

    {/* Primary Glow — single, subtle */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,_rgba(34,197,94,0.06),transparent_60%)]" />

    {/* Single slow-moving orb for depth */}
    <motion.div
      className="absolute top-[-10%] left-[20%] w-[700px] h-[700px] bg-primary/[0.03] rounded-full blur-[150px]"
      animate={{ x: [0, 60, 0], y: [0, -40, 0] }}
      transition={{ duration: 30, ease: "easeInOut", repeat: Infinity }}
    />
    <motion.div
      className="absolute bottom-[-15%] right-[10%] w-[500px] h-[500px] bg-emerald-500/[0.02] rounded-full blur-[150px]"
      animate={{ x: [0, -40, 0], y: [0, 30, 0] }}
      transition={{ duration: 35, ease: "easeInOut", repeat: Infinity }}
    />
  </div>
);

const ScrollMouse = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) setVisible(false);
      else setVisible(true);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 10 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center gap-2 cursor-pointer mt-8 pointer-events-auto"
      onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
      style={{ pointerEvents: visible ? 'auto' : 'none' }}
    >
      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">Scroll to Explore</span>
      <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1 bg-black/30 hover:border-primary/40 transition-colors">
        <motion.div
          className="w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_6px_rgba(34,197,94,0.8)]"
          animate={{ y: [0, 18, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </motion.div>
  );
};

const Home = () => {
  const navigate = useNavigate();
  const [quote, setQuote] = useState(QUOTES[0]);




  useEffect(() => {
    // Random quote on mount/refresh
    setQuote(QUOTES[Math.floor(Math.random() * QUOTES.length)]);
  }, []);



  return (
    <>
      <ScrollProgress />
      <BackgroundLayers />

      <PageMeta
        title="HumanLayer Security | Stop Phishing Attacks Before They Click"
        description="AI-powered phishing defense that trains your employees in real-time. Shame-free, instant feedback. Setup in 5 minutes."
      />
      {/* HERO */}
      <section className="relative min-h-[95vh] flex flex-col items-center justify-center pt-20 overflow-hidden">

        <div className="max-w-7xl mx-auto px-6 w-full flex flex-col items-center text-center pt-10 pb-8 relative z-10">

          {/* 1. TITLE SECTION */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-5xl mx-auto mb-12">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold mb-8 uppercase tracking-widest mx-auto">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" /> Phishing Defense Platform
              </div>
            </Reveal>
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
              <TextReveal>One phishing email can</TextReveal> <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-red-500">destroy your business.</span>
            </h1>
          </motion.div>

          {/* 2. IMAGE SECTION WITH BADGES */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative w-full max-w-3xl mb-12 sm:mb-16 group px-4"
          >
            <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full opacity-20 pointer-events-none" />
            <ImageWithLoad src="/hero-network.png" alt="Human Defense Network" className="relative z-10 w-full h-auto object-contain drop-shadow-2xl max-h-[250px] sm:max-h-[300px] md:max-h-[400px] opacity-80 mix-blend-screen hover:opacity-100 hover:mix-blend-normal transition-all duration-700" />

            {/* Float Badge 1: Team Awareness */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="hidden sm:flex absolute top-[20%] left-[5%] md:left-[-5%] z-20 bg-black/80 backdrop-blur-md border border-white/10 p-3 sm:p-4 rounded-2xl shadow-2xl items-center gap-3 sm:gap-4"
            >
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Activity className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="text-xs text-gray-400 font-bold uppercase tracking-wider">Team Awareness</div>
                <div className="text-white font-bold text-lg flex items-center gap-2">
                  Growing <span className="text-emerald-400 text-xs bg-emerald-500/10 px-2 py-0.5 rounded-full">+124%</span>
                </div>
              </div>
            </motion.div>

            {/* Float Badge 2: Training Style */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="hidden sm:flex absolute bottom-[20%] right-[5%] md:right-[-5%] z-20 bg-black/80 backdrop-blur-md border border-white/10 p-3 sm:p-4 rounded-2xl shadow-2xl items-center gap-3 sm:gap-4"
            >
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                <CheckCircle className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="text-xs text-gray-400 font-bold uppercase tracking-wider">Training Style</div>
                <div className="text-white font-bold text-lg">Instant & Active</div>
              </div>
            </motion.div>
          </motion.div>

          {/* 3. SUBTEXT & CTA */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="max-w-5xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-10 leading-[1.1] tracking-tight">
              We train your team to <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-300">recognize threats</span><br className="hidden md:block" /> before they click.
            </h2>
            <div className="flex gap-4 justify-center flex-wrap mb-16">
              <Link to="/contact">
                <Button size="lg" className="bg-green-600 hover:bg-green-500 shadow-[0_0_30px_rgba(34,197,94,0.3)] text-white h-14 px-8 text-base md:h-16 md:px-12 md:text-lg">
                  Get Free Risk Assessment
                </Button>
              </Link>
              <Link to="/services">
                <Button size="lg" variant="outline" className="h-14 px-8 text-base md:h-16 md:px-12 md:text-lg bg-black/50 backdrop-blur-md">
                  See How It Works
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap justify-center gap-4 sm:gap-8 text-sm font-medium text-gray-400">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-primary" /> No Shame Policy
              </div>
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-primary" /> Setup in 5 Minutes
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-primary" /> Compliance Included
              </div>
            </div>
          </motion.div>

          <ScrollMouse />
        </div>
      </section>

      {/* MARQUEE */}
      {/* TRUSTED SECTORS & COMPANIES */}
      <div className="border-y border-white/5 bg-black/40 backdrop-blur-sm relative z-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row">

          {/* High Risk Sectors */}
          <div className="flex-1 p-6 border-b md:border-b-0 md:border-r border-white/5 flex items-center justify-center md:justify-start gap-6 overflow-hidden">
            <span className="text-gray-500 font-mono text-[10px] font-bold tracking-widest uppercase shrink-0">Trusted in High-Risk Sectors</span>
            <div className="flex gap-8 opacity-60">
              <div className="flex items-center gap-2 text-gray-300"><Scale className="w-4 h-4" /><span className="text-xs font-bold tracking-wider">LEGAL</span></div>
              <div className="flex items-center gap-2 text-gray-300"><Building className="w-4 h-4" /><span className="text-xs font-bold tracking-wider">FINANCE</span></div>
              <div className="flex items-center gap-2 text-gray-300"><Stethoscope className="w-4 h-4" /><span className="text-xs font-bold tracking-wider">HEALTHCARE</span></div>
            </div>
          </div>

          {/* Trusted By Companies (Placeholder) */}
          <div className="flex-1 p-6 flex items-center justify-center md:justify-start gap-6 overflow-hidden">
            <span className="text-gray-500 font-mono text-[10px] font-bold tracking-widest uppercase shrink-0">Trusted By</span>
            <div className="flex gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
              {/* Text Logos for Premium Feel */}
              <span className="text-lg font-display font-bold text-white">Lumina</span>
              <span className="text-lg font-display font-bold text-white">Vanguard</span>
              <span className="text-lg font-display font-bold text-white">Apex</span>
              <span className="text-lg font-display font-bold text-white">Nexus</span>
            </div>
          </div>
        </div>
      </div>

      {/* FEATURE MARQUEE */}
      <div className="bg-primary/5 border-b border-white/5 backdrop-blur-sm overflow-hidden py-3 flex relative z-20">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black z-10 pointer-events-none" />
        <div
          className="flex gap-20 whitespace-nowrap"
          style={{ animation: 'marquee 60s linear infinite', willChange: 'transform' }}
        >
          {/* Duplicate content for loop */}
          {[...Array(6)].map((_, setIndex) => (
            <React.Fragment key={setIndex}>
              <span className="text-primary/80 font-mono text-xs tracking-[0.2em] uppercase flex items-center gap-3 font-bold">
                <Shield className="w-4 h-4" /> Zero Shame Training
              </span>
              <span className="text-primary/80 font-mono text-xs tracking-[0.2em] uppercase flex items-center gap-3 font-bold">
                <Award className="w-4 h-4" /> Compliance Ready
              </span>
              <span className="text-primary/80 font-mono text-xs tracking-[0.2em] uppercase flex items-center gap-3 font-bold">
                <Activity className="w-4 h-4" /> 5 Minute Setup
              </span>
              <span className="text-primary/80 font-mono text-xs tracking-[0.2em] uppercase flex items-center gap-3 font-bold">
                <FileText className="w-4 h-4" /> Industry Specific
              </span>
              <span className="text-primary/80 font-mono text-xs tracking-[0.2em] uppercase flex items-center gap-3 font-bold">
                <Terminal className="w-4 h-4" /> Monthly Analytics
              </span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* WHY US SECTION */}
      <WhyChoose />

      {/* THE PROBLEM SECTION */}
      < Section className="bg-black border-y border-white/5" >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">Why Your Current Training <span className="text-primary">Isn't Working</span></h2>

          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              { val: "82%", label: "of breaches involve phishing", color: "text-rose-400", border: "border-rose-900/20", bg: "bg-rose-950/10" },
              { val: "$4.9M", label: "average cost of a data breach", color: "text-rose-400", border: "border-rose-900/20", bg: "bg-rose-950/10" },
              { val: "90%", label: "of employees forget training in 30 days", color: "text-rose-400", border: "border-rose-900/20", bg: "bg-rose-950/10" }
            ].map((stat, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                whileHover={{ borderColor: "rgba(255,255,255,0.15)" }}
                className={cn("p-8 rounded-2xl border transition-colors duration-300 relative group overflow-hidden", stat.bg, stat.border)}
              >
                <div className="absolute inset-0 bg-rose-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className={cn("text-5xl font-bold mb-4", stat.color)}>{stat.val}</div>
                <p className="text-gray-300 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

          <p className="text-xl text-gray-300 leading-relaxed mb-8">Annual compliance videos don't work. Generic "be careful" warnings don't work. Your employees need <span className="text-primary font-bold">practice with immediate feedback</span> — the same way you learned any other skill.</p>

          <Link to="/services"><Button variant="outline">See Our Approach</Button></Link>
        </div>
      </Section >

      {/* HOW WE WORK */}
      <HowWeWork />

      {/* SERVICES PREVIEW */}
      < Section id="services-preview" >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div className="mb-6 md:mb-0"><h2 className="text-4xl md:text-5xl font-bold text-white mb-6">What You <span className="text-primary">Get</span></h2><p className="text-gray-400 text-lg">Everything you need to build a security aware team. Nothing you don't.</p></div>
          <Button variant="outline" className="hidden md:flex" onClick={() => navigate('/services')}>View All Features</Button>
        </div>
        <div className="grid grid-cols-1 gap-8 relative z-10">
          {[
            { t: "Realistic Attack Simulations", d: "We send phishing emails that look and feel exactly like real attacks—because they're based on real attacks. Your employees see them in their actual inbox. They make decisions under real conditions.", i: Shield, c: "text-emerald-400", border: "border-emerald-500/20", gradient: "from-emerald-500/10 to-transparent" },
            { t: "Training at the Point of Failure", d: "The second someone clicks a phishing link, they see what they missed and why it worked. Not next week in a training session. Not in an annual compliance video. Right now.", i: Users, c: "text-blue-400", border: "border-blue-500/20", gradient: "from-blue-500/10 to-transparent" },
            { t: "Monthly Intelligence Reports", d: "See exactly where your vulnerabilities are. Who's clicking. What's working. Which departments need extra training. Export compliance reports for auditors.", i: FileText, c: "text-purple-400", border: "border-purple-500/20", gradient: "from-purple-500/10 to-transparent" },
            { t: "Compliance Documentation", d: "Generate documentation automatically. SOC 2, ISO 27001, CMMC — formatted correctly and ready to submit. Your auditor gets what they need. You get back to work.", i: Award, c: "text-amber-400", border: "border-amber-500/20", gradient: "from-amber-500/10 to-transparent" }
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={cn("flex flex-col md:flex-row gap-8 p-8 md:p-10 rounded-[2rem] bg-surface/30 backdrop-blur-md border hover:border-white/20 transition-all duration-300 group hover:shadow-2xl", s.border)}
            >
              <div className="shrink-0 relative">
                <div className={cn("absolute inset-0 bg-gradient-to-br blur-2xl opacity-20 group-hover:opacity-40 transition-opacity", s.gradient)} />
                <div className="w-20 h-20 rounded-full bg-black/50 border border-white/10 flex items-center justify-center relative z-10">
                  <s.i className={cn("w-10 h-10", s.c)} />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">{s.t}</h3>
                <p className="text-gray-400 leading-relaxed text-lg">{s.d}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* PRICING PREVIEW */}
        <div className="mt-16 p-10 rounded-3xl bg-surface/60 border border-white/10 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">Simple, <span className="text-primary">Transparent Pricing</span></h3>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">From startups to enterprises. Month to month contracts. Cancel anytime.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mb-8">
            {/* STARTER */}
            <div className="p-6 rounded-2xl bg-black/40 border border-white/10 text-left hover:border-primary/30 transition-colors">
              <div className="text-sm text-primary font-bold uppercase tracking-wider mb-2">Starter</div>
              <div className="text-3xl font-bold text-white mb-1">$299<span className="text-lg text-gray-500">/mo</span></div>
              <div className="text-sm text-gray-500 mb-6">Up to 50 employees</div>
              <ul className="space-y-3 text-sm text-gray-300 mb-6">
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" /> <span><strong className="text-white">8 campaigns/month</strong></span></li>
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" /> <span><strong className="text-white">50+ templates</strong> (industry-specific)</span></li>
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" /> <span><strong className="text-white">No shame policy</strong></span></li>
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" /> <span><strong className="text-white">Compliance certificates</strong></span></li>
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" /> <span>Basic dashboard</span></li>
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" /> <span><strong className="text-white">5 minute setup</strong></span></li>
              </ul>
              <Link to="/contact"><Button variant="outline" className="w-full">Get Started</Button></Link>
            </div>
            {/* PROFESSIONAL */}
            <div className="p-6 rounded-2xl bg-primary/10 border-2 border-primary relative hover:border-primary transition-colors text-left">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-black text-xs font-bold rounded-full">MOST POPULAR</div>
              <div className="text-sm text-primary font-bold uppercase tracking-wider mb-2">Professional</div>
              <div className="text-3xl font-bold text-white mb-1">$799<span className="text-lg text-gray-500">/mo</span></div>
              <div className="text-sm text-gray-500 mb-6">Up to 200 employees</div>
              <ul className="space-y-3 text-sm text-gray-200 mb-6">
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" /> <span><strong className="text-white">Unlimited campaigns</strong></span></li>
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" /> <span><strong className="text-white">Custom template builder</strong></span></li>
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" /> <span><strong className="text-white">No shame policy</strong></span></li>
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" /> <span><strong className="text-white">Advanced compliance certificates</strong></span></li>
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" /> <span><strong className="text-white">Real-time dashboard</strong></span></li>
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" /> <span>API access</span></li>
              </ul>
              <Link to="/contact"><Button className="w-full">Get Started</Button></Link>
            </div>
            {/* ENTERPRISE */}
            <div className="p-6 rounded-2xl bg-black/40 border border-white/10 text-left hover:border-primary/30 transition-colors">
              <div className="text-sm text-primary font-bold uppercase tracking-wider mb-2">Enterprise</div>
              <div className="text-3xl font-bold text-white mb-1">Custom</div>
              <div className="text-sm text-gray-500 mb-6">Unlimited employees</div>
              <ul className="space-y-3 text-sm text-gray-300 mb-6">
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" /> <span>Everything in Pro</span></li>
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" /> <span><strong className="text-white">Dedicated manager</strong></span></li>
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" /> <span><strong className="text-white">White label option</strong></span></li>
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" /> <span><strong className="text-white">Custom compliance</strong></span></li>
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" /> <span>Threat intelligence</span></li>
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" /> <span>99.9% SLA</span></li>
              </ul>
              <Link to="/contact"><Button variant="outline" className="w-full">Contact Sales</Button></Link>
            </div>
          </div>
          <Link to="/contact"><Button>Get Custom Quote</Button></Link>
        </div>

        <div className="flex justify-center mt-12">
          <Link to="/services"><Button size="lg">Explore All Features</Button></Link>
        </div>
      </Section >

      {/* SOCIAL PROOF / VALUE PROP */}
      < Section className="bg-surface/50" >
        <div className="grid md:grid-cols-5 gap-12 items-center">
          <div className="md:col-span-3">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">Why This Approach <span className="text-primary">Works</span></h2>
            <ul className="space-y-6">
              <li className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0 text-primary font-bold">1</div>
                <div>
                  <h4 className="text-2xl md:text-3xl font-bold text-white mb-2">No Shame, <span className="text-primary">Real Learning</span></h4>
                  <p className="text-gray-400 text-lg md:text-xl max-w-2xl leading-relaxed">We don't report clicks to management. We don't publish 'walls of shame.' We don't make anyone feel stupid. When someone clicks, they see a private learning moment. Most employees actually appreciate the training because it helps them protect themselves.</p>
                </div>
              </li>
              <li className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0 text-primary font-bold">2</div>
                <div>
                  <h4 className="text-2xl md:text-3xl font-bold text-white mb-2">You'll See <span className="text-primary">the Difference</span></h4>
                  <p className="text-gray-400 text-lg md:text-xl max-w-2xl leading-relaxed">Month by month, you'll watch click rates drop. You'll see employees start forwarding suspicious emails to IT. You'll notice the shift from "I hope this is safe" to "I know what to look for." The data proves what you'll feel—your team is getting sharper.</p>
                </div>
              </li>
            </ul>
            <div className="mt-8">
              <Link to="/contact"><Button>Start Building Your Defense</Button></Link>
            </div>

            {/* Trusted Industries - MOVED HERE */}
            <div className="mt-12 pt-8 border-t border-white/5">
              <h5 className="text-xs font-bold text-primary tracking-widest uppercase mb-4">Built For Teams In</h5>
              <div className="flex flex-wrap gap-4 text-gray-400 font-display font-bold text-sm">
                <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary" /> Law Firms</span>
                <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary" /> Medical Practices</span>
                <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary" /> Financial Services</span>
                <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary" /> Tech Startups</span>
                <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary" /> Small Businesses</span>
              </div>
            </div>
          </div>

          {/* DYNAMIC QUOTE COMPONENT */}
          <div className="md:col-span-2 relative group perspective-1000 h-full min-h-[250px] flex flex-col justify-center">
            <div className="p-8 rounded-[2.5rem] bg-gradient-to-b from-surface/80 to-black border border-white/10 relative overflow-hidden backdrop-blur-xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-[50px]" />

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest mb-6 border border-primary/20">
                <Activity className="w-3 h-3" /> Security Tip
              </div>

              <blockquote className="text-xl md:text-2xl font-bold text-white leading-tight mb-6">
                "{quote.text}"
              </blockquote>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-white">
                  {quote.author.split(' ')[0][0]}{quote.author.split(' ')[1]?.[0]}
                </div>
                <div className="text-sm font-mono text-gray-400 uppercase tracking-wider">
                  {quote.author}
                </div>
              </div>
            </div>
          </div>

        </div>
      </Section >
      {/* PROOF SECTION */}
      < Section className="bg-black" >
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Results That <span className="text-primary">Actually Matter</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">This isn't theory. These are real metrics from companies using our platform.</p>
        </div>

        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Case Study 1 */}
          <CardWithMagnet className="p-8 rounded-3xl bg-surface/40 border border-white/10 transition-colors duration-300 group cursor-default">
            <CardShimmer />
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xl group-hover:scale-110 transition-transform">LS</div>
                <div><div className="font-bold text-white text-lg">Law Firm, 75 employees</div><div className="text-sm text-gray-500 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-primary/50" /> Miami, FL</div></div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-4 rounded-2xl bg-black/40 border border-white/5 group-hover:border-white/10 transition-colors">
                  <div className="text-sm text-gray-500 mb-1 uppercase tracking-wider font-bold">Before</div>
                  <div className="text-4xl font-bold text-red-400">41%</div>
                  <div className="text-xs text-gray-400 mt-1">click rate</div>
                </div>
                <div className="p-4 rounded-2xl bg-primary/5 border border-primary/20 group-hover:border-primary/50 transition-colors">
                  <div className="text-sm text-primary/80 mb-1 uppercase tracking-wider font-bold">After 90 days</div>
                  <div className="text-4xl font-bold text-primary">7%</div>
                  <div className="text-xs text-primary/60 mt-1">click rate</div>
                </div>
              </div>
              <p className="text-gray-300 text-lg italic leading-relaxed">"We went from being terrified of phishing to confident our team can spot it. The training actually works because it happens right when someone makes a mistake."</p>
            </div>
          </CardWithMagnet>

          {/* Case Study 2 */}
          <CardWithMagnet className="p-8 rounded-3xl bg-surface/40 border border-white/10 transition-colors duration-300 group cursor-default">
            <CardShimmer />
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xl group-hover:scale-110 transition-transform">MC</div>
                <div><div className="font-bold text-white text-lg">Medical Practice, 120 employees</div><div className="text-sm text-gray-500 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-primary/50" /> Boston, MA</div></div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-4 rounded-2xl bg-black/40 border border-white/5 group-hover:border-white/10 transition-colors">
                  <div className="text-sm text-gray-500 mb-1 uppercase tracking-wider font-bold">Before</div>
                  <div className="text-4xl font-bold text-red-400">38%</div>
                  <div className="text-xs text-gray-400 mt-1">click rate</div>
                </div>
                <div className="p-4 rounded-2xl bg-primary/5 border border-primary/20 group-hover:border-primary/50 transition-colors">
                  <div className="text-sm text-primary/80 mb-1 uppercase tracking-wider font-bold">After 6 months</div>
                  <div className="text-4xl font-bold text-primary">2.4%</div>
                  <div className="text-xs text-primary/60 mt-1">click rate</div>
                </div>
              </div>
              <p className="text-gray-300 text-lg italic leading-relaxed">"It's set-and-forget for me. The platform automatically handles the campaigns and training. I just check the monthly report and see the numbers going down."</p>
            </div>
          </CardWithMagnet>
        </motion.div>

        <div className="text-center p-10 rounded-3xl bg-primary/5 border border-primary/20">
          <h3 className="text-2xl font-bold text-white mb-4">Want to see these results for your team?</h3>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">Let's run a baseline assessment. We'll show you where your vulnerabilities are, then demonstrate how the platform works with your actual team.</p>
          <Link to="/contact"><Button size="lg">Schedule Free Assessment</Button></Link>
        </div>
      </Section >

      {/* FAQ SECTION */}
      < FAQ />
    </>
  );
};

// --- INNER PAGES ---
const PageHeader: React.FC<{ title: string, subtitle: string }> = ({ title, subtitle }) => (
  <section className="pt-40 pb-20 px-6 relative overflow-hidden">
    {/* ADD GRADIENT BACKGROUND */}
    <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/10 to-transparent opacity-30 pointer-events-none" />
    <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-emerald-500/5 to-transparent opacity-20 pointer-events-none" />

    <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-7xl mx-auto relative z-10">
      <Reveal>
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
          {title.split(' ').slice(0, Math.ceil(title.split(' ').length / 2)).join(' ')} <span className="text-primary">{title.split(' ').slice(Math.ceil(title.split(' ').length / 2)).join(' ')}</span>
        </h1>
      </Reveal>
      <Reveal delay={0.2}>
        <p className="text-xl text-gray-400 max-w-2xl leading-relaxed border-l-4 border-primary pl-6">{subtitle}</p>
      </Reveal>
    </motion.div>
  </section>
);

const Services = () => (
  <div className="min-h-screen bg-background text-white pb-20 relative">
    <BackgroundLayers />
    <PageMeta
      title="Services | HumanLayer Security"
      description="Phishing simulations, real-time training, and compliance reporting. See our full suite of security tools."
    />
    <PageHeader title="Our Services" subtitle="Realistic phishing tests. Instant training. Clear analytics. Built by cybersecurity professionals who understand how attackers actually operate." />
    <Section className="!pt-0">
      <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="grid md:grid-cols-2 lg:grid-cols-6 gap-6">
        {[
          { t: "Monthly Phishing Simulations", d: "Regular phishing emails designed to mimic real attacks.", i: Activity, span: "lg:col-span-3", accent: "emerald" },
          { t: "Instant, Targeted Training", d: "Brief, relevant learning moments right when failures occur.", i: Globe, span: "lg:col-span-3", accent: "cyan" },
          { t: "Clear Analytics Dashboard", d: "Track improvement, identify patterns, and export reports.", i: Terminal, span: "lg:col-span-2", accent: "violet" },
          { t: "Direct Platform Support", d: "Direct access to the security team that built the platform.", i: Shield, span: "lg:col-span-2", accent: "amber" },
          { t: "Role-Specific Scenarios", d: "Customized threats for Finance, HR, IT, and Executives.", i: Mail, span: "lg:col-span-2", accent: "rose" }
        ].map((s, i) => (
          <motion.div
            variants={fadeInUp}
            key={i}
            className={twMerge(
              "flex flex-col p-8 border bg-surface/40 backdrop-blur-sm rounded-3xl hover:bg-surface/60 transition-all duration-300 group relative overflow-hidden min-h-[280px]",
              s.span,
              ACCENT_COLORS[s.accent].border,
              ACCENT_COLORS[s.accent].hoverShadow
            )}
          >
            <CardShimmer />
            <div className={cn(
              "w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-all duration-300 ease-out border border-white/5 relative z-10 mb-6",
              ACCENT_COLORS[s.accent].bg
            )}>
              <s.i className={cn("w-8 h-8 transition-colors", ACCENT_COLORS[s.accent].text)} />
            </div>

            <div className="relative z-10 flex-1">
              <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-primary transition-colors">
                {s.t}
              </h3>
              <p className="text-gray-400 leading-relaxed text-sm md:text-base">{s.d}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Section>

    {/* COMPARISON SECTION */}
    <Section className="bg-surface/30 border-y border-white/5">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Why We're <span className="text-primary">Better</span></h2>
        <p className="text-gray-400 max-w-2xl mx-auto">The old way of doing security training is broken. Here's how we fixed it.</p>
      </div>
      <div className="overflow-x-auto -mx-6 px-6">
        <div className="min-w-[768px]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10">
                <th className="p-4 text-gray-500 font-normal">Feature</th>
                <th className="p-4 text-white font-bold text-lg bg-surface/50 border-x border-white/10 w-1/3">HumanLayer Security</th>
                <th className="p-4 text-gray-500 font-normal w-1/3">Competitor K</th>
                <th className="p-4 text-gray-500 font-normal w-1/3">Competitor P</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {[
                { f: "Setup Time", h: "5 Minutes", c1: "3+ Weeks", c2: "2+ Weeks" },
                { f: "Shame Policy", h: "Zero Shame (Private)", c1: "Report to Manager", c2: "Public \"Wall of Shame\"" },
                { f: "Training Timing", h: "Instant (Point of Failure)", c1: "Next scheduled meeting", c2: "Monthly video" },
                { f: "Content Updates", h: "Weekly", c1: "Quarterly", c2: "Monthly" },
                { f: "Pricing", h: "Transparent/Monthly", c1: "Quote Only/Annual", c2: "Quote Only/Annual" },
              ].map((row, i) => (
                <tr key={i} className="group hover:bg-white/5 transition-colors">
                  <td className="p-4 text-white font-bold">{row.f}</td>
                  <td className="p-4 text-primary font-bold bg-primary/5 border-x border-primary/10">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 shrink-0" /> <span>{row.h}</span>
                    </div>
                  </td>
                  <td className="p-4 text-gray-500">{row.c1}</td>
                  <td className="p-4 text-gray-500">{row.c2}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Section>

    {/* CERTIFICATES */}
    <Section className="bg-black">
      <div className="flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="flex-1">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Compliance <span className="text-primary">Solved</span></h2>
          <p className="text-gray-400 text-lg mb-8 leading-relaxed">
            Stop stressing about audits. We generate the documentation you need automatically. Export perfectly formatted reports for SOC 2, ISO 27001, HIPAA, and cyber insurance carriers.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {['SOC 2 Type II', 'ISO 27001', 'HIPAA', 'CMMC 2.0', 'GDPR', 'PCI-DSS'].map((cert, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-surface/50 border border-white/10">
                <CheckCircle className="text-primary w-5 h-5 shrink-0" />
                <span className="text-white font-bold text-sm">{cert}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1 relative">
          <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full opacity-30" />
          <div className="relative p-8 rounded-2xl bg-surface/80 backdrop-blur-xl border border-white/10 rotate-3 hover:rotate-0 transition-transform duration-300">
            <div className="flex items-center gap-4 mb-6 border-b border-white/10 pb-4">
              <FileText className="w-8 h-8 text-primary" />
              <div>
                <div className="text-white font-bold">Compliance_Report_2026.pdf</div>
                <div className="text-xs text-gray-500">Generated 2 minutes ago</div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="h-2 bg-white/10 rounded w-3/4" />
              <div className="h-2 bg-white/10 rounded w-full" />
              <div className="h-2 bg-white/10 rounded w-5/6" />
              <div className="h-2 bg-white/10 rounded w-4/6" />
            </div>
            <div className="mt-6 flex justify-end">
              <Button size="sm" variant="outline">Download PDF</Button>
            </div>
          </div>
        </div>
      </div>
    </Section>

    {/* SETUP SPEED */}
    <Section className="bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(34,197,94,0.05),transparent_70%)]" />
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-4xl font-bold text-white mb-16">Setup in <span className="text-primary">Minutes</span>, Not Weeks</h2>

        <div className="relative">
          {/* Animated Connecting Line */}
          <div className="absolute top-[2.5rem] left-[10%] right-[10%] h-0.5 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: "0%" }}
              whileInView={{ width: "100%" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="h-full bg-gradient-to-r from-transparent via-primary to-transparent"
            />
          </div>

          <div className="grid grid-cols-3 relative z-10 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-col items-center group cursor-default"
            >
              <div className="w-20 h-20 rounded-full bg-black border-4 border-primary flex items-center justify-center text-2xl font-bold text-white mb-6 shadow-[0_0_30px_rgba(34,197,94,0.4)] relative z-10 group-hover:scale-110 transition-transform duration-300">
                1
              </div>
              <h3 className="text-white font-bold text-lg mb-2 group-hover:text-primary transition-colors">Upload Details</h3>
              <p className="text-sm text-gray-400 max-w-[180px]">Simply upload a CSV of your employees. We parse it automatically.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col items-center group cursor-default"
            >
              <div className="w-20 h-20 rounded-full bg-surface border-4 border-white/10 group-hover:border-primary/50 flex items-center justify-center text-2xl font-bold text-gray-500 group-hover:text-white mb-6 transition-all duration-300 relative z-10 bg-black">
                2
              </div>
              <h3 className="text-gray-300 group-hover:text-white font-bold text-lg mb-2 transition-colors">Select Campaign</h3>
              <p className="text-sm text-gray-500 group-hover:text-gray-400 max-w-[180px] transition-colors">Choose from our industry-specific, ready-to-launch templates.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col items-center group cursor-default"
            >
              <div className="w-20 h-20 rounded-full bg-surface border-4 border-white/10 group-hover:border-primary/50 flex items-center justify-center text-2xl font-bold text-gray-500 group-hover:text-white mb-6 transition-all duration-300 relative z-10 bg-black">
                3
              </div>
              <h3 className="text-gray-300 group-hover:text-white font-bold text-lg mb-2 transition-colors">Launch</h3>
              <p className="text-sm text-gray-500 group-hover:text-gray-400 max-w-[180px] transition-colors">Training begins immediately. Analytics update in real-time.</p>
            </motion.div>
          </div>
        </div>
      </div>
    </Section>

    {/* TRUST BADGES */}
    <Section className="bg-black border-t border-white/5">
      <p className="text-center text-gray-500 text-sm mb-8 uppercase tracking-widest">Securing Teams At</p>
      <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-300">
        {['TechFlow', 'MediCorp', 'LegalShield', 'FinSecure', 'BuildRight'].map((brand, i) => (
          <div key={i} className="text-2xl font-bold text-white flex items-center gap-2">
            <div className="w-8 h-8 bg-white/20 rounded-full" /> {brand}
          </div>
        ))}
      </div>
    </Section>

    {/* REUSED HOW WE WORK SECTION */}
    <HowWeWork />

    <div className="mt-16 text-center bg-black/40 backdrop-blur-md p-8 sm:p-12 md:p-16 rounded-[2rem] sm:rounded-[3rem] border border-white/10 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.3 }
          }
        }}
        className="grid md:grid-cols-3 gap-12 mb-12 relative z-10"
      >
        {/* STAT 1: CIRCULAR GRAPHIC */}
        <motion.div
          variants={{
            hidden: { opacity: 0, scale: 0.8, y: 20 },
            visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", bounce: 0.4, duration: 0.8 } }
          }}
          className="flex flex-col items-center group"
        >
          <div className="relative w-40 h-40 flex items-center justify-center mb-6">
            <svg className="w-full h-full rotate-[-90deg]" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="#262626" strokeWidth="8" />
              <motion.circle
                cx="50" cy="50" r="45" fill="none" stroke="#22C55E" strokeWidth="8"
                strokeDasharray="283"
                initial={{ strokeDashoffset: 283 }}
                whileInView={{ strokeDashoffset: 180 }}
                transition={{ duration: 2, ease: "easeOut" }}
                strokeLinecap="round" className="drop-shadow-[0_0_10px_rgba(34,197,94,0.5)]"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-white"><CountUp to={37} suffix="%" /></div>
          </div>
          <div className="text-sm text-gray-400 uppercase tracking-widest font-bold">Where Most Teams Start</div>
        </motion.div>

        {/* STAT 2: CENTRAL HERO GRAPHIC */}
        <motion.div
          variants={{
            hidden: { opacity: 0, scale: 0.8, y: 20 },
            visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", bounce: 0.4, duration: 0.8 } }
          }}
          className="flex flex-col items-center group"
        >
          <div className="relative w-48 h-48 flex items-center justify-center mb-6">
            <div className="absolute inset-0 bg-primary/20 rounded-full animate-pulse filter blur-xl"></div>
            <div className="w-full h-full rounded-full border-4 border-primary/30 flex items-center justify-center relative bg-black/50 backdrop-blur-sm">
              <div className="text-7xl font-bold text-primary tracking-tighter drop-shadow-[0_0_15px_rgba(34,197,94,1)]"><CountUp to={4} suffix="%" /></div>
            </div>
          </div>
          <div className="text-sm text-gray-400 uppercase tracking-widest font-bold">Where You Can Be</div>
        </motion.div>

        {/* STAT 3: BAR GRAPHIC */}
        <motion.div
          variants={{
            hidden: { opacity: 0, scale: 0.8, y: 20 },
            visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", bounce: 0.4, duration: 0.8 } }
          }}
          className="flex flex-col items-center justify-center group h-full"
        >
          <div className="flex items-end gap-2 h-32 mb-6">
            <motion.div initial={{ height: 0 }} whileInView={{ height: 40 }} transition={{ duration: 0.5 }} className="w-6 bg-white/10 rounded-t-lg"></motion.div>
            <motion.div initial={{ height: 0 }} whileInView={{ height: 64 }} transition={{ duration: 0.5, delay: 0.1 }} className="w-6 bg-white/20 rounded-t-lg"></motion.div>
            <motion.div initial={{ height: 0 }} whileInView={{ height: 80 }} transition={{ duration: 0.5, delay: 0.2 }} className="w-6 bg-white/30 rounded-t-lg"></motion.div>
            <motion.div initial={{ height: 0 }} whileInView={{ height: 128 }} transition={{ duration: 0.5, delay: 0.3 }} className="w-6 bg-primary rounded-t-lg shadow-[0_0_15px_rgba(34,197,94,0.5)]"></motion.div>
          </div>
          <div className="text-5xl font-bold text-white mb-2"><CountUp to={8} suffix="x" /></div>
          <div className="text-sm text-gray-400 uppercase tracking-widest font-bold">Improved Threat Response</div>
        </motion.div>
      </motion.div>
      <p className="text-3xl text-white font-bold mb-10 font-display italic">"This is what happens when training actually works."</p>
      <Link to="/contact"><Button size="lg" className="bg-green-600 hover:bg-green-500 text-white h-auto min-h-[4rem] px-6 py-4 text-base md:text-lg whitespace-normal leading-tight text-center">Get These Results for Your Team</Button></Link>
    </div>
  </div>
);

const About = () => (
  <div className="min-h-screen bg-background text-white pb-20 relative">
    <BackgroundLayers />
    <PageMeta
      title="About Us | HumanLayer Security"
      description="Founded by cybersecurity and engineering experts. We're building the future of human risk management."
    />
    <PageHeader title="Who We Are" subtitle="We're cybersecurity and engineering graduates who built a phishing training platform because the existing solutions weren't good enough." />
    <Section className="!pt-0">
      <div className="grid md:grid-cols-2 gap-16 items-start">
        <div className="space-y-8">
          <div className="text-center md:text-left text-lg text-gray-300 leading-relaxed relative">
            {/* Decoration */}
            <div className="absolute -left-12 -top-12 w-32 h-32 bg-primary/10 rounded-full blur-[50px] pointer-events-none" />

            <h3 className="text-4xl font-bold text-white mb-8 relative z-10">Why We Started <span className="text-primary">Human Layer Security</span></h3>

            <div className="prose prose-lg prose-invert max-w-none space-y-6">
              <p>We studied cybersecurity and electrical engineering. We learned how attacks work. How social engineering bypasses every technical defense. <span className="text-white font-semibold">How one convincing email can compromise an entire organization.</span></p>
              <p>Then we looked at how companies actually train their employees against these attacks. Annual compliance videos. Generic "be careful with emails" warnings. Boring slide decks that people click through while checking their phone.</p>
              <p>It doesn't work. And we knew why it doesn't work.</p>
              <p>Real learning happens in the moment. You don't get better at recognizing phishing by watching videos—you get better by <span className="text-primary font-bold">practicing with realistic examples</span> and getting immediate feedback.</p>
              <p>So we built what we wished existed: a platform that tests people with realistic phishing attacks and teaches them instantly when they click. No shame. No punishment. Just practice and learning until recognizing phishing becomes instinct.</p>
              <p>That's HumanLayer Security.</p>
            </div>

            <div className="bg-gradient-to-r from-surface to-black/50 border-l-4 border-primary p-8 my-10 rounded-r-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <h4 className="text-primary font-bold mb-3 uppercase tracking-widest text-xs">Core Philosophy</h4>
              <p className="italic text-white text-xl font-display leading-relaxed">"Your employees aren't stupid. They're busy, distracted, and untrained. Give them realistic practice with immediate feedback, and they get better fast. That's not philosophy. That's how learning works."</p>
            </div>

            <p className="mb-8">We're not a legacy security company. We're a small team that saw a massive problem and built a solution. We're confident in what we built because we built it the right way.</p>
          </div>
          <div className="flex gap-4 pt-4 justify-center md:justify-start">
            <Link to="/services"><Button size="lg" className="shadow-lg shadow-primary/20">See What We Built</Button></Link>
            <Link to="/contact"><Button variant="outline" size="lg">Let's Talk</Button></Link>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-surface rounded-3xl p-8 border border-white/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-[60px] pointer-events-none" />
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-sm font-bold text-primary uppercase tracking-widest">Leadership</h3>
              <div className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 flex items-center gap-2">
                <Award className="w-3 h-3 text-primary" />
                <span className="text-[10px] font-bold text-white uppercase tracking-wider">FIU Research Backed</span>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              {[
                { name: CONTACT_INFO.founder, role: "FOUNDER & PRINCIPAL", desc: "Founder. FIU Cybersecurity. Built the phishing simulation engine and platform architecture.", init: "NS" },
                { name: "Alejandro Marcone", role: "CO-FOUNDER & CYBER ANALYST", desc: "Co-Founder. ISIL Cybersecurity (Peru). Designed training methodology and threat analysis systems.", init: "AM" },
                { name: "Branco Forti", role: "CO-FOUNDER & ELECTRICAL ENGINEER", desc: "Co-Founder. FIU Electrical Engineering. Built platform infrastructure and automation systems.", init: "BF" }
              ].map((member, i) => (
                <div key={i} className="flex gap-6 items-start group cursor-default hover:bg-white/5 p-4 rounded-2xl transition-all border border-transparent hover:border-white/5">
                  <div className="relative shrink-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary to-emerald-400 rounded-full blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
                    <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-surface to-black border-2 border-primary/30 group-hover:border-primary flex items-center justify-center text-xl font-bold text-white transition-all overflow-hidden z-10 shadow-lg">
                      {member.init}
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="text-xl font-bold text-white group-hover:text-primary transition-colors">{member.name}</div>
                    <div className="text-primary font-mono text-xs mb-3 uppercase tracking-wider">{member.role}</div>
                    <p className="text-gray-400 text-sm leading-relaxed">{member.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-8 rounded-3xl border border-white/10 bg-surface/50">
            <p className="text-xl font-bold text-white italic">"We built this to solve a real problem. Now we're helping companies actually solve it."</p>
          </div>
        </div>
      </div>
    </Section>
  </div>
);

const Partnership = () => (
  <div className="min-h-screen bg-background text-white pb-20 relative">
    <BackgroundLayers />
    <PageMeta
      title="Partnership | HumanLayer Security"
      description="Partner with HumanLayer. White-label phishing defense for your clients. Recurring revenue."
    />
    <section className="pt-40 pb-16 px-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/10 to-transparent opacity-30 pointer-events-none" />
      <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="max-w-7xl mx-auto relative z-10">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">Partner<span className="text-primary">ship</span></h1>
        <p className="text-xl text-gray-400 max-w-2xl leading-relaxed border-l-4 border-primary pl-6">Partner with us. Offer phishing training under your brand. Earn recurring revenue on every client.</p>
      </motion.div>
    </section>
    <Section className="relative !pt-8">

      <div className="mb-24 flex flex-col md:flex-row items-center gap-16">
        {/* Mobile: Image First | Desktop: Image Left */}
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="flex-1 relative w-full group order-1 md:order-2">
          <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-primary/20 bg-surface/50 backdrop-blur-sm transition-all duration-300">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px] pointer-events-none mix-blend-screen" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-green-500/10 rounded-full blur-[60px] pointer-events-none mix-blend-screen" />

            <img
              src="/partnership-hero.png"
              alt="Strategic Partnership"
              loading="lazy"
              decoding="async"
              srcSet="/partnership-hero-mobile.png 768w, /partnership-hero.png 1920w"
              sizes="(max-width: 768px) 100vw, 50vw"
              className="w-full h-auto object-cover opacity-90 transition-transform duration-700 ease-out relative z-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 z-10" />

            {/* Scanline Effect */}
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.3)_50%)] bg-[length:100%_4px] pointer-events-none opacity-20 z-20" />

            {/* Data Overlays matching Home Page vibe */}
            <div className="absolute bottom-6 left-6 right-6 grid grid-cols-2 gap-4 z-30">
              <div className="bg-black/40 backdrop-blur-md p-3 rounded-xl border border-white/10">
                <div className="text-[10px] text-green-400 font-mono mb-1 uppercase tracking-wider">Partnership</div>
                <div className="text-lg font-bold text-white flex items-center gap-2">AVAILABLE</div>
              </div>
              <div className="bg-black/40 backdrop-blur-md p-3 rounded-xl border border-white/10">
                <div className="text-[10px] text-green-400 font-mono mb-1 uppercase tracking-wider">Revenue</div>
                <div className="text-lg font-bold text-white">RECURRING</div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="flex-1 space-y-8 z-10 order-2 md:order-1">
          <h2 className="text-5xl md:text-6xl font-bold text-white leading-[1.1] mb-8">Let's Grow <span className="text-primary">Together</span></h2>
          <div className="space-y-6 text-gray-400 text-lg leading-relaxed">
            <p className="border-l-2 border-white/10 pl-6">If you work with businesses that need security training — MSPs, IT consultants, compliance advisors — you already know your clients need phishing protection.</p>
            <p>Building a phishing training platform would take you months and cost tens of thousands of dollars. <span className="text-white font-bold">We've already built it.</span> White label our platform and offer it to your clients under your brand.</p>

            <div className="bg-surface/40 border border-white/10 p-6 rounded-2xl">
              <h4 className="text-primary font-bold text-sm uppercase tracking-widest mb-2">How It Works</h4>
              <p className="text-base">We provide the platform. You provide the client relationship. We handle infrastructure, updates, and technical support. <span className="text-white">You earn recurring revenue on every client you bring on.</span></p>
            </div>

            <p className="text-sm text-gray-500">Your clients get better security. You get a new revenue stream. We get to help more companies. Everyone wins.</p>
          </div>
        </div>
      </div>

      <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid md:grid-cols-3 gap-8 mb-24">
        {[
          { t: "Your Brand, Our Platform", d: "We customize the platform with your logo, your colors, your domain. Your clients see your brand on every email, dashboard, and report. You own the relationship. We power the technology behind it.", i: FileText },
          { t: "Recurring Revenue Share", d: "You bring the client. We deliver the platform. You earn a percentage of monthly subscription revenue as long as they're a customer. Build predictable, recurring income without building the technology.", i: Award },
          { t: "We Handle the Technical Side", d: "Platform questions? We'll answer them. Customer support? We'll handle it. New features? We'll build them. Security updates? We'll deploy them. You focus on your clients. We focus on making the platform excellent.", i: Users }
        ].map((s, i) => (
          <motion.div variants={fadeInUp} key={i} className="group relative p-10 rounded-[2.5rem] bg-surface/40 hover:bg-surface/60 border border-white/10 hover:border-primary/30 transition-all duration-300 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="w-16 h-16 mb-6 rounded-2xl bg-black/50 border border-white/10 flex items-center justify-center group-hover:scale-105 group-hover:border-primary/30 transition-all duration-300 relative z-10 shadow-inner">
              <s.i className="w-8 h-8 text-gray-400 group-hover:text-primary transition-colors" />
            </div>

            <h3 className="text-2xl font-bold text-white mb-4 relative z-10">
              {s.t.split(' ').slice(0, Math.ceil(s.t.split(' ').length / 2)).join(' ')} <span className="text-primary">{s.t.split(' ').slice(Math.ceil(s.t.split(' ').length / 2)).join(' ')}</span>
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed relative z-10">{s.d}</p>
          </motion.div>
        ))}
      </motion.div>

      <Section className="bg-black relative overflow-hidden">

        <div className="text-center mb-16 relative z-10">
          <h2 className="text-4xl font-bold text-white mb-6">
            Partner <span className="text-primary">Benefits</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Everything you need to offer world-class phishing training under your brand.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          {[
            { icon: Award, title: "30% Revenue Share", desc: "Earn recurring commission on every client", stat: "$1,800/mo", statLabel: "avg. per 10 clients", accent: "emerald" },
            { icon: Shield, title: "White Label Platform", desc: "Your logo, your colors, your domain", stat: "100%", statLabel: "your branding", accent: "cyan" },
            { icon: Users, title: "Dedicated Support", desc: "Partner success manager assigned", stat: "<2 hrs", statLabel: "response time", accent: "amber" },
            { icon: Terminal, title: "API Access", desc: "Integrate with your existing tools", stat: "REST", statLabel: "API included", accent: "violet" },
            { icon: FileText, title: "Marketing Materials", desc: "Sales decks, case studies, templates", stat: "Ready", statLabel: "to use", accent: "rose" },
            { icon: Activity, title: "Monthly Training", desc: "Partner webinars and product updates", stat: "Live", statLabel: "sessions", accent: "orange" }
          ].map((benefit, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className={cn(
                "p-8 rounded-[2rem] bg-surface/30 backdrop-blur-sm border hover:bg-surface/50 transition-all duration-300 group relative overflow-hidden",
                ACCENT_COLORS[benefit.accent].border,
                ACCENT_COLORS[benefit.accent].hoverShadow
              )}
            >
              <div className={cn(
                "w-16 h-16 rounded-2xl border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-inner",
                ACCENT_COLORS[benefit.accent].bg
              )}>
                <benefit.icon className={cn("w-8 h-8 transition-colors", ACCENT_COLORS[benefit.accent].text)} />
              </div>

              <h3 className="text-xl font-bold text-white mb-2 relative z-10">{benefit.title}</h3>
              <p className="text-gray-400 text-sm mb-6 relative z-10">{benefit.desc}</p>

              <div className="pt-4 border-t border-white/5 relative z-10">
                <div className="text-2xl font-bold text-white group-hover:text-primary transition-colors">{benefit.stat}</div>
                <div className="text-xs text-gray-500 uppercase tracking-wider font-bold mt-1">{benefit.statLabel}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>
      <div className="max-w-4xl mx-auto mb-20 px-4">
        <RevenueCalculator />
      </div>

      <div className="relative rounded-[3rem] overflow-hidden p-12 text-center border border-white/10 group">
        <div className="absolute inset-0 bg-surface/80 backdrop-blur-md" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />

        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-white">Become a <span className="text-primary">Partner</span></h2>
          <p className="text-gray-400 mb-10 text-xl leading-relaxed">We're building a network of partners who help small and medium businesses improve their security. If you work with companies that need phishing training, let's talk about working together.</p>
          <a href={`mailto:${CONTACT_INFO.email}?subject=Partnership Inquiry`}><Button size="lg" className="shadow-[0_0_30px_rgba(34,197,94,0.3)] hover:shadow-[0_0_50px_rgba(34,197,94,0.5)]">Let's Discuss Partnership</Button></a>
        </div>
      </div>
    </Section>
  </div>
);

const RevenueCalculator = () => {
  const [clients, setClients] = useState(10);
  const avgRevenue = 599; // Average monthly revenue per client
  const partnerShare = 0.30; // 30% partner commission

  const monthlyRevenue = clients * avgRevenue * partnerShare;
  const yearlyRevenue = monthlyRevenue * 12;

  // Percentage for progress bar
  const percentage = (clients / 50) * 100;

  return (
    <div className="p-10 rounded-[2.5rem] bg-gradient-to-br from-surface/50 to-black border border-white/10 shadow-2xl relative overflow-hidden group">
      <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      <h3 className="text-3xl font-bold text-white mb-8 text-center">
        Revenue <span className="text-primary">Calculator</span>
      </h3>

      {/* Slider */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">
            Number of Clients
          </label>
          <span className="text-2xl font-bold text-primary bg-primary/10 px-4 py-1 rounded-full border border-primary/20">{clients}</span>
        </div>

        <div className="relative h-4 bg-white/10 rounded-full w-full">
          <div
            className="absolute top-0 left-0 h-full bg-primary rounded-full transition-all duration-100"
            style={{ width: `${percentage}%` }}
          />
          <input
            type="range"
            min="1"
            max="50"
            value={clients}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setClients(Number(e.target.value))}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          />
          <div
            className="absolute top-0 h-6 w-6 bg-white rounded-full shadow-lg border-2 border-primary -mt-1 transition-all duration-100 pointer-events-none z-0 transform -translate-x-1/2"
            style={{ left: `${percentage}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-2 font-mono">
          <span>1 Client</span>
          <span>25 Clients</span>
          <span>50+ Clients</span>
        </div>
      </div>

      {/* Results */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-6 rounded-2xl bg-black/40 border border-white/10">
          <div className="text-sm text-gray-400 mb-2">Monthly</div>
          <div className="text-3xl font-bold text-primary">
            ${monthlyRevenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </div>
        </div>
        <div className="p-6 rounded-2xl bg-black/40 border border-primary/20">
          <div className="text-sm text-gray-400 mb-2">Yearly</div>
          <div className="text-3xl font-bold text-primary">
            ${yearlyRevenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </div>
        </div>
      </div>

      <p className="text-xs text-gray-500 mt-4 text-center">
        Based on 30% revenue share from avg. $599/mo client
      </p>
    </div>
  );
};



const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' });
  const [teamSize, setTeamSize] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    // MOCK SUBMISSION: In a real app, you would send this to your API.
    // For this demo, we simulate a network delay and then show success.
    // This prevents the 'mailto' text from acting as a prompt interrupt.

    // Original fallback logic preserved but commented out for "seamless" feel per user request
    /*
    const subject = encodeURIComponent('Free Security Assessment Request');
    const body = encodeURIComponent(`
      Name: ${formData.name}
      Email: ${formData.email}
      Company: ${formData.company}
      Team Size: ${teamSize || 'Not specified'}
      Message: ${formData.message}
    `);
    window.location.href = `mailto:${CONTACT_INFO.email}?subject=${subject}&body=${body}`;
    */

    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', company: '', message: '' });
      setTeamSize('');
    }, 1500); // Slightly longer delay to feel 'real'
  };

  return (
    <div className="min-h-screen bg-background text-white pb-20 relative">
      <BackgroundLayers />
      <PageMeta
        title="Contact | HumanLayer Security"
        description="Get a free security assessment. Contact our team to secure your organization today."
      />
      <PageHeader
        title="Let's Talk Security"
        subtitle="Get a free security assessment. See your team's baseline phishing risk in 24 hours."
      />

      <Section className="!pt-0">
        <div className="grid lg:grid-cols-2 gap-16 max-w-7xl mx-auto">

          {/* LEFT COLUMN - Interactive Form */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-white mb-4">
                Start Your Free <span className="text-primary">Assessment</span>
              </h2>
              <p className="text-gray-400">
                Tell us about your team. We'll show you where your vulnerabilities are and how to fix them.
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit} aria-label="Contact form">
              {/* Name Input */}
              <div className="group">
                <label className="block text-sm font-bold text-gray-400 mb-2 group-focus-within:text-primary transition-colors">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-6 py-4 bg-surface border-2 border-white/10 rounded-2xl text-white placeholder-gray-600 focus:border-primary focus:bg-surface/80 focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all duration-300"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              {/* Email Input */}
              <div className="group">
                <label className="block text-sm font-bold text-gray-400 mb-2 group-focus-within:text-primary transition-colors">
                  Work Email
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-6 py-4 bg-surface border-2 border-white/10 rounded-2xl text-white placeholder-gray-600 focus:border-primary focus:bg-surface/80 focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all duration-300"
                  placeholder="john@company.com"
                  value={formData.email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              {/* Company Input */}
              <div className="group">
                <label className="block text-sm font-bold text-gray-400 mb-2 group-focus-within:text-primary transition-colors">
                  Company Name
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-6 py-4 bg-surface border-2 border-white/10 rounded-2xl text-white placeholder-gray-600 focus:border-primary focus:bg-surface/80 focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all duration-300"
                  placeholder="Acme Corp"
                  value={formData.company}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, company: e.target.value })}
                />
              </div>

              {/* Team Size Selector */}
              <div className="group">
                <label className="block text-sm font-bold text-gray-400 mb-2">
                  Team Size
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {['1-25', '26-100', '101-500', '500+'].map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setTeamSize(size)}
                      className={cn(
                        "px-4 py-3 rounded-xl text-sm font-bold transition-all duration-300 relative overflow-hidden group",
                        teamSize === size
                          ? "bg-primary/20 border-2 border-primary text-white shadow-[0_0_20px_rgba(34,197,94,0.3)]"
                          : "bg-surface border-2 border-white/10 text-white hover:border-primary/50 hover:bg-surface/80"
                      )}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                      <span className="relative z-10">{size}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Message Textarea */}
              <div className="group">
                <label className="block text-sm font-bold text-gray-400 mb-2 group-focus-within:text-primary transition-colors">
                  Tell Us About Your Needs (Optional)
                </label>
                <textarea
                  rows={4}
                  className="w-full px-6 py-4 bg-surface border border-white/10 rounded-2xl text-white placeholder-gray-600 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                  placeholder="We're looking for..."
                  value={formData.message}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                size="lg"
                className="w-full bg-green-600 hover:bg-green-500 text-white"
                disabled={status === 'loading'}
              >
                {status === 'loading' ? (
                  <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" /> Sending...</>
                ) : (
                  <>Get Free Assessment <ArrowRight className="w-5 h-5 ml-2" /></>
                )}
              </Button>

              {/* Success/Error Messages */}
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-primary/10 border border-primary/20 rounded-xl text-primary text-sm"
                >
                  ✓ Thanks! We'll be in touch within 24 hours.
                </motion.div>
              )}
            </form>
          </div>

          {/* RIGHT COLUMN - Benefits & Social Proof */}
          <div className="space-y-8">
            {/* What to Expect */}
            <div className="p-8 rounded-3xl bg-surface/50 border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-6">
                What Happens <span className="text-primary">Next?</span>
              </h3>
              <div className="space-y-6">
                {[
                  { step: '1', title: 'Quick Call', desc: '15-minute intro call to understand your needs', time: 'Within 24 hours' },
                  { step: '2', title: 'Free Assessment', desc: 'We analyze your current security posture', time: 'Day 2-3' },
                  { step: '3', title: 'Custom Proposal', desc: 'Tailored plan with transparent pricing', time: 'End of week 1' },
                ].map((item) => (
                  <div key={item.step} className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold shrink-0 border-2 border-primary/40">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1">{item.title}</h4>
                      <p className="text-sm text-gray-400 mb-1">{item.desc}</p>
                      <p className="text-xs text-primary font-mono">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct Contact Options */}
            <div className="grid grid-cols-2 gap-4">
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="p-6 rounded-2xl bg-surface/50 border border-white/10 hover:border-primary/30 transition-all group text-center"
              >
                <Mail className="w-8 h-8 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <div className="text-sm text-gray-400 mb-1">Email Us</div>
                <div className="text-xs text-white font-mono">{CONTACT_INFO.email}</div>
              </a>

              <a
                href={`tel:${CONTACT_INFO.phone}`}
                className="p-6 rounded-2xl bg-surface/50 border border-white/10 hover:border-primary/30 transition-all group text-center"
              >
                <Activity className="w-8 h-8 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <div className="text-sm text-gray-400 mb-1">Call Us</div>
                <div className="text-xs text-white font-mono">{CONTACT_INFO.phone}</div>
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="p-6 rounded-2xl bg-surface/30 border border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="w-6 h-6 text-primary" />
                <span className="text-sm font-bold text-white">Why Companies Trust Us</span>
              </div>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5" />
                  <span>Response within 2 hours during business hours</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5" />
                  <span>No pushy sales tactics - we educate first</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5" />
                  <span>Transparent pricing from day one</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5" />
                  <span>Free trial available - no credit card required</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* FAQ Section Below */}
      <Section className="bg-black border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Questions <span className="text-primary">Before Reaching Out?</span>
          </h2>
          {/* FAQ Logic embedded here or reused if separated, reusing structure for now */}
          <div className="space-y-4">
            {[
              { q: "Is there a free trial?", a: "Yes. We offer a free 14 day trial with full access to all features. No credit card required." },
              { q: "Do you offer discounts for nonprofits?", a: "Yes. We offer a 20% discount for registered nonprofits and educational institutions." },
              { q: "Can I manage multiple companies?", a: "Yes. Our Partner Program is designed for MSPs and consultants who need to manage multiple clients from one dashboard." },
              { q: "What happens if I cancel?", a: "You can export all your data and reports. We keep your account active until the end of your billing cycle. No hidden fees." }
            ].map((faq, i) => (
              <details key={i} className="group p-6 rounded-2xl bg-surface/30 border border-white/10 hover:border-primary/20 transition-colors cursor-pointer open:bg-surface/50">
                <summary className="flex justify-between items-center font-bold text-white list-none"><span>{faq.q}</span><ArrowRight className="w-4 h-4 text-primary transform group-open:rotate-90 transition-transform" /></summary>
                <p className="mt-4 text-gray-400 text-sm leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
};

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
  const [isLoaded, setIsLoaded] = useState(false);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  // Entrance animation
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (

    <div className={cn("min-h-screen bg-background text-white selection:bg-primary selection:text-white font-sans overflow-x-hidden transition-opacity duration-700", isLoaded ? "opacity-100" : "opacity-0")}>
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: EASING }}
              className="origin-top"
            >
              <Home />
            </motion.div>
          } />
          <Route path="/services" element={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: EASING }}
              className="origin-top"
            >
              <Services />
            </motion.div>
          } />
          <Route path="/about" element={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: EASING }}
              className="origin-top"
            >
              <About />
            </motion.div>
          } />
          <Route path="/partnership" element={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: EASING }}
              className="origin-top"
            >
              <Partnership />
            </motion.div>
          } />
          <Route path="/privacy" element={<Legal />} />
          <Route path="/terms" element={<Legal />} />
          <Route path="/contact" element={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: EASING }}
              className="origin-top"
            >
              <Contact />
            </motion.div>
          } />
          <Route path="*" element={<Home />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </div>

  );
}

export default App;

