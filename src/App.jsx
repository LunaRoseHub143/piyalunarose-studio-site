import React, { useState, useEffect } from 'react';
import {
  Code,
  Layers,
  Cpu,
  Activity,
  Heart,
  Zap,
  Mail,
  ArrowRight,
  Menu,
  X,
  CheckCircle2,
  XCircle,
  Quote,
  DollarSign,
  TrendingUp,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll for navbar transparency effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Custom Logo Component (Uses the new circular logo)
  const Logo = ({ className = "w-10 h-10" }) => {
    return (
      <div className={`${className} rounded-full overflow-hidden border border-white/20 shadow-lg`}>
        <img
          src="/lunarose-logo.jpg"
          alt="Piya LunaRose Logo"
          className="w-full h-full object-cover"
        />
      </div>
    );
  };

  const ServiceCard = ({ icon: Icon, title, description, tags, points }) => (
    <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-indigo-500/30 hover:bg-white/[0.07] transition-all duration-500 group">
      <div className="mb-6 inline-block p-3 bg-indigo-500/10 rounded-xl group-hover:bg-indigo-500/20 transition-colors">
        <Icon className="w-8 h-8 text-indigo-400 group-hover:text-indigo-300 transition-colors" />
      </div>
      <h3 className="text-xl font-serif font-bold text-white mb-3 tracking-tight">{title}</h3>
      <p className="text-stone-400 mb-6 leading-relaxed font-light">{description}</p>

      <ul className="mb-6 space-y-3">
        {points.map((point, idx) => (
          <li key={idx} className="flex items-start text-sm text-stone-300">
            <CheckCircle2 className="w-4 h-4 text-indigo-400 mr-2 mt-0.5 shrink-0 opacity-70" />
            <span>{point}</span>
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
        {tags.map((tag, idx) => (
          <span key={idx} className="text-[10px] font-bold uppercase tracking-widest text-indigo-300/60 bg-indigo-500/5 px-2.5 py-1 rounded-md border border-indigo-500/10">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );

  const WorkCard = ({ title, subtitle, role, focus, colorClass }) => (
    <div className="group relative overflow-hidden rounded-3xl bg-white/[0.03] border border-white/5 transition-all duration-500 hover:bg-white/[0.05] hover:border-white/20">
      <div className={`absolute top-0 left-0 w-1 h-full ${colorClass} transition-all duration-500 group-hover:w-2`} />
      <div className="p-8 md:p-12">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-8">
          <div>
            <h3 className="text-3xl font-serif font-bold text-white tracking-tight">{title}</h3>
            <p className="text-indigo-400/60 font-medium mt-1 tracking-wide">{subtitle}</p>
          </div>
          <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-white/10 group-hover:bg-white group-hover:text-[#0a051a] transition-all duration-500">
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mt-8 border-t border-white/5 pt-8">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500 block mb-2">Role</span>
            <p className="text-stone-200 font-light leading-relaxed">{role}</p>
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500 block mb-2">Focus</span>
            <p className="text-stone-200 font-light leading-relaxed">{focus}</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0a051a] font-sans text-stone-300 selection:bg-indigo-500/30 selection:text-white">

      {/* Background Decor - ClarittView Inspired Luminous Glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {/* Artwork Background Layer */}
        <div
          className="absolute inset-0 opacity-[0.08] mix-blend-overlay bg-cover bg-center bg-no-repeat grayscale"
          style={{
            backgroundImage: 'url(/hero-sketch-v2.jpg)',
            WebkitMaskImage: 'radial-gradient(circle, transparent 30%, black 100%)',
            maskImage: 'radial-gradient(circle, transparent 30%, black 100%)'
          }}
        />
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-indigo-900/40 rounded-full blur-[120px] mix-blend-screen opacity-50" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-violet-900/30 rounded-full blur-[100px] mix-blend-screen opacity-40" />
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-indigo-500/10 rounded-full blur-[80px] opacity-20" />
      </div>

      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-[#0a051a]/80 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2 z-50">
            <Logo className="w-10 h-10" />
            <span className="font-serif font-bold text-xl tracking-tight text-white ml-2">
              Piya LunaRose<span className="hidden sm:inline font-normal text-indigo-400/60 ml-1">Studio</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {['Services', 'Work', 'About', 'Investment', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-sm font-medium text-stone-400 hover:text-white transition-all hover:translate-y-[-1px]"
              >
                {item}
              </button>
            ))}
            <a
              href="mailto:Hello@lunarosedhealinghub.com?subject=Project Inquiry"
              className="px-6 py-2.5 bg-white text-[#0a051a] text-sm font-bold rounded-lg hover:bg-indigo-50 transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
            >
              Request a Quote
            </a>
          </div>

          <button
            className="md:hidden z-50 p-2 text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        <div className={`fixed inset-0 bg-[#0a051a] z-40 transform transition-transform duration-500 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden flex flex-col items-center justify-center`}>
          <div className="flex flex-col items-center gap-8">
            {['Services', 'Work', 'About', 'Investment', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-3xl font-serif font-bold text-white hover:text-indigo-400 transition-colors"
              >
                {item}
              </button>
            ))}
            <a
              href="mailto:Hello@lunarosedhealinghub.com?subject=Project Inquiry"
              className="mt-4 px-10 py-4 bg-white text-[#0a051a] font-bold rounded-xl"
            >
              Request a Quote
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-40 px-6 overflow-hidden z-10">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-bold tracking-widest uppercase mb-8 animate-pulse">
            <Zap className="w-3 h-3 text-indigo-400" />
            <span>Systems • Clarity • Resilience</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-9xl font-serif font-bold text-white leading-[0.95] mb-10 tracking-tighter">
            Architecting <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-indigo-100 to-indigo-400">scalable systems</span>
            <span className="block text-indigo-400/30 italic font-normal mt-2"> & embodied practices.</span>
          </h1>

          <p className="text-lg md:text-2xl text-stone-400 max-w-2xl mx-auto mb-12 leading-relaxed font-light">
            I work at the intersection of software architecture, UI/UX design, and human-centered systems to bring flow and resilience back online.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a
              href="mailto:Hello@lunarosedhealinghub.com?subject=Project Inquiry"
              className="w-full sm:w-auto px-10 py-4 bg-white text-[#0a051a] font-bold rounded-xl hover:bg-indigo-50 transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] flex items-center justify-center gap-2 group"
            >
              Request a Quote <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </a>
            <button
              onClick={() => scrollToSection('work')}
              className="w-full sm:w-auto px-10 py-4 bg-white/5 border border-white/10 text-white font-medium rounded-xl hover:bg-white/10 hover:border-white/30 transition-all backdrop-blur-sm"
            >
              View Selected Work
            </button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">What I Do</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-indigo-600 to-transparent mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <ServiceCard
              icon={Code}
              title="Web Architecture & SaaS"
              description="Designing and architecting web applications with a focus on scaling logic and clean data flow."
              points={[
                "System-level thinking first",
                "Clear UI/UX patterns",
                "Clean data and state flow",
                "Deployment-ready code"
              ]}
              tags={["Architecture", "UI/UX", "SaaS Systems"]}
            />

            <ServiceCard
              icon={Heart}
              title="Bodywork & Embodiment"
              description="A somatic approach to rebuilding trust between mind and body through eastern traditions."
              points={[
                "Nervous system regulation",
                "Rebuilding mind-body trust",
                "Functional mobility",
                "Sustainable health"
              ]}
              tags={["Somatic", "Healing", "Embodiment"]}
            />

            <ServiceCard
              icon={Activity}
              title="Resilience Training"
              description="Applying martial arts principles to build discipline and mental focus under stress."
              points={[
                "Progressive adaptation",
                "Discipline without burnout",
                "Coordination & balance",
                "Mental stress management"
              ]}
              tags={["Movement", "Strength", "Resilience"]}
            />
          </div>
        </div>
      </section>

      {/* Work Section */}
      <section id="work" className="py-32 px-6 bg-white/[0.02] border-y border-white/5 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="mb-20">
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">Selected Work</h2>
            <p className="text-stone-400 text-xl font-light">Projects spanning technical architecture and organic systems.</p>
          </div>

          <div className="grid gap-12">
            <WorkCard
              title="Moonchild Thai Spa"
              subtitle="Healing Sanctuary & System"
              role="Founder • Systems Design • Methodology"
              focus="Human-centered healing and educational flow."
              colorClass="bg-emerald-500/50"
            />
            <WorkCard
              title="ClarittView™"
              subtitle="SaaS Product Platform"
              role="Product Architect • UI/UX • Build"
              focus="Clean interfaces and predictable system logic."
              colorClass="bg-indigo-500/50"
            />
          </div>
        </div>
      </section>

      {/* Engagement Section */}
      <section className="py-32 px-6 relative z-10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-8">Intentional Engagement</h2>
            <p className="text-xl text-stone-400 mb-10 leading-relaxed font-light">
              Scoped, structured, and intentional partnerships that prioritize long-term resilience over quick shortcuts.
            </p>
            <div className="space-y-4">
              {["Web & product architecture", "System flow mapping", "Full web app builds", "Embodiment training"].map((item, i) => (
                <div key={i} className="flex items-center gap-4 text-stone-200">
                  <div className="w-2 h-2 rounded-full bg-indigo-500/40" />
                  <span className="font-light tracking-wide">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white/[0.03] p-10 md:p-16 rounded-3xl border border-white/5 relative group">
            <Quote className="absolute top-10 left-10 w-16 h-16 text-white/5 group-hover:text-white/10 transition-colors" />
            <div className="relative z-10 pt-10">
              <h3 className="text-3xl font-serif text-white mb-10 leading-[1.4] font-light italic">
                "Clarity reduces friction, and reduced friction enables growth."
              </h3>
              <div className="flex items-center gap-4">
                <div className="w-16 h-px bg-indigo-500/50" />
                <p className="text-stone-400 font-medium tracking-widest text-xs uppercase">Piya LunaRose</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-6 bg-white/[0.01] border-t border-white/5 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[10px] font-bold tracking-[0.3em] text-indigo-400 uppercase mb-4 block">About the Architect</span>
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-white">Principles of Growth</h2>
          </div>
          <div className="prose prose-invert prose-lg mx-auto text-stone-400 font-light leading-[1.8]">
            <p className="mb-8">
              I move quickly because I think in systems. Once I understand the core problem, I map how data, users, and operations interact — then execute without detours.
            </p>
            <div className="bg-white/[0.03] p-10 rounded-2xl border border-white/5 my-12 not-prose">
              <h4 className="font-serif text-2xl font-bold text-white mb-6">Core Mission</h4>
              <ul className="grid gap-4">
                {[
                  "Reduce friction before it appears",
                  "Prevent expensive rewrites",
                  "Intuitive systems, calm operations",
                  "Scale without chaos"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-stone-300">
                    <CheckCircle2 className="w-5 h-5 text-indigo-400 opacity-60" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <p>
              I optimize for clarity and resilience. My pricing reflects the speed of synthesis and the value of preventing downstream mistakes before they happen.
            </p>
          </div>
        </div>
      </section>

      {/* Investment Section */}
      <section id="investment" className="py-32 px-6 relative z-10 bg-[#0c061d]">
        <div className="max-w-7xl mx-auto text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-8">Investment</h2>
          <p className="text-stone-400 text-xl font-light max-w-2xl mx-auto italic">"Paying for clarity now saves you from chaos later."</p>
        </div>
        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <div className="bg-white/[0.03] p-10 rounded-3xl border border-white/5 flex flex-col items-center text-center">
            <h4 className="text-2xl font-serif font-bold text-white mb-2">Digital Platforms</h4>
            <div className="text-4xl font-serif font-bold text-indigo-300 mb-8 mt-6">$4k – $10k</div>
            <ul className="text-sm text-stone-500 space-y-4 mb-10 flex-grow">
              <li>Architecture Mapping</li>
              <li>UI/UX Design Systems</li>
              <li>Deployment Strategy</li>
            </ul>
            <a href="mailto:Hello@lunarosedhealinghub.com" className="w-full py-4 text-white border border-white/20 rounded-xl hover:bg-white/5 transition-colors">Inquire</a>
          </div>
          <div className="bg-white/[0.05] p-10 rounded-3xl border border-indigo-500/30 flex flex-col items-center text-center ring-1 ring-indigo-500/20 transform md:-translate-y-4">
            <h4 className="text-2xl font-serif font-bold text-white mb-2">SaaS Architecture</h4>
            <div className="text-4xl font-serif font-bold text-white mb-8 mt-6">$8k – $25k+</div>
            <ul className="text-sm text-indigo-300/60 space-y-4 mb-10 flex-grow">
              <li>Full System Builds</li>
              <li>Data Flow Logic</li>
              <li>Operational Resilience</li>
            </ul>
            <a href="mailto:Hello@lunarosedhealinghub.com" className="w-full py-4 bg-white text-[#0a051a] font-bold rounded-xl hover:bg-indigo-50 shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-all">Select Tier</a>
          </div>
          <div className="bg-white/[0.03] p-10 rounded-3xl border border-white/5 flex flex-col items-center text-center">
            <h4 className="text-2xl font-serif font-bold text-white mb-2">Partnerships</h4>
            <div className="text-4xl font-serif font-bold text-stone-500 mb-8 mt-6">Limited</div>
            <ul className="text-sm text-stone-500 space-y-4 mb-10 flex-grow">
              <li>High-Alignment Builds</li>
              <li>Long-term Support</li>
              <li>Revenue / Equity Split</li>
            </ul>
            <a href="mailto:Hello@lunarosedhealinghub.com" className="w-full py-4 text-stone-500 border border-white/10 rounded-xl hover:bg-white/5 transition-colors">Apply</a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 relative z-10 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="bg-[#0a051a] rounded-[3rem] p-12 md:p-24 border border-white/10 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-900/10 to-transparent"></div>
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-8 relative z-10">Build something resilient.</h2>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center relative z-10">
              <a
                href="mailto:Hello@lunarosedhealinghub.com"
                className="px-12 py-5 bg-white text-[#0a051a] font-bold rounded-2xl hover:scale-105 transition-all shadow-xl shadow-white/10"
              >
                Start Engagement
              </a>
              <span className="text-stone-400 font-light">Hello@lunarosedhealinghub.com</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-4">
            <Logo className="w-8 h-8 opacity-80" />
            <p className="text-stone-500 text-sm font-light tracking-wide">
              © {new Date().getFullYear()} Piya LunaRose Studio. Architecting resilience.
            </p>
          </div>
          <div className="flex gap-10">
            {['LinkedIn', 'Twitter', 'Instagram'].map(social => (
              <a key={social} href="#" className="text-stone-400 hover:text-white transition-colors text-sm font-medium tracking-widest uppercase">{social}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
