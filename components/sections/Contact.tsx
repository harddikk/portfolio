"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Section from "@/components/ui/Section";
import { useTheme } from "@/context/ThemeContext";

export default function Contact() {
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const orbRef = useRef<HTMLDivElement>(null);
    const { setTheme, getHexColor } = useTheme();
    const themeColor = "#FF6B35"; // Vibrant Orange

    // Set Theme
    useEffect(() => {
        const ctx = gsap.context(() => {
            ScrollTrigger.create({
                trigger: containerRef.current,
                start: "top 30%", // Changed from "top center" to trigger later
                end: "bottom center",
                onEnter: () => setTheme("orange-500"),
                onEnterBack: () => setTheme("orange-500"),
            });
        }, containerRef);
        return () => ctx.revert();
    }, [setTheme]);

    // Animations
    useEffect(() => {
        const ctx = gsap.context(() => {
            // Orb Floating Animation (keep for background effect)
            gsap.to(orbRef.current, {
                y: -30,
                duration: 4,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const socialLinks = [
        { name: "X", url: "https://x.com/techforlifehel", icon: "M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" },
        { name: "GitHub", url: "https://github.com/harddikk/", icon: "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" },
        { name: "LinkedIn", url: "https://www.linkedin.com/in/harrdik-tiwari/", icon: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M2 4a2 2 0 1 1 2 2 2 2 0 0 1-2-2z" },
    ];

    return (
        <Section id="contact" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
            {/* Atmospheric Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#1a0b2e_0%,#000000_100%)]" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />

                {/* Starfield */}
                <div className="absolute inset-0" style={{ background: 'radial-gradient(white 1px, transparent 0)', backgroundSize: '40px 40px', opacity: 0.1 }} />

                {/* Floating Orb */}
                <div
                    ref={orbRef}
                    className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-[120px] opacity-20 mix-blend-screen pointer-events-none"
                    style={{ backgroundColor: themeColor }}
                />
            </div>

            <div ref={containerRef} className="relative z-10 w-full max-w-4xl px-6 text-center">
                <div ref={contentRef} className="space-y-12">

                    {/* Heading Group */}
                    <div className="space-y-6">
                        <h2 className="text-6xl md:text-8xl font-bold tracking-tighter text-white">
                            Let's <span className="relative inline-block">
                                <span style={{ color: themeColor }}>Connect</span>
                                {/* Animated Underline */}
                                <span className="absolute -bottom-2 left-0 w-full h-[4px] rounded-full overflow-hidden">
                                    <span className="absolute inset-0 animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white to-transparent opacity-50" />
                                </span>
                            </span>
                        </h2>
                        <p className="anim-text text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
                            Friendly but professional. I'm always open to discussing new opportunities,
                            partnerships, and creative collaborations.
                        </p>
                    </div>

                    {/* CTA Button */}
                    <div className="anim-button pt-8">
                        <a
                            href="mailto:harrdik.tiwari@gmail.com"
                            className="group relative inline-flex items-center justify-center px-12 py-6 text-lg font-bold text-white transition-all duration-300 bg-white/5 border border-white/10 rounded-full hover:scale-105 hover:bg-white/10 active:scale-95"
                            style={{ boxShadow: `0 0 0 0 ${themeColor}00` }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.boxShadow = `0 0 30px ${themeColor}40`;
                                e.currentTarget.style.borderColor = themeColor;
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.boxShadow = `0 0 0 0 ${themeColor}00`;
                                e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                            }}
                        >
                            <span className="relative z-10 flex items-center gap-3">
                                Send me an email
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 group-hover:translate-x-1 transition-transform">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                </svg>
                            </span>

                            {/* Pulse Border */}
                            <span className="absolute inset-0 rounded-full animate-ping opacity-0 group-hover:opacity-20 transition-opacity duration-300" style={{ borderColor: themeColor, border: '1px solid' }} />
                        </a>
                    </div>

                    {/* Social Icons */}
                    <div className="anim-text flex justify-center gap-8 pt-12">
                        {socialLinks.map((social) => (
                            <a
                                key={social.name}
                                href={social.url}
                                className="group relative p-4 rounded-full bg-white/5 border border-white/10 transition-all duration-300 hover:-translate-y-2 hover:bg-white/10"
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.borderColor = themeColor;
                                    e.currentTarget.style.boxShadow = `0 0 20px ${themeColor}30`;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                                    e.currentTarget.style.boxShadow = "none";
                                }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors duration-300"
                                >
                                    <path d={social.icon} />
                                </svg>
                            </a>
                        ))}
                    </div>

                    {/* Footer Note */}
                    <div className="anim-text pt-20 text-sm text-gray-600 uppercase tracking-widest">
                        © 2026 Hardik. All rights reserved.
                    </div>

                </div>
            </div>
        </Section>
    );
}
