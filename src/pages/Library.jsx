import React from 'react';
import { motion } from 'framer-motion';
import { Quote, BookOpen, Clock, Heart } from 'lucide-react';

const Library = () => {
    return (
        <div className="pt-40 pb-24 px-6 min-h-screen bg-stone-50">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 text-[10px] font-bold tracking-[0.3em] uppercase mb-8"
                    >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>LunaRose Library</span>
                    </motion.div>

                    <h1 className="text-5xl md:text-7xl font-serif font-bold text-stone-900 mb-8 tracking-tight">Wisdom & Systems</h1>
                    <p className="text-xl text-stone-500 max-w-2xl mx-auto font-light leading-relaxed">
                        Sharing knowledge about technical architecture, somatic healing, and life wisdom.
                    </p>
                </div>

                <div className="space-y-12">
                    {[
                        { title: "The Architecture of Calm", date: "Dec 20, 2025", category: "Mindset", readTime: "8 min" },
                        { title: "Building Scalable Systems with Empathy", date: "Dec 15, 2025", category: "Technical", readTime: "12 min" },
                        { title: "Eastern Traditions in a Digital Age", date: "Dec 10, 2025", category: "Healing", readTime: "6 min" }
                    ].map((post, i) => (
                        <motion.article
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="group cursor-pointer bg-white p-12 rounded-[2.5rem] border border-stone-200 hover:border-emerald-500/30 transition-all hover:shadow-2xl hover:shadow-emerald-500/5 shadow-sm"
                        >
                            <div className="flex items-center gap-6 mb-8">
                                <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase tracking-widest rounded-md">{post.category}</span>
                                <div className="flex items-center gap-2 text-stone-400 text-xs font-medium">
                                    <Clock className="w-3.5 h-3.5" />
                                    {post.readTime}
                                </div>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-6 group-hover:text-emerald-700 transition-colors leading-tight">{post.title}</h2>
                            <div className="flex justify-between items-center text-stone-400 text-sm font-light">
                                <span>{post.date}</span>
                                <Quote className="w-8 h-8 opacity-10" />
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Library;
