import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const KineticPhrase = ({ text, className = "" }) => {
    const shouldReduceMotion = useReducedMotion();

    // Split text into individual characters
    const characters = Array.from(text);

    const containerVariants = {
        initial: { opacity: 0 },
        animate: {
            opacity: 1,
            transition: {
                staggerChildren: 0.03,
                delayChildren: 0.5,
            },
        },
    };

    const letterVariants = {
        initial: { opacity: 0, y: 5 },
        animate: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.21, 0.47, 0.32, 0.98]
            },
        },
    };

    const floatingVariants = {
        animate: (i) => ({
            y: shouldReduceMotion ? 0 : [0, -3, 0],
            transition: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.1,
            },
        }),
    };

    return (
        <motion.span
            className={`relative inline-block cursor-default select-none ${className}`}
            variants={containerVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
        >
            {/* Luminous Shimmer Effect (Animated Gradient) */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-400/20 to-transparent bg-[length:200%_100%] animate-shimmer pointer-events-none blur-sm opacity-60 rounded-full" />

            <span className="relative flex whitespace-pre">
                {characters.map((char, i) => (
                    <motion.span
                        key={i}
                        variants={letterVariants}
                        className="inline-block relative"
                        style={{ display: char === " " ? "inline" : "inline-block" }}
                    >
                        <motion.span
                            custom={i}
                            variants={floatingVariants}
                            animate="animate"
                            className="inline-block"
                            style={{
                                // Subtle text glow
                                textShadow: "0 0 15px rgba(129, 140, 248, 0.3)",
                            }}
                        >
                            {char}
                        </motion.span>
                    </motion.span>
                ))}
            </span>

            {/* Hover state highlights */}
            <motion.span
                className="absolute -bottom-1 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-600/40 to-transparent"
                variants={{
                    initial: { scaleX: 0, opacity: 0 },
                    hover: { scaleX: 1, opacity: 1 }
                }}
                transition={{ duration: 0.6 }}
            />
        </motion.span>
    );
};

export default KineticPhrase;
