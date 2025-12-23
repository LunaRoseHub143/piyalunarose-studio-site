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
import { supabase } from '../lib/supabase';

const DecisionGate = ({ isOpen, onClose }) => {
    const [step, setStep] = useState(1);
    const [answers, setAnswers] = useState({});
    const [isResultOpen, setIsResultOpen] = useState(false);
    const [outcome, setOutcome] = useState(null); // { status: 'NotFit' | 'Standard' | 'FastTrack', reason: string, score: number }
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    // Load progress from localStorage
    useEffect(() => {
        const saved = localStorage.getItem('piya_decision_gate_progress');
        if (saved) {
            const { step: savedStep, answers: savedAnswers, timestamp } = JSON.parse(saved);
            // Expire after 24 hours
            const isExpired = Date.now() - (timestamp || 0) > 24 * 60 * 60 * 1000;
            if (!isExpired && !isResultOpen) {
                setStep(savedStep || 1);
                setAnswers(savedAnswers || {});
            }
        }
    }, []);

    // Save progress to localStorage
    useEffect(() => {
        if (!isResultOpen && step !== 1) {
            localStorage.setItem('piya_decision_gate_progress', JSON.stringify({
                step,
                answers,
                timestamp: Date.now()
            }));
        }
    }, [step, answers, isResultOpen]);

    if (!isOpen) return null;

    const resetGate = () => {
        if (Object.keys(answers).length > 0 && !isResultOpen) {
            if (!confirm("Exit and lose your progress?")) return;
        }
        setStep(1);
        setAnswers({});
        setIsResultOpen(false);
        setOutcome(null);
        setSubmitSuccess(false);
        localStorage.removeItem('piya_decision_gate_progress');
    };

    const handleChoice = (key, value, nextStep) => {
        const updatedAnswers = { ...answers, [key]: value };
        setAnswers(updatedAnswers);

        if (nextStep === 'RESULTS') {
            const result = calculateOutcome(updatedAnswers);
            setOutcome(result);
            setIsResultOpen(true);
            localStorage.removeItem('piya_decision_gate_progress');
        } else {
            setStep(nextStep);
        }
    };

    const calculateOutcome = (a) => {
        const buildType = a.projectType;
        const budget = a.budget;
        const timeline = a.launch;
        const payments = a.needsPayments === 'Yes, users pay inside the system';
        const requirements = a.requirements;

        // 1. NOT FIT (YET)
        // Non-negotiable: Full Platform requires 10k+ and 6+ weeks
        if (buildType === 'A full web platform (many features)') {
            if (budget !== '$10,000+' || timeline !== 'Planned (6+ weeks)') {
                return {
                    status: 'NotFit',
                    score: 35,
                    reason: 'Scope-to-budget mismatch',
                    details: 'Full web platforms require high-security integrations and architectural depth that necessitate a larger budget and longer timeline.'
                };
            }
        }

        // Unrealistic combos (ASAP + Payments + Low Budget)
        if (payments && timeline === 'As soon as possible (1–2 weeks)' && budget === 'Under $2,000') {
            return {
                status: 'NotFit',
                score: 25,
                reason: 'Timeline too aggressive for payments',
                details: 'Integrating secure payment systems responsibly is not feasible within a 1-2 week window on a limited budget.'
            };
        }

        // 2. FAST TRACK (BOOK)
        if (budget === '$10,000+' && timeline === 'Planned (6+ weeks)') {
            if (buildType === 'A full web platform (many features)') {
                return {
                    status: 'FastTrack',
                    score: 95,
                    reason: 'Meets Full Platform requirements'
                };
            }
            if (buildType === 'A login portal (users sign in)' && (requirements === 'Yes, I have content and requirements' || requirements === 'Somewhat (rough notes)')) {
                return {
                    status: 'FastTrack',
                    score: 90,
                    reason: 'High-alignment Project'
                };
            }
        }

        // 3. STANDARD (APPLY) - Default
        return {
            status: 'Standard',
            score: 70,
            reason: 'Suitable for Standard Review'
        };
    };

    const goBack = () => {
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

    const handleApplySubmit = async (formData) => {
        setIsSubmitting(true);
        try {
            const { error } = await supabase.from('leads').insert([{
                name: formData.name,
                email: formData.email,
                one_sentence_description: formData.description,
                build_type: answers.projectType,
                features: answers.subGoal ? [answers.subGoal] : [],
                payments_required: answers.needsPayments === 'Yes, users pay inside the system',
                timeline: answers.launch,
                requirements_status: answers.requirements,
                budget_range: answers.budget,
                outcome: outcome.status,
                outcome_reason: outcome.reason,
                raw_answers: answers
            }]);

            if (error) throw error;
            setSubmitSuccess(true);
        } catch (err) {
            console.error('Lead submission failed:', err);
            alert('Something went wrong. Please try again or email me directly.');
        } finally {
            setIsSubmitting(false);
        }
    };

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

    const StandardApplyForm = ({ onSubmit }) => {
        const [formData, setFormData] = useState({ name: '', email: '', description: '' });
        return (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom duration-500">
                <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-2 ml-1">Your Name</label>
                    <input
                        required
                        type="text"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        className="w-full p-4 bg-stone-50 border border-stone-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                        placeholder="e.g. Piya Phunsawat"
                    />
                </div>
                <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-2 ml-1">Email Address</label>
                    <input
                        required
                        type="email"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        className="w-full p-4 bg-stone-50 border border-stone-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                        placeholder="hello@example.com"
                    />
                </div>
                <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-2 ml-1">Project in one sentence</label>
                    <textarea
                        required
                        value={formData.description}
                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                        className="w-full p-4 bg-stone-50 border border-stone-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all min-h-[100px]"
                        placeholder="A platform for somatic practitioners to manage high-end retreats..."
                    />
                </div>
                <button
                    disabled={isSubmitting}
                    onClick={() => onSubmit(formData)}
                    className="w-full p-6 bg-stone-900 text-white font-bold rounded-2xl flex items-center justify-center gap-3 hover:bg-stone-800 disabled:opacity-50 transition-all shadow-xl shadow-stone-900/10"
                >
                    {isSubmitting ? <RefreshCw className="w-5 h-5 animate-spin" /> : 'Submit Application'} <ArrowRight className="w-5 h-5" />
                </button>
            </div>
        );
    };

    const renderResults = () => {
        if (!isResultOpen || !outcome) return null;

        const { status, score, reason, details } = outcome;

        const ResultCard = ({ title, icon: Icon, children, colorClass = "text-indigo-600", bgClass = "bg-indigo-50", borderClass = "border-indigo-600" }) => (
            <div className="bg-white rounded-[3rem] shadow-2xl shadow-indigo-500/10 border border-stone-200 w-full max-w-2xl relative overflow-hidden animate-in slide-in-from-bottom duration-700">
                <div className={`absolute top-0 left-0 w-full h-2 ${status === 'NotFit' ? 'bg-amber-400' : 'bg-indigo-600'}`} />
                <div className="p-10 md:p-14">
                    <div className="flex justify-between items-start mb-10">
                        <div className={`p-4 ${bgClass} rounded-3xl`}>
                            <Icon className={`w-10 h-10 ${colorClass}`} />
                        </div>
                        <div className="text-right">
                            <span className="block text-[10px] font-bold tracking-[0.4em] text-stone-400 uppercase mb-2">Alignment Score</span>
                            <span className={`text-4xl font-serif font-bold ${colorClass}`}>{score}</span>
                        </div>
                    </div>

                    <div className="mb-8">
                        <span className="block text-[10px] font-bold tracking-[0.4em] text-stone-400 uppercase mb-2">Reason: {reason}</span>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-6 leading-tight">{title}</h2>
                    </div>

                    {submitSuccess ? (
                        <div className="text-center py-10 animate-in fade-in zoom-in duration-500">
                            <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle2 className="w-10 h-10" />
                            </div>
                            <h3 className="text-2xl font-serif font-bold text-stone-900 mb-4">Application Sent</h3>
                            <p className="text-stone-500 font-light mb-8">I've received your details. Expect a personal response within 48 hours.</p>
                            <button onClick={resetGate} className="px-8 py-3 bg-stone-900 text-white font-bold rounded-full hover:scale-105 transition-all">Done</button>
                        </div>
                    ) : (
                        <div className="space-y-10">
                            {children}

                            <button
                                onClick={resetGate}
                                className="w-full p-4 border border-stone-100 text-stone-400 text-xs font-bold uppercase tracking-widest rounded-xl hover:text-stone-900 transition-colors flex items-center justify-center gap-2"
                            >
                                <RefreshCw className="w-3 h-3" /> Restart Decision Gate
                            </button>
                        </div>
                    )}
                </div>
            </div>
        );

        if (status === 'NotFit') {
            return (
                <ResultCard title="Not a fit (yet), but here are your next steps" icon={ShieldCheck} colorClass="text-amber-500" bgClass="bg-amber-50">
                    <div className="space-y-8">
                        <p className="text-stone-600 font-light text-lg leading-relaxed">
                            {details}
                        </p>

                        {answers.projectType === 'A full web platform (many features)' && (
                            <div className="p-6 bg-stone-50 rounded-2xl border border-stone-100">
                                <h4 className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-4">Full Platform Requirements</h4>
                                <ul className="space-y-3">
                                    <li className="flex items-center gap-3 text-sm font-medium">
                                        {answers.budget === '$10,000+' ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <X className="w-4 h-4 text-red-500" />}
                                        <span className={answers.budget === '$10,000+' ? 'text-stone-900' : 'text-stone-400'}>Budget: $10,000+</span>
                                    </li>
                                    <li className="flex items-center gap-3 text-sm font-medium">
                                        {answers.launch === 'Planned (6+ weeks)' ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <X className="w-4 h-4 text-red-500" />}
                                        <span className={answers.launch === 'Planned (6+ weeks)' ? 'text-stone-900' : 'text-stone-400'}>Timeline: 6+ weeks</span>
                                    </li>
                                </ul>
                            </div>
                        )}

                        <div className="grid grid-cols-1 gap-4">
                            <button
                                onClick={() => setStep(1)}
                                className="w-full p-6 bg-indigo-50 text-indigo-700 font-bold rounded-2xl border border-indigo-100 hover:bg-indigo-100 transition-all text-left flex items-center justify-between group"
                            >
                                <span>Reduce scope (MVP)</span>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                            <a
                                href="mailto:Hello@lunarosedhealinghub.com?subject=DIY Coaching Inquiry"
                                className="w-full p-6 border border-stone-200 text-stone-700 font-bold rounded-2xl hover:bg-stone-50 transition-all text-left flex items-center justify-between group"
                            >
                                <span>DIY with coaching</span>
                                <ExternalLink className="w-5 h-5 text-stone-300 group-hover:text-stone-900" />
                            </a>
                        </div>
                    </div>
                </ResultCard>
            );
        }

        if (status === 'FastTrack') {
            return (
                <ResultCard title="Fast Track: Book a Discovery Call" icon={Zap}>
                    <div className="space-y-8">
                        <p className="text-stone-600 font-light text-lg leading-relaxed">
                            Your project is highly aligned with my expertise and systems. Let's move straight to a roadmap discussion.
                        </p>

                        <div className="flex flex-col gap-4">
                            <a
                                href="BOOKING_URL_HERE"
                                target="_blank"
                                className="w-full p-6 bg-indigo-600 text-white font-bold rounded-2xl text-center shadow-xl shadow-indigo-600/20 hover:scale-[1.02] transition-all"
                            >
                                Book Roadmap Call
                            </a>
                            <button
                                onClick={() => setOutcome({ ...outcome, status: 'Standard' })}
                                className="text-stone-400 text-sm font-bold uppercase tracking-widest hover:text-stone-900 p-2"
                            >
                                Apply instead
                            </button>
                        </div>
                    </div>
                </ResultCard>
            );
        }

        // Standard Build (Apply)
        return (
            <ResultCard title="Next step: Review & Apply" icon={Layers}>
                <div className="space-y-10">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-stone-50 rounded-xl border border-stone-100">
                            <span className="block text-[8px] font-bold uppercase tracking-[.2em] text-stone-400 mb-1">Build Type</span>
                            <span className="text-xs font-semibold text-stone-900">{answers.projectType?.split('(')[0]}</span>
                        </div>
                        <div className="p-4 bg-stone-50 rounded-xl border border-stone-100">
                            <span className="block text-[8px] font-bold uppercase tracking-[.2em] text-stone-400 mb-1">Budget</span>
                            <span className="text-xs font-semibold text-stone-900">{answers.budget}</span>
                        </div>
                    </div>

                    <StandardApplyForm onSubmit={handleApplySubmit} />
                </div>
            </ResultCard>
        );
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-stone-900/40 backdrop-blur-3xl animate-in fade-in duration-500 overflow-y-auto">
            <div className="absolute top-10 right-10 z-[110]">
                <button
                    onClick={onClose}
                    className="p-4 bg-white/10 backdrop-blur-md shadow-xl border border-white/10 rounded-full hover:scale-110 transition-all text-white/60 hover:text-white"
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
