import React from 'react';
import { motion } from 'framer-motion';
import {
    Code,
    Heart,
    Activity,
    Zap,
    ArrowRight,
    CheckCircle2,
    Quote
} from 'lucide-react';
import KineticPhrase from '../components/KineticPhrase';

const ServiceCard = ({ icon: Icon, title, description, tags, points }) => (
    <div className="bg-white/60 backdrop-blur-md p-8 rounded-3xl border border-stone-200 hover:border-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-500 group">
        <div className="mb-6 inline-block p-3 bg-indigo-50 rounded-2xl group-hover:bg-indigo-100 transition-colors">
            <Icon className="w-8 h-8 text-indigo-600 group-hover:text-indigo-700 transition-colors" />
        </div>
        <h3 className="text-xl font-serif font-bold text-stone-900 mb-3 tracking-tight">{title}</h3>
        <p className="text-stone-600 mb-6 leading-relaxed font-light">{description}</p>

        <ul className="mb-6 space-y-3">
            {points.map((point, idx) => (
                <li key={idx} className="flex items-start text-sm text-stone-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mr-2 mt-0.5 shrink-0" />
                    <span>{point}</span>
                </li>
            ))}
        </ul>

        <div className="flex flex-wrap gap-2 pt-4 border-t border-stone-100">
            {tags.map((tag, idx) => (
                <span key={idx} className="text-[10px] font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-100">
                    {tag}
                </span>
            ))}
        </div>
    </div>
);

const WorkCard = ({ title, subtitle, role, focus, colorClass, link }) => {
    const CardContent = (
        <>
            <div className={`absolute top-0 left-0 w-1.5 h-full ${colorClass} opacity-60 transition-all duration-500 group-hover:w-3`} />
            <div className="p-10 md:p-14">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6 mb-10">
                    <div>
                        <h3 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 tracking-tight">{title}</h3>
                        <p className="text-indigo-600 font-medium mt-2 tracking-wide text-lg">{subtitle}</p>
                    </div>
                    <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-stone-50 border border-stone-200 group-hover:bg-stone-900 group-hover:text-white transition-all duration-500 shadow-sm">
                        <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-1" />
                    </span>
                </div>

                <div className="grid md:grid-cols-2 gap-10 mt-10 border-t border-stone-100 pt-10">
                    <div>
                        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400 block mb-3">Role</span>
                        <p className="text-stone-800 font-normal leading-relaxed text-lg">{role}</p>
                    </div>
                    <div>
                        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400 block mb-3">Focus</span>
                        <p className="text-stone-800 font-normal leading-relaxed text-lg">{focus}</p>
                    </div>
                </div>
            </div>
        </>
    );

    if (link) {
        return (
            <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block overflow-hidden rounded-[2.5rem] bg-white border border-stone-200 transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-500/10 hover:border-stone-300"
            >
                {CardContent}
            </a>
        );
    }

    return (
        <div className="group relative overflow-hidden rounded-[2.5rem] bg-white border border-stone-200 transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-500/10 hover:border-stone-300">
            {CardContent}
        </div>
    );
};

