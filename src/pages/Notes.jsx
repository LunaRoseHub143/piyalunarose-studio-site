import React from 'react';
import { motion } from 'framer-motion';
import { Lock, FileText, Plus, Save } from 'lucide-react';

const Notes = () => {
    // This will later be protected by Supabase Auth
    return (
        <div className="pt-40 pb-24 px-6 min-h-screen bg-white">
            <div className="max-w-6xl mx-auto bg-stone-50 rounded-[3rem] border border-stone-200 shadow-2xl overflow-hidden flex min-h-[600px]">
                {/* Sidebar */}
                <div className="w-1/3 border-r border-stone-200 p-8 hidden md:block">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-xl font-serif font-bold text-stone-900">My Notes</h2>
                        <button className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                            <Plus className="w-5 h-5" />
                        </button>
                    </div>
                    <div className="space-y-4">
                        <div className="p-4 bg-white rounded-xl border-l-4 border-indigo-600 shadow-sm">
                            <p className="font-bold text-stone-900 truncate">System Mapping Plan</p>
                            <p className="text-sm text-stone-400 mt-1">Today, 10:45 AM</p>
                        </div>
                        <div className="p-4 hover:bg-stone-100 rounded-xl transition-colors cursor-pointer">
                            <p className="font-medium text-stone-600 truncate">Meditation Techniques</p>
                            <p className="text-sm text-stone-400 mt-1">Yesterday</p>
                        </div>
                    </div>
                </div>

                {/* Editor Area */}
                <div className="flex-1 p-12 flex flex-col">
                    <div className="flex items-center justify-between mb-12 border-b border-stone-100 pb-8">
                        <div className="flex items-center gap-3 text-stone-400 italic">
                            <Lock className="w-5 h-5 text-indigo-500" />
                            <span>Private Access Only</span>
                        </div>
                        <button className="flex items-center gap-2 px-6 py-2 bg-white border border-stone-200 rounded-full text-xs font-bold uppercase tracking-widest text-stone-600 hover:bg-stone-50">
                            <Save className="w-4 h-4 text-indigo-400" />
                            Auto-saved
                        </button>
                    </div>

                    <textarea
                        placeholder="Start typing your wisdom..."
                        className="flex-1 bg-transparent text-2xl font-light text-stone-800 focus:outline-none resize-none leading-relaxed"
                        defaultValue="Architecture for the new portal requires a rethink of the landing page flow. Focused on somatic cues and reduced cognitive load."
                    />
                </div>
            </div>
        </div>
    );
};

export default Notes;
