import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Save, ArrowLeft, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

const LibraryEditor = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('Mindset');
    const [saving, setSaving] = useState(false);
    const [loading, setLoading] = useState(!!id);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (id) {
            const fetchPost = async () => {
                const { data, error } = await supabase
                    .from('library_posts')
                    .select('*')
                    .eq('id', id)
                    .single();

                if (error) setError(error.message);
                else {
                    setTitle(data.title);
                    setContent(data.content);
                    setCategory(data.category);
                }
                setLoading(false);
            };
            fetchPost();
        }
    }, [id]);

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError(null);

        const postData = {
            title,
            content,
            category,
            author_id: user.id,
            updated_at: new Date().toISOString()
        };

        let result;
        if (id) {
            result = await supabase.from('library_posts').update(postData).eq('id', id);
        } else {
            result = await supabase.from('library_posts').insert([postData]);
        }

        if (result.error) {
            setError(result.error.message);
        } else {
            navigate('/library');
        }
        setSaving(false);
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-stone-50">
            <Loader2 className="w-10 h-10 text-emerald-600 animate-spin" />
        </div>
    );

    return (
        <div className="pt-40 pb-24 px-6 min-h-screen bg-stone-50">
            <div className="max-w-4xl mx-auto">
                <button
                    onClick={() => navigate('/library')}
                    className="flex items-center gap-2 text-stone-400 hover:text-stone-900 transition-colors mb-12 group"
                >
                    <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                    <span>Back to Library</span>
                </button>

                <form onSubmit={handleSave} className="bg-white rounded-[3rem] border border-stone-200 shadow-2xl p-10 md:p-16">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
                        <h1 className="text-4xl font-serif font-bold text-stone-900">
                            {id ? 'Edit Article' : 'New Article'}
                        </h1>
                        <div className="flex items-center gap-4">
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="bg-stone-50 border border-stone-200 rounded-xl px-4 py-2 text-sm font-bold text-stone-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                            >
                                {['Mindset', 'Technical', 'Healing', 'Life'].map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                            <button
                                type="submit"
                                disabled={saving}
                                className="flex items-center gap-2 px-8 py-3 bg-emerald-600 text-white rounded-full font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20"
                            >
                                {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                                Save Article
                            </button>
                        </div>
                    </div>

                    {error && (
                        <div className="mb-8 p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-600">
                            <AlertCircle className="w-5 h-5" />
                            <p>{error}</p>
                        </div>
                    )}

                    <input
                        type="text"
                        placeholder="Article Title..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full text-5xl font-serif font-bold text-stone-900 placeholder:text-stone-200 focus:outline-none mb-10 border-b border-stone-100 pb-6"
                        required
                    />

                    <textarea
                        placeholder="Share your wisdom..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full min-h-[500px] text-xl font-light text-stone-700 focus:outline-none resize-none leading-relaxed"
                        required
                    />
                </form>
            </div>
        </div>
    );
};

export default LibraryEditor;
