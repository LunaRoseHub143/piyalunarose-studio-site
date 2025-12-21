import React, { useState, useEffect } from 'react';
import {
    ArrowRight,
    ArrowLeft,
    RefreshCw,
    CheckCircle2,
    ChevronRight,
    ShieldCheck,
    Zap,
    DollarSign,
    Layers,
    Calendar,
    MessageSquare,
    FileText,
    Mail,
    ExternalLink,
    X
} from 'lucide-react';

const DecisionGate = ({ isOpen, onClose }) => {
    const [step, setStep] = useState(1);
    const [answers, setAnswers] = useState({});
    const [isResultOpen, setIsResultOpen] = useState(false);

    // Load progress from localStorage
    useEffect(() => {
        const saved = localStorage.getItem('piya_decision_gate_progress');
        if (saved) {
            const { step: savedStep, answers: savedAnswers } = JSON.parse(saved);
            // Only set if not already completed/in results view
            if (!isResultOpen) {
                setStep(savedStep || 1);
                setAnswers(savedAnswers || {});
            }
        }
    }, []);

    // Save progress to localStorage
    useEffect(() => {
        if (!isResultOpen) {
            localStorage.setItem('piya_decision_gate_progress', JSON.stringify({ step, answers }));
        }
    }, [step, answers, isResultOpen]);

    if (!isOpen) return null;

    const resetGate = () => {
        setStep(1);
        setAnswers({});
        setIsResultOpen(false);
        localStorage.removeItem('piya_decision_gate_progress');
    };

    const handleChoice = (key, value, nextStep) => {
        setAnswers(prev => ({ ...prev, [key]: value }));
        if (nextStep === 'RESULTS') {
            setIsResultOpen(true);
            // Track completion
            console.log('Gate Completed:', { ...answers, [key]: value });
        } else {
            setStep(nextStep);
        }
    };

    const goBack = () => {
        // Logic for complex routing
        if (step === 3) {
            if (answers.projectType === 'A public website (no login)') setStep('2A');
            else if (answers.projectType === 'A login portal (users sign in)') setStep('2B');
            else if (answers.projectType === 'A full web platform (many features)') setStep('2C');
        } else if (['2A', '2B', '2C'].includes(step)) {
            setStep(1);
        } else if (typeof step === 'number' && step > 3) {
            setStep(step - 1);
        }
    };

    // ---------------------------------------------------------------------------
    // Classification Logic
    // ---------------------------------------------------------------------------
    const getResults = () => {
        const category = answers.projectType === 'A public website (no login)' ? 'Public Website'
            : answers.projectType === 'A login portal (users sign in)' ? 'Login Portal'
                : 'Full Platform';

        const flags = {
            needsLogin: answers.projectType !== 'A public website (no login)',
            needsDataStorage: answers.projectType !== 'A public website (no login)' || answers.subGoal === 'Contact + quote request funnel',
            needsPayments: answers.needsPayments === 'Yes, users pay inside the system',
            needsBooking: answers.subGoal === 'Book appointments / manage bookings' || answers.subGoal === 'Bookings and scheduling',
            needsMessagingOrFiles: answers.subGoal === 'Message / upload files / shared workspace',
            multiBusiness: answers.subGoal === 'Multi-business or multi-location system'
        };

        const budget = answers.budget;
        const requirements = answers.requirements;
        const launch = answers.launch;

        let path = 'Request a Quote'; // Default

        // Rule 1 & 2: Budget under $2000
        if (budget === 'Under $2,000') {
            if (category === 'Full Platform' || flags.needsPayments) {
                path = 'DIY Resources';
            } else {
                path = 'DIY Resources'; // Broad filter for under $2000 if complexity is moderate
            }
        }

        // Rule 3: Budget $2000-$10000 + Public/Portal
        if (budget === '$2,000–$10,000' && (category === 'Public Website' || category === 'Login Portal')) {
            path = 'Request a Quote';
        }

        // Rule 4: $10,000+ or Full Platform
        if (budget === '$10,000+' || category === 'Full Platform') {
            path = 'Apply';
        }

        // Rule 5: Help defining + ASAP
        if (requirements === 'No, I need help defining it' && launch === 'As soon as possible (1–2 weeks)') {
            path = 'Request a Quote';
        }

        // Generate Summary Text
        const summary = `You’re building a ${category} ${answers.subGoal ? `focused on ${answers.subGoal.toLowerCase()}` : ''}. ${flags.needsPayments ? 'Payments are required.' : 'No internal payments needed.'} Your launch window is ${launch?.toLowerCase()}, and you have ${requirements?.toLowerCase()}. Recommended next step: ${path}.`;

        return { path, category, flags, summary };
    };

    const results = isResultOpen ? getResults() : null;

    // ---------------------------------------------------------------------------
    // Render Helpers
    // ---------------------------------------------------------------------------
    const StepCard = ({ title, description, progress, children }) => (
        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-indigo-500/10 border border-stone-200 p-8 md:p-14 w-full max-w-2xl relative overflow-hidden animate-in fade-in zoom-in duration-500">
            <div className="flex justify-between items-center mb-10">
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-stone-400">{progress}</span>
                <div className="flex gap-2">
                    {step !== 1 && (
                        <button onClick={goBack} className="p-2 hover:bg-stone-50 rounded-full transition-colors text-stone-400 hover:text-stone-900">
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                    )}
                    <button onClick={resetGate} className="p-2 hover:bg-stone-50 rounded-full transition-colors text-stone-400 hover:text-stone-900">
                        <RefreshCw className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-4 leading-tight">{title}</h2>
            <p className="text-stone-500 text-lg mb-10 font-light leading-relaxed">{description}</p>

            <div className="space-y-4">
                {children}
            </div>
        </div>
    );

    const ChoiceButton = ({ text, onClick }) => (
        <button
            onClick={onClick}
            className="w-full p-6 text-left rounded-2xl border border-stone-100 bg-stone-50/50 hover:bg-white hover:border-indigo-600 hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-300 group flex items-center justify-between"
        >
            <span className="text-lg font-medium text-stone-800 group-hover:text-indigo-600 transition-colors uppercase tracking-wide text-sm">{text}</span>
            <ChevronRight className="w-5 h-5 text-stone-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
        </button>
    );

    // ---------------------------------------------------------------------------
    // Step Content Map
    // ---------------------------------------------------------------------------
    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <StepCard
                        title="What are you building?"
                        description="Let's start by defining the core nature of your project."
                        progress="Step 1 of 6"
                    >
                        <ChoiceButton text="A public website (no login)" onClick={() => handleChoice('projectType', 'A public website (no login)', '2A')} />
                        <ChoiceButton text="A login portal (users sign in)" onClick={() => handleChoice('projectType', 'A login portal (users sign in)', '2B')} />
                        <ChoiceButton text="A full web platform (many features)" onClick={() => handleChoice('projectType', 'A full web platform (many features)', '2C')} />
                    </StepCard>
                );
            case '2A':
                return (
                    <StepCard
                        title="What is the main goal of the website?"
                        description="Helping me understand the scope of the public-facing content."
                        progress="Step 2 of 6"
                    >
                        <ChoiceButton text="Portfolio / landing page" onClick={() => handleChoice('subGoal', 'Portfolio / landing page', 3)} />
                        <ChoiceButton text="Marketing site (pages + blog content)" onClick={() => handleChoice('subGoal', 'Marketing site (pages + blog content)', 3)} />
                        <ChoiceButton text="Contact + quote request funnel" onClick={() => handleChoice('subGoal', 'Contact + quote request funnel', 3)} />
                    </StepCard>
                );
            case '2B':
                return (
                    <StepCard
                        title="What do users do after they sign in?"
                        description="Authentication adds complexity, tell me about the features."
                        progress="Step 2 of 6"
                    >
                        <ChoiceButton text="View their history or account" onClick={() => handleChoice('subGoal', 'View their history or account', 3)} />
                        <ChoiceButton text="Book appointments / manage bookings" onClick={() => handleChoice('subGoal', 'Book appointments / manage bookings', 3)} />
                        <ChoiceButton text="Message / upload files / shared workspace" onClick={() => handleChoice('subGoal', 'Message / upload files / shared workspace', 3)} />
                    </StepCard>
                );
            case '2C':
                return (
                    <StepCard
                        title="Which features are required?"
                        description="Broad platforms need clear primary requirements."
                        progress="Step 2 of 6"
                    >
                        <ChoiceButton text="Bookings and scheduling" onClick={() => handleChoice('subGoal', 'Bookings and scheduling', 3)} />
                        <ChoiceButton text="Client accounts and dashboards" onClick={() => handleChoice('subGoal', 'Client accounts and dashboards', 3)} />
                        <ChoiceButton text="Multi-business or multi-location system" onClick={() => handleChoice('subGoal', 'Multi-business or multi-location system', 3)} />
                    </StepCard>
                );
            case 3:
                return (
                    <StepCard
                        title="Do you need payments inside the system?"
                        description="Handling money requires higher security and integration."
                        progress="Step 3 of 6"
                    >
                        <ChoiceButton text="Yes, users pay inside the system" onClick={() => handleChoice('needsPayments', 'Yes, users pay inside the system', 4)} />
                        <ChoiceButton text="No, no payments needed" onClick={() => handleChoice('needsPayments', 'No, no payments needed', 4)} />
                        <ChoiceButton text="Not sure yet" onClick={() => handleChoice('needsPayments', 'Not sure yet', 4)} />
                    </StepCard>
                );
            case 4:
                return (
                    <StepCard
                        title="How soon are you trying to launch?"
                        description="Timelines help me assess current availability and speed requirements."
                        progress="Step 4 of 6"
                    >
                        <ChoiceButton text="As soon as possible (1–2 weeks)" onClick={() => handleChoice('launch', 'As soon as possible (1–2 weeks)', 5)} />
                        <ChoiceButton text="Soon (3–6 weeks)" onClick={() => handleChoice('launch', 'Soon (3–6 weeks)', 5)} />
                        <ChoiceButton text="Planned (6+ weeks)" onClick={() => handleChoice('launch', 'Planned (6+ weeks)', 5)} />
                    </StepCard>
                );
            case 5:
                return (
                    <StepCard
                        title="Do you already have the content and requirements written?"
                        description="Clear documentation allows for a much smoother build phase."
                        progress="Step 5 of 6"
                    >
                        <ChoiceButton text="Yes, I have content and requirements" onClick={() => handleChoice('requirements', 'Yes, I have content and requirements', 6)} />
                        <ChoiceButton text="Somewhat (rough notes)" onClick={() => handleChoice('requirements', 'Somewhat (rough notes)', 6)} />
                        <ChoiceButton text="No, I need help defining it" onClick={() => handleChoice('requirements', 'No, I need help defining it', 6)} />
                    </StepCard>
                );
            case 6:
                return (
                    <StepCard
                        title="What is your budget range?"
                        description="This helps me recommend the most effective path for your project."
                        progress="Step 6 of 6"
                    >
                        <ChoiceButton text="Under $2,000" onClick={() => handleChoice('budget', 'Under $2,000', 'RESULTS')} />
                        <ChoiceButton text="$2,000–$10,000" onClick={() => handleChoice('budget', '$2,000–$10,000', 'RESULTS')} />
                        <ChoiceButton text="$10,000+" onClick={() => handleChoice('budget', '$10,000+', 'RESULTS')} />
                    </StepCard>
                );
            default:
                return null;
        }
    };

    const renderResults = () => {
        if (!results) return null;

        const { path, summary } = results;

        const ResultLayout = ({ headline, icon: Icon, children, mainAction, actionText, actionLink }) => (
            <div className="bg-white rounded-[3rem] shadow-2xl shadow-indigo-500/10 border border-stone-200 w-full max-w-2xl relative overflow-hidden animate-in slide-in-from-bottom duration-700">
                <div className="absolute top-0 left-0 w-full h-2 bg-indigo-600" />
                <div className="p-10 md:p-14">
                    <div className="mb-10 inline-block p-4 bg-indigo-50 rounded-3xl">
                        <Icon className="w-10 h-10 text-indigo-600" />
                    </div>

                    <span className="block text-[10px] font-bold tracking-[0.4em] text-stone-400 uppercase mb-4">Recommended Next Step</span>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-8">{headline}</h2>

                    <div className="bg-stone-50 rounded-3xl p-8 mb-10 border border-stone-100">
                        <h4 className="text-sm font-bold uppercase tracking-widest text-stone-400 mb-4">Summary</h4>
                        <p className="text-stone-700 font-light leading-relaxed text-lg">{summary}</p>
                    </div>

                    <div className="mb-12">
                        <h4 className="text-sm font-bold uppercase tracking-widest text-stone-400 mb-6">Preparation Checklist</h4>
                        <ul className="space-y-4">
                            {children}
                        </ul>
                    </div>

                    {mainAction && (
                        <a
                            href={actionLink || `mailto:Hello@lunarosedhealinghub.com?subject=${path}`}
                            className="w-full flex items-center justify-center gap-3 p-6 bg-stone-900 text-white font-bold rounded-2xl hover:bg-stone-800 transition-all hover:scale-[1.02] shadow-xl shadow-stone-900/10 mb-6"
                        >
                            {actionText} <ArrowRight className="w-5 h-5" />
                        </a>
                    )}

                    <button
                        onClick={resetGate}
                        className="w-full p-6 bg-white border border-stone-200 text-stone-600 font-bold rounded-2xl hover:bg-stone-50 transition-all flex items-center justify-center gap-2"
                    >
                        <RefreshCw className="w-4 h-4" /> Restart Decision Gate
                    </button>
                </div>
            </div>
        );

        if (path === 'Apply') {
            return (
                <ResultLayout
                    headline="High-alignment build"
                    icon={Zap}
                    mainAction
                    actionText="Apply Now"
                    actionLink="mailto:Hello@lunarosedhealinghub.com?subject=Application for High-Alignment Build"
                >
                    <li className="flex gap-4 text-stone-600"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" /> Full business vision and goal mapping</li>
                    <li className="flex gap-4 text-stone-600"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" /> Detailed feature list or user stories</li>
                    <li className="flex gap-4 text-stone-600"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" /> Branding assets (logo, colors, fonts)</li>
                </ResultLayout>
            );
        }

        if (path === 'Request a Quote') {
            return (
                <ResultLayout
                    headline="Scoped build"
                    icon={Layers}
                    mainAction
                    actionText="Request a Quote"
                    actionLink="mailto:Hello@lunarosedhealinghub.com?subject=Quote Request for Scoped Build"
                >
                    <li className="flex gap-4 text-stone-600"><CheckCircle2 className="w-5 h-5 text-indigo-500 shrink-0" /> Page-by-page content outlines</li>
                    <li className="flex gap-4 text-stone-600"><CheckCircle2 className="w-5 h-5 text-indigo-500 shrink-0" /> Reference sites or design inspiration</li>
                    <li className="flex gap-4 text-stone-600"><CheckCircle2 className="w-5 h-5 text-indigo-500 shrink-0" /> Desired functional requirements</li>
                </ResultLayout>
            );
        }

        // DIY Resources path
        return (
            <ResultLayout headline="Best next step: DIY path" icon={ShieldCheck}>
                <div className="space-y-6">
                    <p className="text-stone-500 font-light italic text-sm mb-4">You're in a great planning phase. These resources will help you move forward:</p>
                    <a href="#" className="flex items-center justify-between p-4 bg-white border border-stone-100 rounded-xl hover:border-indigo-200 transition-colors group">
                        <span className="font-medium text-stone-800">How to choose your tech stack</span>
                        <ExternalLink className="w-4 h-4 text-stone-300 group-hover:text-indigo-500" />
                    </a>
                    <a href="#" className="flex items-center justify-between p-4 bg-white border border-stone-100 rounded-xl hover:border-indigo-200 transition-colors group">
                        <span className="font-medium text-stone-800">How to write clear requirements</span>
                        <ExternalLink className="w-4 h-4 text-stone-300 group-hover:text-indigo-500" />
                    </a>
                    <a href="#" className="flex items-center justify-between p-4 bg-white border border-stone-100 rounded-xl hover:border-indigo-200 transition-colors group">
                        <span className="font-medium text-stone-800">Page planning for clarity</span>
                        <ExternalLink className="w-4 h-4 text-stone-300 group-hover:text-indigo-500" />
                    </a>
                </div>
            </ResultLayout>
        );
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-white/40 backdrop-blur-3xl animate-in fade-in duration-500 overflow-y-auto">
            <div className="absolute top-10 right-10 z-[110]">
                <button
                    onClick={onClose}
                    className="p-4 bg-white shadow-xl shadow-stone-900/5 border border-stone-200 rounded-full hover:scale-110 transition-all text-stone-400 hover:text-stone-900"
                >
                    <X className="w-6 h-6" />
                </button>
            </div>

            <div className="w-full flex justify-center py-20">
                {isResultOpen ? renderResults() : renderStep()}
            </div>
        </div>
    );
};

export default DecisionGate;
