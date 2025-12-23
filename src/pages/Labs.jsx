import React, { useRef, Suspense } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Float, MeshWobbleMaterial } from '@react-three/drei';
import { Code, Box, Cpu, Zap, Sparkles, Layers, MousePointer2, Smartphone, Globe, BoxSelect } from 'lucide-react';

const EtherealSphere = () => {
    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={2}>
            <Sphere args={[1, 100, 100]} scale={2.5}>
                <MeshDistortMaterial
                    color="#6366f1"
                    attach="material"
                    distort={0.4}
                    speed={3}
                    roughness={0}
                    metalness={1}
                />
            </Sphere>
        </Float>
    );
};

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
            <section className="py-32 bg-white text-stone-900 rounded-[4rem] mx-4 md:mx-6 overflow-hidden relative">
                <div className="container mx-auto px-6">
                    <div className="sticky top-0 h-screen flex items-center">
                        <div className="grid md:grid-cols-2 gap-20 items-center w-full">
                            <div className="relative">
                                <div className="flex items-center gap-2 text-indigo-600 font-bold tracking-widest uppercase text-[10px] mb-4">
                                    <Smartphone className="w-3 h-3" />
                                    <span>02 / Origin Story</span>
                                </div>

                                <div className="relative h-[400px]">
                                    {/* Story Step 1: Frustration */}
                                    <motion.div
                                        style={{
                                            opacity: useTransform(scrollYProgress, [0.3, 0.4, 0.45], [0, 1, 0]),
                                            y: useTransform(scrollYProgress, [0.3, 0.4, 0.45], [20, 0, -20])
                                        }}
                                        className="absolute inset-0"
                                    >
                                        <h2 className="text-4xl md:text-7xl font-serif font-bold mb-8 transition-all duration-700">The Friction</h2>
                                        <p className="text-stone-600 font-light text-xl leading-relaxed">
                                            Frustrated by booking platforms that overcharged but under-delivered quality, I felt the weight of inefficient systems holding back true healing work.
                                        </p>
                                    </motion.div>

                                    {/* Story Step 2: Transformation */}
                                    <motion.div
                                        style={{
                                            opacity: useTransform(scrollYProgress, [0.5, 0.6, 0.65], [0, 1, 0]),
                                            y: useTransform(scrollYProgress, [0.5, 0.6, 0.65], [20, 0, -20])
                                        }}
                                        className="absolute inset-0"
                                    >
                                        <h2 className="text-4xl md:text-7xl font-serif font-bold mb-8">The Awakening</h2>
                                        <p className="text-stone-600 font-light text-xl leading-relaxed">
                                            Instead of waiting for a solution, I became one. I dove into the mechanics of product architecture to reclaim the standard of care.
                                        </p>
                                    </motion.div>

                                    {/* Story Step 3: The Hook */}
                                    <motion.div
                                        style={{
                                            opacity: useTransform(scrollYProgress, [0.7, 0.8], [0, 1]),
                                            y: useTransform(scrollYProgress, [0.7, 0.8], [20, 0])
                                        }}
                                        className="absolute inset-0"
                                    >
                                        <h2 className="text-4xl md:text-7xl font-serif font-bold mb-8 transition-all duration-700">The Architect</h2>
                                        <p className="text-indigo-600 font-medium text-xl leading-relaxed">
                                            Now, I am hooked. Building systems is no longer a necessity—it is an art of somatic resonance and digital flow.
                                        </p>
                                    </motion.div>
                                </div>
                            </div>

                            <div className="relative h-[600px] flex items-center justify-center">
                                {/* The Device */}
                                <motion.div
                                    viewport={{ once: false }}
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    whileInView={{ scale: 1, opacity: 1 }}
                                    className="w-72 h-[550px] bg-stone-50 rounded-[3.5rem] border-[12px] border-stone-900 shadow-2xl relative overflow-hidden"
                                >
                                    {/* Device Screen Content - Dynamic based on scroll */}
                                    <div className="p-8 h-full flex flex-col justify-between relative">
                                        {/* Step 1 Content: Chaos */}
                                        <motion.div
                                            style={{ opacity: useTransform(scrollYProgress, [0.3, 0.45], [1, 0]) }}
                                            className="space-y-6"
                                        >
                                            <div className="h-4 w-20 bg-red-100 rounded" />
                                            <div className="h-64 w-full bg-stone-200 rounded-3xl animate-pulse" />
                                            <div className="flex justify-between">
                                                <div className="h-4 w-12 bg-stone-200 rounded" />
                                                <div className="h-4 w-12 bg-red-400 rounded" />
                                            </div>
                                        </motion.div>

                                        {/* Step 2 Content: Architecture */}
                                        <motion.div
                                            style={{
                                                opacity: useTransform(scrollYProgress, [0.45, 0.5, 0.65], [0, 1, 0]),
                                                scale: useTransform(scrollYProgress, [0.45, 0.6], [0.8, 1])
                                            }}
                                            className="absolute inset-0 p-8 flex flex-col justify-center gap-4"
                                        >
                                            <div className="grid grid-cols-2 gap-2">
                                                <div className="h-20 bg-indigo-100 rounded-2xl" />
                                                <div className="h-20 bg-indigo-50 rounded-2xl" />
                                                <div className="h-20 bg-stone-100 rounded-2xl" />
                                                <div className="h-20 bg-indigo-600 rounded-2xl" />
                                            </div>
                                            <div className="h-4 w-full bg-stone-200 rounded" />
                                            <div className="h-4 w-2/3 bg-stone-200 rounded" />
                                        </motion.div>

                                        {/* Step 3 Content: Flow */}
                                        <motion.div
                                            style={{
                                                opacity: useTransform(scrollYProgress, [0.65, 0.75], [0, 1]),
                                                y: useTransform(scrollYProgress, [0.65, 0.85], [100, 0])
                                            }}
                                            className="absolute inset-0 p-8 flex flex-col items-center justify-center text-center"
                                        >
                                            <div className="w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center text-white mb-6 shadow-xl shadow-indigo-600/30">
                                                <Sparkles className="w-10 h-10" />
                                            </div>
                                            <div className="h-2 w-16 bg-indigo-200 rounded mb-4" />
                                            <div className="h-2 w-32 bg-indigo-600 rounded" />
                                        </motion.div>
                                    </div>

                                    {/* Interactive Scroll Bar */}
                                    <motion.div
                                        style={{ height: useTransform(scrollYProgress, [0.3, 0.8], ["0%", "100%"]) }}
                                        className="absolute top-0 right-0 w-1.5 bg-indigo-600"
                                    />
                                </motion.div>

                                {/* Floating Elements */}
                                <motion.div
                                    style={{ y: useTransform(scrollYProgress, [0.4, 0.7], [50, -50]) }}
                                    className="absolute -right-10 top-1/4 w-32 h-32 bg-indigo-50 rounded-full blur-3xl opacity-50"
                                />
                                <motion.div
                                    style={{ y: useTransform(scrollYProgress, [0.5, 0.8], [-50, 50]) }}
                                    className="absolute -left-12 bottom-1/4 w-40 h-40 bg-purple-50 rounded-full blur-3xl opacity-50"
                                />
                            </div>
                        </div>
                    </div>
                    {/* Spacer for scroll height to allow storytelling to breathe */}
                    <div className="h-[300vh]" />
                </div>
            </section>

            {/* 5. WEBGL/3D EXPERIENCE SECTION */}
            <section className="py-48 px-6 container mx-auto overflow-hidden">
                <div className="grid md:grid-cols-2 gap-24 items-center">
                    <div className="order-2 md:order-1 relative h-[500px] w-full bg-indigo-500/5 rounded-[4rem] border border-white/5 overflow-hidden">
                        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                            <ambientLight intensity={1} />
                            <pointLight position={[10, 10, 10]} intensity={1.5} color="#818cf8" />
                            <Suspense fallback={null}>
                                <EtherealSphere />
                                <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
                            </Suspense>
                        </Canvas>
                        {/* 3D Label Overlay */}
                        <div className="absolute bottom-8 left-8 flex items-center gap-3 backdrop-blur-md bg-white/5 border border-white/10 px-4 py-2 rounded-full">
                            <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                            <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-400">Live WebGL Shader</span>
                        </div>
                    </div>

                    <div className="order-1 md:order-2">
                        <div className="flex items-center gap-2 text-indigo-400 font-bold tracking-widest uppercase text-[10px] mb-4">
                            <Globe className="w-3 h-3" />
                            <span>04 / Dimensionality</span>
                        </div>
                        <h2 className="text-5xl md:text-8xl font-serif font-bold mb-8">WebGL / 3D</h2>
                        <p className="text-stone-500 font-light text-xl mb-12 leading-relaxed">
                            Moving beyond the 2D plane. Using Three.js and GLSL shaders to create digital matter that reacts to physical laws and user orbiting.
                        </p>
                        <ul className="space-y-4 text-stone-400 font-light">
                            <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500" /> Real-time geometry distortion</li>
                            <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500" /> Physically based rendering (PBR)</li>
                            <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500" /> Interactive ray-casting</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* 6. ADVANCED MULTI-LAYER PARALLAX */}
            <section className="py-48 relative overflow-hidden h-[120vh] flex items-center justify-center">
                <div className="absolute inset-0 z-0">
                    {/* Layer 1: Background Nebula (Slowest) */}
                    <motion.div
                        style={{ y: useTransform(scrollYProgress, [0.8, 1], [0, -100]) }}
                        className="absolute inset-0 opacity-40 blur-sm"
                    >
                        <img src="/labs/crystalline_depth.png" className="w-full h-full object-cover scale-110" alt="Parallax BG" />
                    </motion.div>

                    {/* Layer 2: Floating Rings (Medium) */}
                    <motion.div
                        style={{ y: useTransform(scrollYProgress, [0.8, 1], [0, -300]), rotate: 120 }}
                        className="absolute top-1/2 left-1/4 w-[600px] h-[600px] border border-indigo-500/20 rounded-full blur-md"
                    />

                    {/* Layer 3: Cosmic Orb (Fastest) */}
                    <motion.div
                        style={{ y: useTransform(scrollYProgress, [0.8, 1], [100, -500]) }}
                        className="absolute top-1/2 right-1/4 w-96 h-96 opacity-60"
                    >
                        <img src="/labs/orbital_flow.png" className="w-full h-full object-contain" alt="Parallax Orb" />
                    </motion.div>
                </div>

                <div className="relative z-10 text-center px-6">
                    <div className="flex items-center justify-center gap-2 text-indigo-400 font-bold tracking-widest uppercase text-[10px] mb-4">
                        <BoxSelect className="w-3 h-3" />
                        <span>05 / Perspective</span>
                    </div>
                    <h2 className="text-6xl md:text-9xl font-serif font-bold mb-8 text-white drop-shadow-2xl">Parallax Depth</h2>
                    <p className="text-stone-300 font-light text-xl max-w-2xl mx-auto backdrop-blur-sm bg-black/10 p-4 rounded-3xl">
                        Simulating stereoscopic depth through multi-layered kinetic motion.
                    </p>
                </div>

                {/* Depth Indicator */}
                <div className="absolute bottom-24 right-12 flex flex-col items-center gap-4 text-white/20">
                    <div className="text-[8px] uppercase tracking-widest vertical-text rotate-180" style={{ writingMode: 'vertical-rl' }}>Depth Field</div>
                    <div className="w-px h-32 bg-gradient-to-t from-transparent via-white/20 to-transparent" />
                </div>
            </section>

            {/* CTA Footer for Labs */}
            <section className="py-32 px-6 border-t border-white/5 text-center">
                <h3 className="text-3xl font-serif font-bold mb-4">Want more depth?</h3>
                <p className="text-stone-500 mb-12 max-w-lg mx-auto">This playground is constantly evolving. I update it with every new system implementation.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                        href="mailto:Hello@lunarosedhealinghub.com?subject=Labs Showcase Inquiry"
                        className="px-8 py-4 bg-indigo-600 text-white rounded-full font-bold hover:bg-indigo-700 transition-all hover:scale-105 active:scale-95"
                    >
                        Request a Showcase
                    </a>
                    <a
                        href="https://github.com/LunaRoseHub143/piyalunarose-studio-site"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-full font-bold hover:bg-white/10 transition-all hover:scale-105 active:scale-95"
                    >
                        View Github
                    </a>
                </div>
            </section>
        </div>
    );
};

export default Labs;
