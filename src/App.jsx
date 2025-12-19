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

  // Custom Logo Component (Tries to load your image, falls back to SVG)
  const Logo = ({ className = "w-10 h-10" }) => {
    const [imageError, setImageError] = useState(false);

    if (!imageError) {
      return (
        <img
          src="IMG_4913.jpeg"
          alt="Piya LunaRose Logo"
          className={`${className} object-contain`}
          onError={() => setImageError(true)}
        />
      );
    }

    return (
      <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Geometric Crescent Moon */}
        <path
          d="M48 32C48 45.2548 37.2548 56 24 56C10.7452 56 0 45.2548 0 32C0 18.7452 10.7452 8 24 8C26.5 8 29 8.5 31.5 9.5C22 13 16 22 16 32C16 42 22 51 31.5 54.5C29 55.5 26.5 56 24 56"
          className="stroke-stone-800"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Geometric Facets inside Moon (Architecture/Structure) */}
        <path d="M16 32L31.5 9.5" className="stroke-stone-300" strokeWidth="1" />
        <path d="M16 32L31.5 54.5" className="stroke-stone-300" strokeWidth="1" />
        <path d="M16 32H28" className="stroke-stone-300" strokeWidth="1" />

        {/* Stylized Rose (Organic/Embodiment) */}
        <path
          d="M42 20C46 20 50 23 50 27C50 30 47 32 45 32C47 32 52 34 52 38C52 43 47 46 42 46C38 46 34 43 34 38"
          className="stroke-indigo-600"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M42 26C44 26 45 27 45 28C45 29 44 30 42 30C40 30 39 29 39 28C39 27 40 26 42 26Z"
          className="stroke-indigo-600"
          strokeWidth="2"
        />
        <path d="M42 46V54" className="stroke-emerald-600" strokeWidth="2" strokeLinecap="round" />
        <path d="M42 50C42 50 46 48 48 50" className="stroke-emerald-600" strokeWidth="2" strokeLinecap="round" />
        <path d="M42 52C42 52 38 51 36 53" className="stroke-emerald-600" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  };

  const ServiceCard = ({ icon: Icon, title, description, tags, points }) => (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-stone-100 hover:shadow-md transition-all duration-300 group">
      <div className="mb-6 inline-block p-3 bg-stone-50 rounded-lg group-hover:bg-indigo-50 transition-colors">
        <Icon className="w-8 h-8 text-stone-700 group-hover:text-indigo-600 transition-colors" />
      </div>
      <h3 className="text-xl font-serif font-bold text-stone-900 mb-3">{title}</h3>
      <p className="text-stone-600 mb-6 leading-relaxed">{description}</p>

      <ul className="mb-6 space-y-2">
        {points.map((point, idx) => (
          <li key={idx} className="flex items-start text-sm text-stone-600">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 mr-2 mt-1 shrink-0" />
            <span>{point}</span>
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-2 pt-4 border-t border-stone-100">
        {tags.map((tag, idx) => (
          <span key={idx} className="text-xs font-medium uppercase tracking-wider text-stone-500 bg-stone-50 px-2 py-1 rounded">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );

  const WorkCard = ({ title, subtitle, role, focus, colorClass }) => (
    <div className="group relative overflow-hidden rounded-2xl bg-stone-50 border border-stone-100 transition-all hover:shadow-lg">
      <div className={`absolute top-0 left-0 w-1 h-full ${colorClass} transition-all group-hover:w-2`} />
      <div className="p-8 md:p-10">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
          <div>
            <h3 className="text-2xl font-serif font-bold text-stone-900">{title}</h3>
            <p className="text-stone-500 font-medium mt-1">{subtitle}</p>
          </div>
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white border border-stone-200 group-hover:border-stone-900 transition-colors">
            <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-stone-900" />
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-stone-400">Role</span>
            <p className="text-stone-700 font-medium mt-1">{role}</p>
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-stone-400">Focus</span>
            <p className="text-stone-700 font-medium mt-1">{focus}</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-stone-50/50 font-sans text-stone-800 selection:bg-indigo-100 selection:text-indigo-900">

      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3 z-50">
            {/* Logo */}
            <Logo className="w-10 h-10" />
            <span className="font-serif font-bold text-xl tracking-tight text-stone-900">
              Piya LunaRose<span className="hidden sm:inline font-normal text-stone-500 ml-1">Studio</span>
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {['Services', 'Work', 'About', 'Investment', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-sm font-medium text-stone-600 hover:text-indigo-600 transition-colors"
              >
                {item}
              </button>
            ))}
            <a
              href="mailto:Hello@lunarosedhealinghub.com?subject=Project Inquiry"
              className="px-5 py-2.5 bg-stone-900 text-white text-sm font-medium rounded-lg hover:bg-stone-800 transition-colors"
            >
              Request a Quote
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden z-50 p-2 text-stone-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`fixed inset-0 bg-white z-40 transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`}>
          <div className="flex flex-col items-center justify-center h-full gap-8">
            {['Services', 'Work', 'About', 'Investment', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-2xl font-serif font-bold text-stone-900"
              >
                {item}
              </button>
            ))}
            <a
              href="mailto:Hello@lunarosedhealinghub.com?subject=Project Inquiry"
              className="mt-4 px-8 py-3 bg-stone-900 text-white rounded-lg"
            >
              Request a Quote
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold tracking-wide uppercase mb-6 animate-fade-in-up">
            <Zap className="w-3 h-3" />
            <span>Systems • Clarity • Resilience</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-stone-900 leading-[1.1] mb-8">
            Architecting scalable systems
            <span className="block text-stone-500 italic font-normal mt-2">& embodied practices.</span>
          </h1>

          <p className="text-lg md:text-xl text-stone-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            I work at the intersection of software architecture, UI/UX design, and human-centered systems to bring flow and resilience back online.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:Hello@lunarosedhealinghub.com?subject=Project Inquiry"
              className="w-full sm:w-auto px-8 py-4 bg-stone-900 text-white font-medium rounded-lg hover:bg-stone-800 transition-all hover:scale-105 flex items-center justify-center gap-2"
            >
              Request a Quote <ArrowRight className="w-4 h-4" />
            </a>
            <button
              onClick={() => scrollToSection('work')}
              className="w-full sm:w-auto px-8 py-4 bg-white border border-stone-200 text-stone-900 font-medium rounded-lg hover:border-stone-400 transition-colors"
            >
              View Selected Work
            </button>
          </div>
        </div>

        {/* Abstract Background Decoration */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-indigo-100/50 to-emerald-100/50 rounded-full blur-3xl -z-10 opacity-60" />
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-4">What I Do</h2>
            <div className="w-16 h-1 bg-indigo-600 mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <ServiceCard
              icon={Code}
              title="Web Pages & Web Apps Architecture"
              description="Designing and architecting web applications with a focus on clarity, scalability, and long-term maintainability. I help prevent overengineering while ensuring your product can grow."
              points={[
                "System-level thinking before code",
                "Clear UI/UX patterns",
                "Clean data and state flow",
                "Deployment-ready architecture"
              ]}
              tags={["Web Architecture", "UI/UX", "SaaS Systems"]}
            />

            <ServiceCard
              icon={Heart}
              title="Bodywork & Embodiment Training"
              description="A bodywork approach informed by decades of embodied practice across Eastern, Middle Eastern, and Western traditions to rebuild trust between mind and body."
              points={[
                "Nervous system regulation",
                "Rebuilding mind-body trust",
                "Functional strength & mobility",
                "Sustainable health practices"
              ]}
              tags={["Somatic Intelligence", "Functional Healing"]}
            />

            <ServiceCard
              icon={Activity}
              title="Martial Arts–Inspired Training"
              description="Applying martial arts training principles as systems to build discipline, focus, and resilience without burnout."
              points={[
                "Progressive load and adaptation",
                "Discipline without burnout",
                "Strength, balance, & coordination",
                "Mental focus under physical stress"
              ]}
              tags={["Movement Systems", "Strength Training"]}
            />
          </div>
        </div>
      </section>

      {/* Selected Work Section */}
      <section id="work" className="py-24 px-6 bg-stone-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-4">Selected Work</h2>
              <p className="text-stone-600 max-w-xl">
                Projects spanning technical architecture and embodied systems design.
              </p>
            </div>
          </div>

          <div className="grid gap-8">
            <WorkCard
              title="Moonchild Thai Spa & Body Works"
              subtitle="A bodywork sanctuary designed around human-centered healing systems."
              role="Founder • Bodywork Systems • Training Methodology"
              focus="Scalable healing experiences, practitioner education, and client flow."
              colorClass="bg-emerald-500"
            />

            <WorkCard
              title="ClarittView™"
              subtitle="A SaaS platform architected for operational efficiency."
              role="Product Architect • UI/UX • Full Web App Build"
              focus="Clean interfaces, predictable logic, scalable architecture."
              colorClass="bg-indigo-500"
            />
          </div>
        </div>
      </section>

      {/* Engagement Section */}
      <section className="py-24 px-6 bg-stone-900 text-stone-300">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
              How We Can Work Together
            </h2>
            <p className="text-lg text-stone-400 mb-8 leading-relaxed">
              Engagements are structured, scoped, and intentional. Each engagement prioritizes clarity, maintainability, and long-term resilience.
            </p>

            <div className="space-y-4">
              {[
                "Web & product architecture consulting",
                "UI/UX design and system flow mapping",
                "Full website or web app builds",
                "Bodywork and embodiment training",
                "Martial arts–inspired health coaching"
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                  <span className="text-stone-200">{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <a
                href="mailto:Hello@lunarosedhealinghub.com"
                className="inline-flex items-center text-white font-medium border-b border-indigo-400 pb-1 hover:text-indigo-400 transition-colors"
              >
                Start a conversation <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </div>
          </div>

          <div className="bg-stone-800 p-8 md:p-12 rounded-2xl border border-stone-700 relative">
            <Quote className="absolute top-8 left-8 w-12 h-12 text-stone-700" />
            <div className="relative z-10 pt-8">
              <h3 className="text-2xl font-serif text-white mb-6 leading-relaxed">
                "My work is guided by a systems principle: clarity reduces friction, and reduced friction enables growth."
              </h3>
              <div className="flex items-center gap-4">
                <div className="w-12 h-1 bg-indigo-500 rounded-full" />
                <p className="text-sm font-medium text-stone-400">Piya LunaRose</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          {/* Detailed About Content */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <span className="text-xs font-bold tracking-widest text-indigo-600 uppercase mb-4 block">About the Architect</span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-6">Product & Systems Architect</h2>
            </div>

            <div className="prose prose-stone prose-lg mx-auto text-stone-600 leading-relaxed">
              <p className="mb-6">
                I work as a Product & Systems Architect, designing human-centered web apps and digital platforms from the architecture level up.
                My strength lies in seeing patterns early — technical, behavioral, and systemic — and translating them into clean, scalable structures before complexity sets in.
              </p>
              <p className="mb-6">
                I don’t just build interfaces or write code. I design the container a product lives in: its flows, logic, constraints, and long-term viability.
              </p>
              <p className="mb-6">
                I move quickly because I think in systems. Once I understand the core problem, I can map how data, users, and operations should interact — and then execute without unnecessary detours.
                This allows me to learn, adapt, and ship at an accelerated pace while maintaining clarity and stability.
              </p>
              <p className="mb-8">
                In a short period of time, I’ve progressed from entering the web and product space to deploying multiple real-world platforms across different stacks.
                This speed isn’t accidental. It comes from a deep ability to recognize structure, transfer knowledge across domains, and iterate confidently without losing coherence.
                I evolve fast because I’m not memorizing tools — I’m understanding principles.
              </p>

              <div className="bg-stone-50 p-8 rounded-xl border border-stone-100 my-10 not-prose">
                <h3 className="font-serif text-xl font-bold text-stone-900 mb-4">Core Goals</h3>
                <ul className="space-y-3">
                  {[
                    "Reduce friction before it appears",
                    "Prevent expensive rewrites later",
                    "Design systems that feel intuitive to users and calm to operate",
                    "Create foundations that can scale without chaos"
                  ].map((goal, i) => (
                    <li key={i} className="flex items-start gap-3 text-stone-700">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2.5 shrink-0" />
                      {goal}
                    </li>
                  ))}
                </ul>
              </div>

              <p className="mb-6">
                My background in embodied practices and human-centered work deeply informs how I design technology. I pay attention to cognitive load, nervous system impact, and how people actually move through systems in real life.
                This results in products that don’t just function — they feel right to use.
              </p>
              <p className="mb-8">
                I typically work with founders and teams who value clarity, long-term thinking, and clean execution. My pricing reflects the level of architectural responsibility I take on, the speed at which I can synthesize complexity, and the value of preventing downstream mistakes before they happen.
              </p>

              <div className="text-center font-serif text-xl italic text-stone-800 mb-16 px-4">
                "I’m not optimizing for quick hacks or clever shortcuts. I’m optimizing for clarity, resilience, and systems that can grow with you."
              </div>

              {/* Founder Milestones */}
              <div className="mt-16 not-prose border-t border-stone-100 pt-16">
                <h3 className="text-2xl font-serif font-bold text-stone-900 mb-10 text-center">Founder Milestones</h3>
                <div className="grid gap-8 max-w-3xl mx-auto">

                  {/* Past Milestones */}
                  <div className="relative pl-8 border-l-2 border-stone-200">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-stone-100 border-2 border-stone-400"></div>
                    <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block mb-1">September</span>
                    <h4 className="text-lg font-serif font-bold text-stone-900">Entered the web and product space</h4>
                    <p className="text-stone-600 mt-2">Focusing on system fundamentals, architecture patterns, and human-centered UX rather than surface-level tooling.</p>
                  </div>

                  <div className="relative pl-8 border-l-2 border-stone-200">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-stone-100 border-2 border-stone-400"></div>
                    <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block mb-1">November</span>
                    <h4 className="text-lg font-serif font-bold text-stone-900">Deployed my first production platform</h4>
                    <p className="text-stone-600 mt-2">Translating concept, flows, and integrations into a live, operational system.</p>
                  </div>

                  <div className="relative pl-8 border-l-2 border-stone-200">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-stone-100 border-2 border-stone-400"></div>
                    <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block mb-1">December</span>
                    <h4 className="text-lg font-serif font-bold text-stone-900">Architected and deployed a second SaaS application</h4>
                    <p className="text-stone-600 mt-2">On a separate infrastructure, applying refined patterns across UI/UX, data flow, and deployment with increased speed and clarity.</p>
                  </div>

                  <div className="relative pl-8 border-l-2 border-stone-200">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-stone-100 border-2 border-stone-400"></div>
                    <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block mb-1">Ongoing</span>
                    <h4 className="text-lg font-serif font-bold text-stone-900">Continuing to evolve rapidly</h4>
                    <p className="text-stone-600 mt-2">Recognizing patterns early, transferring principles across domains, and designing systems that scale without accumulating chaos.</p>
                  </div>

                  {/* Future / Projected Milestones */}
                  <div className="relative pl-8 border-l-2 border-indigo-100 pt-8">
                    <div className="absolute -left-[9px] top-8 w-4 h-4 rounded-full bg-white border-2 border-indigo-500"></div>
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 block mb-1">Next 1–2 Months</span>
                    <h4 className="text-lg font-serif font-bold text-stone-900">Stabilize and scale ClarittView post-launch</h4>
                    <p className="text-stone-600 mt-2">Refining UX, system performance, and operational flows based on real user behavior and feedback.</p>
                  </div>

                  <div className="relative pl-8 border-l-2 border-indigo-100">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-2 border-indigo-500"></div>
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 block mb-1">Next 3–4 Months</span>
                    <h4 className="text-lg font-serif font-bold text-stone-900">Expand architecture into a shared system foundation</h4>
                    <p className="text-stone-600 mt-2">Preparing for multi-app growth while maintaining clarity across UI, data, and deployment patterns.</p>
                  </div>

                  <div className="relative pl-8 border-l-2 border-indigo-100">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-2 border-indigo-500"></div>
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 block mb-1">Next 5–6 Months</span>
                    <h4 className="text-lg font-serif font-bold text-stone-900">Launch additional platform extensions and internal tools</h4>
                    <p className="text-stone-600 mt-2">Applying a mature, reusable architecture that supports faster builds, cleaner iterations, and long-term scalability.</p>
                  </div>

                  <div className="relative pl-8 border-l-2 border-emerald-100">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-2 border-emerald-500"></div>
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 block mb-1">Ongoing Direction</span>
                    <h4 className="text-lg font-serif font-bold text-stone-900">Continue operating at the architecture layer</h4>
                    <p className="text-stone-600 mt-2">Compressing learning curves, identifying patterns early, and designing systems that remain calm, intuitive, and resilient as complexity increases.</p>
                  </div>

                </div>

                <div className="mt-16 text-center max-w-2xl mx-auto">
                  <p className="font-serif text-lg text-stone-800 italic leading-relaxed">
                    "My roadmap reflects how I work: build the foundation first, then let expansion happen cleanly and deliberately."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Investment & Pricing Section */}
      <section id="investment" className="py-24 px-6 bg-stone-50 border-t border-stone-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-6">Pricing & Investment</h2>
            <div className="w-16 h-1 bg-indigo-600 mx-auto rounded-full mb-8" />
            <p className="text-xl text-stone-800 font-serif italic mb-6">
              "Paying for clarity now saves you from chaos later."
            </p>
            <p className="text-stone-600 leading-relaxed">
              I don’t price my work as “hours of design” or “lines of code.” I price it based on architectural responsibility, speed of synthesis, and the long-term cost savings my work creates.
            </p>
          </div>

          {/* Market Reality Grid */}
          <div className="mb-20">
            <h3 className="text-xl font-bold text-stone-900 mb-8 text-center uppercase tracking-widest text-xs text-stone-500">Market Reality: What Different Roles Charge</h3>
            <div className="grid lg:grid-cols-3 gap-6">
              {/* UI/UX Designers */}
              <div className="bg-white p-8 rounded-xl border border-stone-100 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-pink-50 rounded-lg text-pink-600"><Layers className="w-5 h-5" /></div>
                  <h4 className="font-serif font-bold text-lg">UI/UX Designers</h4>
                </div>
                <div className="text-sm text-stone-500 mb-4 font-mono">$50–$200/hr or $3k–$10k/project</div>
                <p className="text-sm text-stone-600 mb-4 font-medium">Delivers: Screens, visuals, user flows.</p>
                <div className="flex items-start gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-lg">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>Limitation: Rarely architects backend logic or deployment. Designs may break when coded.</span>
                </div>
              </div>

              {/* Web Developers */}
              <div className="bg-white p-8 rounded-xl border border-stone-100 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-50 rounded-lg text-blue-600"><Code className="w-5 h-5" /></div>
                  <h4 className="font-serif font-bold text-lg">Web Developers</h4>
                </div>
                <div className="text-sm text-stone-500 mb-4 font-mono">$75–$150/hr or $5k–$15k/project</div>
                <p className="text-sm text-stone-600 mb-4 font-medium">Delivers: Code implementation of requirements.</p>
                <div className="flex items-start gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-lg">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>Limitation: Often builds what they're told. Flawed architecture leads to expensive rewrites.</span>
                </div>
              </div>

              {/* Software Engineers */}
              <div className="bg-white p-8 rounded-xl border border-stone-100 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-orange-50 rounded-lg text-orange-600"><Cpu className="w-5 h-5" /></div>
                  <h4 className="font-serif font-bold text-lg">Software Engineers</h4>
                </div>
                <div className="text-sm text-stone-500 mb-4 font-mono">$120–$250/hr or $10k–$30k+</div>
                <p className="text-sm text-stone-600 mb-4 font-medium">Delivers: Robust logic and performance.</p>
                <div className="flex items-start gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-lg">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>Limitation: Rarely owns the full product experience or human behavior aspect.</span>
                </div>
              </div>
            </div>
          </div>

          {/* The Difference Block */}
          <div className="bg-stone-900 text-stone-300 rounded-2xl p-8 md:p-12 mb-20 relative overflow-hidden">
            <div className="relative z-10 max-w-4xl mx-auto">
              <h3 className="text-2xl font-serif font-bold text-white mb-6 text-center">Where My Work Is Different</h3>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <p className="mb-4">
                    I operate above individual roles as a <span className="text-indigo-400 font-bold">Product & Systems Architect</span>.
                    I integrate product thinking, system architecture, UI/UX clarity, and real-world deployment.
                  </p>
                  <p className="text-stone-400 text-sm">
                    I’m responsible for the structure of the system, not just pieces of it. This reduces technical debt, rewrites, and burnout while increasing speed and confidence.
                  </p>
                </div>
                <div className="bg-stone-800/50 p-6 rounded-xl border border-stone-700">
                  <h4 className="text-white font-bold mb-4 flex items-center gap-2"><TrendingUp className="w-5 h-5 text-emerald-400" /> My Pricing Reflects:</h4>
                  <ul className="space-y-3 text-sm">
                    <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5" /> Architectural decision-making</li>
                    <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5" /> Rapid pattern recognition</li>
                    <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5" /> Compressing months of iteration into weeks</li>
                    <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5" /> Responsibility for system integrity</li>
                  </ul>
                </div>
              </div>
            </div>
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          </div>

          {/* Pricing Ranges */}
          <h3 className="text-3xl font-serif font-bold text-stone-900 mb-10 text-center">Pricing Ranges</h3>
          <div className="grid md:grid-cols-3 gap-8 mb-20">

            {/* Card 1 */}
            <div className="border border-stone-200 rounded-2xl p-8 hover:shadow-lg transition-all bg-white flex flex-col">
              <div className="mb-6">
                <h4 className="text-xl font-bold text-stone-900 mb-2">Web Pages & Digital Platforms</h4>
                <p className="text-stone-500 text-sm">Architecture-led websites and marketing platforms</p>
              </div>
              <div className="text-3xl font-serif font-bold text-stone-900 mb-6">$4k – $10k</div>
              <div className="space-y-3 mb-8 flex-grow">
                {["Information architecture", "UI/UX system design", "Flow optimization", "Integration planning", "Deployment-ready structure"].map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-stone-700">
                    <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-1.5 shrink-0" /> {item}
                  </div>
                ))}
              </div>
              <a href="mailto:Hello@lunarosedhealinghub.com" className="w-full py-3 text-center border border-stone-900 rounded-lg font-medium hover:bg-stone-50 transition-colors">Request Quote</a>
            </div>

            {/* Card 2 */}
            <div className="border border-indigo-200 rounded-2xl p-8 shadow-xl shadow-indigo-100 bg-white relative flex flex-col transform md:-translate-y-4">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-indigo-600 text-white px-4 py-1 rounded-full text-xs font-bold tracking-wider uppercase">Most Common</div>
              <div className="mb-6 mt-2">
                <h4 className="text-xl font-bold text-stone-900 mb-2">Web App & SaaS Architecture</h4>
                <p className="text-stone-500 text-sm">System-first design for scalable applications</p>
              </div>
              <div className="mb-6">
                <div className="text-2xl font-serif font-bold text-stone-900">$8k – $18k</div>
                <div className="text-xs text-stone-500 uppercase tracking-wide mb-2">Architecture + Guidance</div>
                <div className="text-2xl font-serif font-bold text-stone-900 mt-4">$15k – $40k+</div>
                <div className="text-xs text-stone-500 uppercase tracking-wide">Full Build (0 → Deploy)</div>
              </div>
              <div className="space-y-3 mb-8 flex-grow">
                {["Product architecture", "UI/UX systems", "Data and state flow", "Integration strategy", "Deployment execution"].map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-stone-700">
                    <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-1.5 shrink-0" /> {item}
                  </div>
                ))}
              </div>
              <a href="mailto:Hello@lunarosedhealinghub.com" className="w-full py-3 text-center bg-stone-900 text-white rounded-lg font-medium hover:bg-stone-800 transition-colors">Request Quote</a>
            </div>

            {/* Card 3 */}
            <div className="border border-stone-200 rounded-2xl p-8 hover:shadow-lg transition-all bg-stone-50 flex flex-col">
              <div className="mb-6">
                <h4 className="text-xl font-bold text-stone-900 mb-2">Build Partnerships</h4>
                <p className="text-stone-500 text-sm">For products with strong alignment & long-term potential</p>
              </div>
              <div className="text-3xl font-serif font-bold text-stone-900 mb-6">Limited</div>
              <div className="space-y-3 mb-8 flex-grow">
                {["Reduced upfront cost", "Time-bound revenue share or equity", "Clear scope and exit terms", "Long-term partnership"].map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-stone-700">
                    <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-1.5 shrink-0" /> {item}
                  </div>
                ))}
              </div>
              <a href="mailto:Hello@lunarosedhealinghub.com" className="w-full py-3 text-center border border-stone-300 text-stone-600 rounded-lg font-medium hover:bg-white transition-colors">Apply for Partnership</a>
            </div>
          </div>

          {/* Fit Section */}
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto border-t border-stone-200 pt-16">
            <div>
              <h4 className="font-bold text-stone-900 mb-6 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" /> Best Fit For:
              </h4>
              <ul className="space-y-4">
                {["Founders building real products", "Teams that value long-term thinking", "People who want clarity before scale", "Those valuing calm execution"].map((item, i) => (
                  <li key={i} className="flex gap-3 text-stone-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0"></span> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-stone-900 mb-6 flex items-center gap-2">
                <XCircle className="w-5 h-5 text-red-400" /> Not a Fit For:
              </h4>
              <ul className="space-y-4">
                {["Budget-first decision makers", "“Just make it work for now” thinking", "Projects without ownership or vision", "Quick hacks or shortcuts"].map((item, i) => (
                  <li key={i} className="flex gap-3 text-stone-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-stone-300 mt-2 shrink-0"></span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Final Value Note */}
          <div className="mt-20 text-center max-w-2xl mx-auto bg-indigo-50 p-8 rounded-2xl">
            <h4 className="font-serif font-bold text-indigo-900 mb-2">A Final Note on Value</h4>
            <p className="text-indigo-800/80 mb-0">
              The cost of my work is often less than the cost of fixing the wrong architecture later. My role is to see what’s coming early and design systems that grow cleanly instead of collapsing.
            </p>
          </div>

        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="bg-stone-50 rounded-3xl p-8 md:p-16 border border-stone-100 text-center">
            <h2 className="text-3xl font-serif font-bold text-stone-900 mb-6">Ready to build something resilient?</h2>
            <p className="text-stone-600 mb-8 max-w-lg mx-auto">
              If this approach resonates, let’s explore whether we’re aligned.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="mailto:Hello@lunarosedhealinghub.com"
                className="flex items-center gap-2 px-8 py-4 bg-stone-900 text-white font-medium rounded-lg hover:bg-stone-800 transition-all hover:-translate-y-1 shadow-lg shadow-stone-900/10"
              >
                <Mail className="w-4 h-4" />
                Request a Quote
              </a>
              <span className="text-stone-400 text-sm font-medium">or email Hello@lunarosedhealinghub.com</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12 px-6 border-t border-stone-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Logo className="w-6 h-6" />
            <p className="text-stone-500 text-sm">
              © {new Date().getFullYear()} Piya LunaRose Studio. All rights reserved.
            </p>
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-stone-400 hover:text-stone-900 transition-colors">LinkedIn</a>
            <a href="#" className="text-stone-400 hover:text-stone-900 transition-colors">Twitter</a>
            <a href="#" className="text-stone-400 hover:text-stone-900 transition-colors">Instagram</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
