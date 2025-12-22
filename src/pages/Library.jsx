import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Quote, BookOpen, Clock, Plus, Loader2, Edit3, Trash2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

const Library = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPosts = async () => {
            const { data, error } = await supabase
                .from('library_posts')
                .select('*')
                .order('created_at', { ascending: false });

            if (!error) setPosts(data || []);
            setLoading(false);
        };
        fetchPosts();
    }, []);

    const deletePost = async (id, e) => {
        e.preventDefault();
        if (!window.confirm('Delete this article?')) return;
        const { error } = await supabase.from('library_posts').delete().eq('id', id);
        if (!error) setPosts(posts.filter(p => p.id !== id));
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-stone-50">
            <Loader2 className="w-10 h-10 text-emerald-600 animate-spin" />
        </div>
    );

    return (
        <div className="pt-40 pb-24 px-6 min-h-screen bg-stone-50">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-24 relative">
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

                    {user && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="mt-12"
                        >
                            <Link
                                to="/library/new"
                                className="inline-flex items-center gap-2 px-8 py-3 bg-emerald-600 text-white rounded-full font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20"
                            >
                                <Plus className="w-5 h-5" />
                                New Article
                            </Link>
                        </motion.div>
                    )}
                </div>

                <div className="space-y-12">
                    {posts.length === 0 ? (
                        <div className="text-center py-20 bg-white rounded-[3rem] border border-dashed border-stone-200">
                            <p className="text-stone-400 font-serif italic text-xl">The library is currently being curated...</p>
                        </div>
                    ) : (
                        posts.map((post, i) => (
                            <motion.article
                                key={post.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="group relative bg-white p-12 rounded-[2.5rem] border border-stone-200 hover:border-emerald-500/30 transition-all hover:shadow-2xl hover:shadow-emerald-500/5 shadow-sm"
                            >
                                {user && (
                                    <div className="absolute top-8 right-8 flex gap-3">
                                        <button
                                            onClick={() => navigate(`/library/edit/${post.id}`)}
                                            className="p-2 bg-stone-50 text-stone-400 hover:text-emerald-600 rounded-lg transition-colors border border-stone-100"
                                        >
                                            <Edit3 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={(e) => deletePost(post.id, e)}
                                            className="p-2 bg-stone-50 text-stone-400 hover:text-red-600 rounded-lg transition-colors border border-stone-100"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                )}

                                <div className="flex items-center gap-6 mb-8">
                                    <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase tracking-widest rounded-md">{post.category || 'Wisdom'}</span>
                                    <div className="flex items-center gap-2 text-stone-400 text-xs font-medium">
                                        <Clock className="w-3.5 h-3.5" />
                                        {new Date(post.created_at).toLocaleDateString()}
                                    </div>
                                </div>

                                <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-6 group-hover:text-emerald-700 transition-colors leading-tight">
                                    {post.title}
                                </h2>

                                <p className="text-stone-500 font-light leading-relaxed line-clamp-3 mb-8">
                                    {post.content}
                                </p>

                                <div className="flex justify-between items-center text-stone-400 text-sm font-light pt-8 border-t border-stone-50">
                                    <span className="font-bold tracking-widest uppercase text-[10px]">Read Full Article</span>
                                    <Quote className="w-8 h-8 opacity-10" />
                                </div>
                            </motion.article>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Library;