const Home = ({ setShowGate }) => {
    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            {/* Hero Section */}
            <section className="relative pt-40 pb-24 md:pt-60 md:pb-48 px-6 overflow-hidden z-10">
                <div className="max-w-6xl mx-auto text-center relative z-10">
                    <motion.div
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/80 border border-stone-200 text-stone-600 text-[10px] font-bold tracking-[0.3em] uppercase mb-12 shadow-sm backdrop-blur-sm"
                    >
                        <Zap className="w-4 h-4 text-indigo-500" />
                        <span>Systems • Clarity • Resilience</span>
                    </motion.div>

                    <h1 className="font-serif text-stone-900 !tracking-tight !leading-[1.1] mb-12 flex flex-col items-center">
                        <span className="!text-[48px] md:!text-[84px] !font-bold !tracking-tighter">Architecting</span>
                        <span className="!text-[42px] md:!text-[72px] !font-semibold !text-indigo-600/90 !opacity-[0.9] -mt-2">scalable systems</span>
                        <KineticPhrase
                            text="& embodied practices."
                            className="!text-[22px] md:!text-[34px] !font-bold italic !text-red-600 !opacity-[1] mt-3 !tracking-wide"
                        />
                    </h1>

                    <p className="text-xl md:text-2xl text-stone-600 max-w-2xl mx-auto mb-16 leading-relaxed font-light">
                        I work at the intersection of software architecture, UI/UX design, and human-centered systems to bring flow and resilience back online.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                        <a
                            href="mailto:Hello@lunarosedhealinghub.com?subject=Project Inquiry"
                            className="w-full sm:w-auto px-12 py-5 bg-stone-900 text-white font-bold rounded-2xl hover:bg-stone-800 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-stone-900/20 flex items-center justify-center gap-3 group"
                        >
                            Request a Quote <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                        </a>
                        <button
                            onClick={() => scrollToSection('work')}
                            className="w-full sm:w-auto px-12 py-5 bg-white border border-stone-200 text-stone-900 font-bold rounded-2xl hover:bg-stone-50 hover:border-stone-400 transition-all shadow-sm"
                        >
                            View Selected Work
                        </button>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section id="services" className="py-32 px-6 relative z-10 bg-white/40 border-t border-stone-100">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-24">
                        <h2 className="text-5xl md:text-7xl font-serif font-bold text-stone-900 mb-8 tracking-tight">What I Do</h2>
                        <div className="w-32 h-1.5 bg-gradient-to-r from-indigo-500 to-transparent mx-auto rounded-full" />
                    </div>

                    <div className="grid lg:grid-cols-3 gap-10">
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
                            tags={["Architecture", "UI/UX", "SaaS"]}
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
                            tags={["Somatic", "Healing", "Yoga"]}
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
                            tags={["Movement", "Boxing", "Flow"]}
                        />
                    </div>
                </div>
            </section>

            {/* Work Section */}
            <section id="work" className="py-32 px-6 bg-stone-50/50 border-y border-stone-200 relative z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-24 text-center md:text-left">
                        <h2 className="text-5xl md:text-7xl font-serif font-bold text-stone-900 mb-8 tracking-tight">Selected Work</h2>
                        <p className="text-stone-500 text-2xl font-light max-w-2xl">Projects spanning technical architecture and organic systems.</p>
                    </div>

                    <div className="grid gap-16">
                        <WorkCard
                            title="Moonchild Thai Spa"
                            subtitle="Healing Sanctuary & System"
                            role="Founder • Systems Design • Methodology"
                            focus="Human-centered healing and educational flow."
                            colorClass="bg-emerald-500"
                            link="https://maps.app.goo.gl/QQivX2ioEXEiaTUB8"
                        />
                        <WorkCard
                            title="ClarittView™"
                            subtitle="SaaS Product Platform"
                            role="Product Architect • UI/UX • Build"
                            focus="Clean interfaces and predictable system logic."
                            colorClass="bg-indigo-600"
                            link="https://www.clarittview.com/"
                        />
                    </div>
                </div>
            </section>

            {/* Engagement Section */}
            <section className="py-32 px-6 relative z-10 bg-white">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-center">
                    <div>
                        <h2 className="text-5xl md:text-6xl font-serif font-bold text-stone-900 mb-10 tracking-tight leading-tight">Intentional Engagement</h2>
                        <p className="text-2xl text-stone-500 mb-14 leading-relaxed font-light">
                            Scoped, structured, and intentional partnerships that prioritize long-term resilience over quick shortcuts.
                        </p>
                        <div className="space-y-6">
                            {["Web & product architecture", "System flow mapping", "Full web app builds", "Embodiment training"].map((item, i) => (
                                <div key={i} className="flex items-center gap-6 text-stone-800">
                                    <div className="w-3 h-3 rounded-full bg-indigo-600 shadow-lg shadow-indigo-600/20" />
                                    <span className="font-medium tracking-wide text-xl">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="bg-[#0a0c1a] p-12 md:p-20 rounded-[3rem] border border-stone-800 relative group shadow-2xl">
                        <Quote className="absolute top-12 left-12 w-20 h-20 text-white/5 group-hover:text-white/10 transition-colors" />
                        <div className="relative z-10 pt-12">
                            <h3 className="text-3xl md:text-4xl font-serif text-white mb-14 leading-[1.4] font-light italic">
                                "Clarity reduces friction, and reduced friction enables growth."
                            </h3>
                            <div className="flex items-center gap-6">
                                <div className="w-20 h-px bg-indigo-500/50" />
                                <p className="text-stone-400 font-bold tracking-[0.3em] text-sm uppercase">Piya LunaRose</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-32 px-6 bg-stone-50 border-t border-stone-200 relative z-10">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-20">
                        <span className="text-[10px] font-bold tracking-[0.4em] text-indigo-600 uppercase mb-6 block">About the Architect</span>
                        <h2 className="text-5xl md:text-7xl font-serif font-bold text-stone-900 tracking-tight">Principles of Growth</h2>
                    </div>
                    <div className="prose prose-stone prose-2xl mx-auto text-stone-600 font-light leading-[1.7]">
                        <p className="mb-10 text-stone-900 font-normal">
                            I move quickly because I think in systems. Once I understand the core problem, I map how data, users, and operations interact — then execute without detours.
                        </p>
                        <div className="bg-white p-12 rounded-[2.5rem] border border-stone-200 my-16 not-prose shadow-sm ring-1 ring-stone-900/5">
                            <h4 className="font-serif text-3xl font-bold text-stone-900 mb-8">Core Mission</h4>
                            <ul className="grid gap-6">
                                {[
                                    "Reduce friction before it appears",
                                    "Prevent expensive rewrites",
                                    "Intuitive systems, calm operations",
                                    "Scale without chaos"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-5 text-stone-800 font-medium text-xl">
                                        <CheckCircle2 className="w-7 h-7 text-emerald-600" />
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
            <section id="investment" className="py-32 px-6 relative z-10 bg-[#f8f9ff] border-t border-indigo-100">
                <div className="max-w-7xl mx-auto text-center mb-24">
                    <h2 className="text-5xl md:text-7xl font-serif font-bold text-stone-900 mb-8 tracking-tight">Investment</h2>
                    <p className="text-stone-500 text-2xl font-light max-w-2xl mx-auto italic">"Paying for clarity now saves you from chaos later."</p>
                </div>
                <div className="grid lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
                    <div className="bg-white p-12 rounded-[2.5rem] border border-stone-200 flex flex-col items-center text-center shadow-sm">
                        <h4 className="text-2xl font-serif font-bold text-stone-900 mb-4">Digital Platforms</h4>
                        <div className="text-5xl font-serif font-bold text-indigo-600 mb-10 mt-6">$4k – $10k</div>
                        <ul className="text-lg text-stone-500 space-y-5 mb-12 flex-grow">
                            <li>Architecture Mapping</li>
                            <li>UI/UX Design Systems</li>
                            <li>Deployment Strategy</li>
                        </ul>
                        <a href="mailto:Hello@lunarosedhealinghub.com" className="w-full py-5 text-stone-900 border-2 border-stone-900 rounded-2xl font-bold hover:bg-stone-50 transition-colors">Inquire</a>
                    </div>
                    <div className="bg-white p-12 rounded-[2.5rem] border-2 border-indigo-600 flex flex-col items-center text-center shadow-2xl shadow-indigo-500/10 ring-1 ring-indigo-500/20 transform md:-translate-y-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 bg-indigo-600 text-white px-6 py-2 rounded-bl-2xl text-[10px] font-bold tracking-widest uppercase">Popular</div>
                        <h4 className="text-2xl font-serif font-bold text-stone-900 mb-4 pt-4">SaaS Architecture</h4>
                        <div className="text-5xl font-serif font-bold text-stone-900 mb-10 mt-6">$8k – $25k+</div>
                        <ul className="text-lg text-indigo-600 font-medium space-y-5 mb-12 flex-grow">
                            <li>Full System Builds</li>
                            <li>Data Flow Logic</li>
                            <li>Operational Resilience</li>
                        </ul>
                        <a href="mailto:Hello@lunarosedhealinghub.com" className="w-full py-5 bg-stone-900 text-white font-bold rounded-2xl hover:bg-stone-800 shadow-xl shadow-stone-900/20 transition-all">Select Tier</a>
                    </div>
                    <div className="bg-stone-50/50 p-12 rounded-[2.5rem] border border-stone-200 flex flex-col items-center text-center">
                        <h4 className="text-2xl font-serif font-bold text-stone-400 mb-4">Partnerships</h4>
                        <div className="text-5xl font-serif font-bold text-stone-300 mb-10 mt-6">Limited</div>
                        <ul className="text-lg text-stone-400 space-y-5 mb-12 flex-grow">
                            <li>High-Alignment Builds</li>
                            <li>Long-term Support</li>
                            <li>Equity Options</li>
                        </ul>
                        <a href="mailto:Hello@lunarosedhealinghub.com" className="w-full py-5 text-stone-400 border-2 border-stone-200 rounded-2xl font-bold cursor-not-allowed">Apply</a>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-32 px-6 relative z-10 bg-white border-t border-stone-100">
                <div className="max-w-6xl mx-auto">
                    <div className="bg-stone-900 rounded-[4rem] p-16 md:p-32 text-center relative overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.1)]">
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-900/20 to-transparent"></div>
                        <h2 className="text-5xl md:text-8xl font-serif font-bold text-white mb-12 relative z-10 tracking-tight">Build something resilient.</h2>
                        <div className="flex flex-col sm:flex-row gap-8 justify-center items-center relative z-10">
                            <button
                                onClick={() => setShowGate(true)}
                                className="px-16 py-6 bg-white text-stone-900 font-bold text-xl rounded-3xl hover:scale-105 transition-all shadow-2xl shadow-white/10"
                            >
                                Start Engagement
                            </button>
                            <span className="text-stone-400 font-light text-xl tracking-wider">Hello@lunarosedhealinghub.com</span>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;
