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
                staggerChildren: 0.04,
                delayChildren: 0.6,
            },
        },
    };

    const letterVariants = {
        initial: { opacity: 0, y: 10, filter: "blur(4px)" },
        animate: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: {
                duration: 1.2,
                ease: [0.22, 1, 0.36, 1]
            },
        },
    };

    const energeticMotion = {
        animate: (i) => ({
            y: shouldReduceMotion ? 0 : [0, -8, 0],
            rotate: shouldReduceMotion ? 0 : [-1.5, 1.5, -1.5],
            transition: {
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.12,
            },
        }),
    };

    const pulseGlow = {
        animate: {
            opacity: [0.6, 1, 0.6],
            filter: ["blur(4px)", "blur(6px)", "blur(4px)"],
            transition: {
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
            }
        }
    };

    return (
        <motion.span
            className={`relative inline-block cursor-default select-none ${className}`}
            variants={containerVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
        >
            {/* Pulsing Luminous Shimmer Effect */}
            <motion.span
                variants={pulseGlow}
                animate="animate"
                className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-500/40 via-violet-500/30 to-transparent bg-[length:200%_100%] animate-shimmer pointer-events-none opacity-80 rounded-xl"
            />

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
                            variants={energeticMotion}
                            animate="animate"
                            className="inline-block"
                            style={{
                                // Intense, vibrant text glow
                                textShadow: "0 0 12px rgba(99, 102, 241, 0.6), 0 0 25px rgba(139, 92, 246, 0.3)",
                                color: "rgba(165, 180, 252, 0.95)" // Slightly brighter base color
                            }}
                        >
                            {char}
                        </motion.span>
                    </motion.span>
                ))}
            </span>

            {/* Energetic Hover Underline */}
            <motion.span
                className="absolute -bottom-2 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent"
                variants={{
                    initial: { scaleX: 0, opacity: 0 },
                    hover: { scaleX: 1, opacity: 1, filter: "blur(2px)" }
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            />
        </motion.span>
    );
};

export default KineticPhrase;
