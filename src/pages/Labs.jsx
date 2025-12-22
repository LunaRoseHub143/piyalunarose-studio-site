import React from 'react';
import { motion } from 'framer-motion';
import { Code, Box, Cpu, Zap } from 'lucide-react';

const Labs = () => {
    return (
        <div className="pt-40 pb-24 px-6 min-h-screen bg-[#f8fafc]">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-[10px] font-bold tracking-[0.3em] uppercase mb-8"
                    >
                        <Cpu className="w-3.5 h-3.5" />
                        <span>LunaRose Labs</span>
                    </motion.div>

                    <h1 className="text-5xl md:text-7xl font-serif font-bold text-stone-900 mb-8 tracking-tight">Experimentation & Showcase</h1>
                    <p className="text-xl text-stone-500 max-w-2xl mx-auto font-light leading-relaxed">
                        Where I play around with UI/UX, frontend techniques, and system-level thinking to push the boundaries of interaction.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                        { title: "Kinetic Typography", desc: "Dynamic motion systems for web headlines.", icon: Zap },
                        { title: "Decision Gates", desc: "Complex conditional routing for user onboarding.", icon: Box },
                        { title: "Somatic UI", desc: "Interfaces that respond to human rhythm.", icon: Code }
                    ].map((lab, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white p-10 rounded-[2.5rem] border border-stone-200 hover:border-indigo-500/30 transition-all hover:shadow-xl hover:shadow-indigo-500/5 group"
                        >
                            <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                                <lab.icon className="w-6 h-6" />
                            </div>
                            <h3 className="text-2xl font-serif font-bold text-stone-900 mb-4">{lab.title}</h3>
                            <p className="text-stone-500 font-light leading-relaxed">{lab.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Labs;
