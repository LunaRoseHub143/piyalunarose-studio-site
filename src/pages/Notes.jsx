import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Lock, FileText, Plus, Save, Loader2, Trash2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

const Notes = () => {
    const { user } = useAuth();
    const [notes, setNotes] = useState([]);
    const [activeNote, setActiveNote] = useState(null);
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // Fetch notes
    useEffect(() => {
        const fetchNotes = async () => {
            const { data, error } = await supabase
                .from('private_notes')
                .select('*')
                .order('updated_at', { ascending: false });

            if (!error) {
                setNotes(data || []);
                if (data && data.length > 0) {
                    handleSelectNote(data[0]);
                }
            }
            setLoading(false);
        };
        fetchNotes();
    }, [user]);

    const handleSelectNote = (note) => {
        setActiveNote(note);
        setTitle(note.title);
        setContent(note.content);
    };

    const createNote = async () => {
        const newNote = {
            title: 'New Note',
            content: '',
            user_id: user.id,
            updated_at: new Date()
        };

        const { data, error } = await supabase
            .from('private_notes')
            .insert([newNote])
            .select();

        if (!error && data) {
            setNotes([data[0], ...notes]);
            handleSelectNote(data[0]);
        }
    };

    const saveNote = async () => {
        if (!activeNote) return;
        setSaving(true);

        const { error } = await supabase
            .from('private_notes')
            .update({ title, content, updated_at: new Date() })
            .eq('id', activeNote.id);

        if (!error) {
            setNotes(notes.map(n => n.id === activeNote.id ? { ...n, title, content } : n));
        }
        setSaving(false);
    };

    const deleteNote = async (id) => {
        if (!window.confirm('Delete this note?')) return;
        const { error } = await supabase.from('private_notes').delete().eq('id', id);
        if (!error) {
            const remaining = notes.filter(n => n.id !== id);
            setNotes(remaining);
            if (activeNote?.id === id) {
                if (remaining.length > 0) handleSelectNote(remaining[0]);
                else {
                    setActiveNote(null);
                    setTitle('');
                    setContent('');
                }
            }
        }
    };

    // Auto-save logic
    useEffect(() => {
        if (!activeNote) return;
        const timer = setTimeout(() => {
            if (title !== activeNote.title || content !== activeNote.content) {
                saveNote();
            }
        }, 1500);
        return () => clearTimeout(timer);
    }, [title, content]);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-stone-50">
            <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
        </div>
    );

    return (
        <div className="pt-40 pb-24 px-6 min-h-screen bg-white">
            <div className="max-w-6xl mx-auto bg-stone-50 rounded-[3rem] border border-stone-200 shadow-2xl overflow-hidden flex min-h-[700px]">
                {/* Sidebar */}
                <div className="w-1/3 border-r border-stone-200 flex flex-col hidden md:flex">
                    <div className="p-8 border-b border-stone-100 flex items-center justify-between">
                        <h2 className="text-xl font-serif font-bold text-stone-900">Studying & Learning</h2>
                        <button
                            onClick={createNote}
                            className="p-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all hover:scale-105 active:scale-95"
                        >
                            <Plus className="w-5 h-5" />
                        </button>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-3">
                        {notes.map(note => (
                            <div
                                key={note.id}
                                onClick={() => handleSelectNote(note)}
                                className={`p-5 rounded-2xl cursor-pointer transition-all border ${activeNote?.id === note.id
                                        ? 'bg-white border-indigo-200 shadow-lg ring-1 ring-indigo-500/5'
                                        : 'hover:bg-stone-100 border-transparent'
                                    }`}
                            >
                                <div className="flex justify-between items-start gap-3">
                                    <p className={`font-bold transition-colors truncate ${activeNote?.id === note.id ? 'text-indigo-600' : 'text-stone-700'}`}>
                                        {note.title || 'Untitled'}
                                    </p>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); deleteNote(note.id); }}
                                        className="opacity-0 group-hover:opacity-100 text-stone-300 hover:text-red-500 transition-all"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                                <p className="text-xs text-stone-400 mt-2">
                                    {new Date(note.updated_at).toLocaleDateString()}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Editor Area */}
                <div className="flex-1 p-12 flex flex-col bg-white">
                    <div className="flex items-center justify-between mb-12 border-b border-stone-100 pb-8">
                        <div className="flex items-center gap-3 text-stone-400 italic text-sm">
                            <Lock className="w-4 h-4 text-indigo-500" />
                            <span>Private studying notes</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className={`text-[10px] font-bold uppercase tracking-widest transition-opacity duration-500 ${saving ? 'text-indigo-500 opacity-100' : 'text-stone-300 opacity-0'}`}>
                                Saving...
                            </span>
                            <button
                                onClick={saveNote}
                                className="flex items-center gap-2 px-6 py-2.5 bg-stone-50 border border-stone-200 rounded-full text-[10px] font-bold uppercase tracking-widest text-stone-600 hover:bg-stone-100"
                            >
                                <Save className="w-3.5 h-3.5" />
                                Save Now
                            </button>
                        </div>
                    </div>

                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Note Title..."
                        className="text-4xl font-serif font-bold text-stone-900 focus:outline-none mb-8 placeholder:text-stone-200"
                    />

                    <textarea
                        placeholder="Start typing your wisdom..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="flex-1 bg-transparent text-xl font-light text-stone-700 focus:outline-none resize-none leading-relaxed"
                    />
                </div>
            </div>
        </div>
    );
};

export default Notes;
