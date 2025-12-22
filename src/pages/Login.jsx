import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Mail, ArrowRight, AlertCircle, Loader2, CheckCircle2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { user } = useAuth();

    // If already logged in, go back to home or notes
    if (user) {
        navigate('/notes');
    }

    const handleAuth = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setMessage(null);

        if (isSignUp) {
            const { error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    emailRedirectTo: window.location.origin,
                },
            });
            if (error) setError(error.message);
            else setMessage('Success! Please check your email for a confirmation link.');
            setLoading(false);
        } else {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                setError(error.message);
                setLoading(false);
            } else {
                navigate('/notes');
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-stone-50 px-6 py-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full bg-white rounded-[2.5rem] border border-stone-200 shadow-2xl p-10 md:p-14"
            >
                <div className="text-center mb-10">
                    <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <Lock className="w-8 h-8 text-indigo-600" />
                    </div>
                    <h1 className="text-3xl font-serif font-bold text-stone-900 mb-3 tracking-tight">
                        {isSignUp ? 'Create Admin Account' : 'Studio Access'}
                    </h1>
                    <p className="text-stone-500 font-light">
                        {isSignUp ? 'Set your password to manage the ecosystem.' : 'Enter your credentials to manage the ecosystem.'}
                    </p>
                </div>

                {error && (
                    <div className="mb-8 p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-600 text-sm">
                        <AlertCircle className="w-5 h-5 shrink-0" />
                        <p>{error}</p>
                    </div>
                )}

                {message && (
                    <div className="mb-8 p-4 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center gap-3 text-emerald-600 text-sm">
                        <CheckCircle2 className="w-5 h-5 shrink-0" />
                        <p>{message}</p>
                    </div>
                )}

                <form onSubmit={handleAuth} className="space-y-6">
                    <div>
                        <label className="block text-[10px] font-bold tracking-[0.2em] uppercase text-stone-400 mb-2 ml-1">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-300" />
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="hello@lunarosedhealinghub.com"
                                className="w-full pl-12 pr-4 py-4 bg-stone-50 border border-stone-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-stone-900"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-[10px] font-bold tracking-[0.2em] uppercase text-stone-400 mb-2 ml-1">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-300" />
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full pl-12 pr-4 py-4 bg-stone-50 border border-stone-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-stone-900"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-5 bg-stone-900 text-white font-bold rounded-2xl shadow-xl shadow-stone-900/10 hover:bg-stone-800 transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3 group"
                    >
                        {loading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <>
                                {isSignUp ? 'Create Account' : 'Sign In'}
                                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <button
                        onClick={() => {
                            setIsSignUp(!isSignUp);
                            setError(null);
                            setMessage(null);
                        }}
                        className="text-stone-400 hover:text-indigo-600 transition-colors text-xs font-medium"
                    >
                        {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Create one"}
                    </button>
                </div>

                <div className="mt-10 pt-10 border-t border-stone-100 text-center">
                    <p className="text-stone-400 text-xs font-light">Piya LunaRose Studio • Private Admin Portal</p>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
