import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Code, Box, Cpu, Zap, Sparkles, Layers, MousePointer2, Smartphone } from 'lucide-react';

const Labs = () => {
    const scrollRef = useRef(null);
    const { scrollYProgress } = useScroll();

    // Parallax transforms
    const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, -500]);
    const rotate = useTransform(scrollYProgress, [0, 1], [0, 45]);
    const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

    return (
        <div className="bg-[#0a0a0b] text-white overflow-x-hidden">
            {/* 1. PARALLAX HERO SECTION */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                <motion.div
                    style={{ y: y1 }}
                    className="absolute inset-0 z-0 opacity-30"
                >
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px]" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px]" />
                </motion.div>

                <motion.div
                    style={{ y: y2, rotate }}
                    className="absolute inset-0 z-0 pointer-events-none"
                >
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/5 rounded-full" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/10 rounded-full" />
                </motion.div>

                <div className="relative z-10 text-center px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-indigo-400 text-[10px] font-bold tracking-[0.3em] uppercase mb-8 backdrop-blur-md"
                    >
                        <Cpu className="w-3.5 h-3.5" />
                        <span>LunaRose Labs 2.0</span>
                    </motion.div>

                    <motion.h1
                        style={{ opacity }}
                        className="text-6xl md:text-9xl font-serif font-bold tracking-tighter mb-8"
                    >
                        The <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Showcase</span>
                    </motion.h1>
                    <p className="text-stone-400 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
                        Experimenting at the intersection of aesthetic depth, kinetic energy, and somatic resonance.
                    </p>
                </div>

                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 italic text-stone-500 text-xs">
                    <span>Scroll to explore</span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-px h-12 bg-gradient-to-b from-indigo-500 to-transparent"
                    />
                </div>
            </section>

            {/* 2. GLASSMORPHISM SECTION */}
            <section className="py-32 px-6 container mx-auto">
                <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-2 text-indigo-400 font-bold tracking-widest uppercase text-[10px] mb-4">
                            <Layers className="w-3 h-3" />
                            <span>01 / Technique</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6">Glassmorphism</h2>
                        <p className="text-stone-400 font-light text-lg">Layered transparency with multi-specular lighting effects to create depth in a flat digital space.</p>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        {
                            title: "Crystalline Depth",
                            img: "/labs/crystalline_depth.png",
                            desc: "Refracting light through high-density frosted layers."
                        },
                        {
                            title: "Orbital Flow",
                            img: "/labs/orbital_flow.png",
                            desc: "Dynamic translucency with liquid motion gradients."
                        },
                        {
                            title: "Solar Geometry",
                            img: "/labs/solar_geometry.png",
                            desc: "Intersecting planes of light within a glass framework."
                        }
                    ].map((card, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -10 }}
                            className="relative group h-[500px] rounded-[2.5rem] overflow-hidden border border-white/10 bg-stone-900 flex flex-col justify-end"
                        >
                            {/* Background Image with Glass Overlay */}
                            <div className="absolute inset-0 z-0">
                                <img src={card.img} alt={card.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
                                <div className="absolute inset-0 backdrop-blur-[20px] group-hover:backdrop-blur-[5px] transition-all duration-700" />
                            </div>

                            <div className="relative z-10 p-10">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl group-hover:bg-white/10 transition-all" />

                                <h3 className="text-2xl font-serif font-bold mb-4">{card.title}</h3>
                                <p className="text-stone-300 text-sm leading-relaxed mb-6 font-light">
                                    {card.desc}
                                </p>
                                <div className="flex gap-2">
                                    <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[8px] uppercase font-bold tracking-wider">Raytracing</div>
                                    <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[8px] uppercase font-bold tracking-wider">Refraction</div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* 3. SCROLLYTELLING SECTION */}
            <section className="py-32 bg-white text-stone-900 rounded-[4rem] mx-4 md:mx-6 overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="sticky top-40 h-screen flex items-center">
                        <div className="grid md:grid-cols-2 gap-20 items-center">
                            <div>
                                <div className="flex items-center gap-2 text-indigo-600 font-bold tracking-widest uppercase text-[10px] mb-4">
                                    <Smartphone className="w-3 h-3" />
                                    <span>02 / Narrative</span>
                                </div>
                                <h2 className="text-4xl md:text-7xl font-serif font-bold mb-8 transition-all duration-700">Scrollytelling</h2>
                                <p className="text-stone-600 font-light text-xl leading-relaxed">The art of passive interaction. Content unfolds as a dialogue between the user and the interface.</p>
                            </div>
                            <div className="relative h-[600px] flex items-center justify-center">
                                <motion.div
                                    viewport={{ once: false }}
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    whileInView={{ scale: 1, opacity: 1 }}
                                    className="w-64 h-[500px] bg-stone-100 rounded-[3rem] border-8 border-white shadow-2xl relative overflow-hidden"
                                >
                                    <motion.div
                                        style={{ height: useTransform(scrollYProgress, [0.4, 0.7], ["0%", "100%"]) }}
                                        className="absolute top-0 left-0 right-0 bg-indigo-600/10 flex items-center justify-center overflow-hidden"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-indigo-600 animate-pulse" />
                                    </motion.div>
                                    <div className="p-8 space-y-4">
                                        <div className="h-2 w-20 bg-stone-200 rounded" />
                                        <div className="h-2 w-32 bg-stone-200 rounded" />
                                        <div className="h-32 w-full bg-stone-200 rounded-2xl" />
                                        <div className="space-y-2">
                                            <div className="h-2 w-full bg-stone-100 rounded" />
                                            <div className="h-2 w-full bg-stone-100 rounded" />
                                            <div className="h-2 w-2/3 bg-stone-100 rounded" />
                                        </div>
                                    </div>
                                </motion.div>
                                <motion.div
                                    style={{ y: useTransform(scrollYProgress, [0.4, 0.7], [50, -50]) }}
                                    className="absolute -right-10 top-1/4 w-32 h-32 bg-indigo-100 rounded-3xl -rotate-12 blur-sm scale-150"
                                />
                            </div>
                        </div>
                    </div>
                    {/* Spacer for scroll height */}
                    <div className="h-[200vh]" />
                </div>
            </section>

            {/* 4. MICRO-INTERACTIONS SECTION */}
            <section className="py-48 px-6 container mx-auto text-center">
                <div className="flex flex-col items-center mb-24">
                    <div className="flex items-center gap-2 text-indigo-400 font-bold tracking-widest uppercase text-[10px] mb-4 text-center">
                        <MousePointer2 className="w-3 h-3" />
                        <span>03 / Interaction</span>
                    </div>
                    <h2 className="text-5xl md:text-8xl font-serif font-bold mb-8">Micro-interactions</h2>
                    <p className="text-stone-500 font-light text-xl max-w-2xl mx-auto">Tactile feedback and physics-based motion that make the interface feel "alive" under your cursor.</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <motion.button
                        whileHover={{ scale: 1.05, border: '1px solid rgba(129, 140, 248, 0.5)' }}
                        whileTap={{ scale: 0.95 }}
                        className="p-12 rounded-[2rem] bg-white/5 border border-white/5 flex flex-col items-center gap-6"
                    >
                        <div className="w-12 h-12 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                            <Zap className="w-6 h-6" />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest">Elastic Hover</span>
                    </motion.button>

                    <motion.div
                        className="p-12 rounded-[2rem] bg-white/5 border border-white/5 flex flex-col items-center gap-6 cursor-pointer"
                        drag
                        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                    >
                        <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400">
                            <Box className="w-6 h-6" />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest">Physics Drag</span>
                    </motion.div>

                    <motion.div
                        className="p-12 rounded-[2rem] bg-white/5 border border-white/5 flex flex-col items-center gap-6 cursor-help group"
                    >
                        <motion.div
                            animate={{ rotate: [0, 90, 0] }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400"
                        >
                            <Cpu className="w-6 h-6" />
                        </motion.div>
                        <span className="text-[10px] font-bold uppercase tracking-widest">Continuous</span>
                    </motion.div>

                    <motion.div
                        className="p-12 rounded-[2rem] bg-white/5 border border-white/5 flex flex-col items-center gap-6 cursor-wait"
                        whileHover={{ borderRadius: "4rem" }}
                    >
                        <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-400">
                            <Sparkles className="w-6 h-6" />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest">Shape Shift</span>
                    </motion.div>
                </div>
            </section>

            {/* CTA Footer for Labs */}
            <section className="py-32 px-6 border-t border-white/5 text-center">
                <h3 className="text-3xl font-serif font-bold mb-4">Want more depth?</h3>
                <p className="text-stone-500 mb-12 max-w-lg mx-auto">This playground is constantly evolving. I update it with every new system implementation.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="px-8 py-4 bg-indigo-600 text-white rounded-full font-bold hover:bg-indigo-700 transition-all">Request a Showcase</button>
                    <button className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-full font-bold hover:bg-white/10 transition-all">View Github</button>
                </div>
            </section>
        </div>
    );
};

export default Labs;
