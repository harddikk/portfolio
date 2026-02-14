"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useTheme } from "@/context/ThemeContext";
import { Envelope, MapPin } from "@phosphor-icons/react";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function Footer() {
    const footerRef = useRef<HTMLElement>(null);
    const dividerRef = useRef<HTMLDivElement>(null);
    const { theme, getHexColor } = useTheme();
    const accentColor = getHexColor(theme);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Footer slide up
            gsap.from(footerRef.current, {
                y: 100,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: footerRef.current,
                    start: "top bottom",
                    end: "bottom bottom",
                    toggleActions: "play none none reverse",
                },
            });

            // Divider animation
            gsap.fromTo(
                dividerRef.current,
                { width: "0%" },
                {
                    width: "100%",
                    duration: 1.5,
                    ease: "power3.inOut",
                    scrollTrigger: {
                        trigger: footerRef.current,
                        start: "top 90%",
                    },
                }
            );

            // Staggered fade in for columns
            gsap.from(".footer-column", {
                y: 30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: footerRef.current,
                    start: "top 85%",
                },
            });
        }, footerRef);

        return () => ctx.revert();
    }, []);

    const handleScrollTo = (id: string) => {
        gsap.to(window, {
            duration: 1.2,
            scrollTo: { y: `#${id}`, offsetY: 80 },
            ease: "power3.inOut",
        });
    };

    const navLinks = [
        { name: "About", id: "about" },
        { name: "Projects", id: "projects" },
        { name: "Testimonials", id: "testimonials" },
        { name: "Gallery", id: "gallery" },
        { name: "Contact", id: "contact" },
    ];

    return (
        <footer
            ref={footerRef}
            className="relative w-full bg-background pt-20 pb-10 overflow-hidden"
        >
            {/* Ambient Glow */}
            <div
                className="absolute inset-0 opacity-20 pointer-events-none animate-pulse-slow"
                style={{
                    background: `radial-gradient(circle at 50% 100%, ${accentColor} 0%, transparent 50%)`,
                }}
            />

            <div className="container mx-auto px-6 md:px-12 relative z-10">
                {/* Section A: Main Content */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 items-start md:items-center">
                    {/* Left Column: Identity */}
                    <div className="footer-column flex flex-col items-center md:items-start text-center md:text-left">
                        <h2
                            className="text-4xl font-bold tracking-tighter mb-2"
                            style={{ color: accentColor }}
                        >
                            HARDIK
                        </h2>
                        <p className="text-gray-400 text-sm font-medium tracking-wide">
                            Developer • Builder • Creator
                        </p>
                    </div>

                    {/* Center Column: Quick Navigation */}
                    <div className="footer-column flex flex-col items-center">
                        <h3 className="text-white font-semibold mb-6 tracking-wide">Quick Links</h3>
                        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 max-w-xs md:max-w-none">
                            {navLinks.map((link) => (
                                <button
                                    key={link.name}
                                    onClick={() => handleScrollTo(link.id)}
                                    className="text-gray-400 hover:text-white transition-all duration-300 text-sm relative group"
                                >
                                    {link.name}
                                    <span
                                        className="absolute -bottom-1 left-0 w-0 h-[1px] bg-current transition-all duration-300 group-hover:w-full"
                                        style={{ boxShadow: `0 0 8px ${accentColor}` }}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Contact Info */}
                    <div className="footer-column flex flex-col items-center md:items-end text-center md:text-right">
                        <h3 className="text-white font-semibold mb-6 tracking-wide">Get In Touch</h3>
                        <a
                            href="mailto:harrdik.tiwari@gmail.com"
                            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300 mb-2 group"
                        >
                            <Envelope size={20} className="group-hover:text-accent" />
                            harrdik.tiwari@gmail.com
                        </a>
                        <div className="flex items-center gap-2 text-gray-500 text-sm">
                            <MapPin size={18} />
                            India
                        </div>
                    </div>
                </div>

                {/* Section B: Divider */}
                <div className="flex justify-center mb-8">
                    <div
                        ref={dividerRef}
                        className="h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    />
                </div>

                {/* Section C: Copyright */}
                <div className="text-center">
                    <p className="text-gray-600 text-xs tracking-wider flex items-center justify-center gap-1 animate-fade-in">
                        © 2026 HARDIK TIWARI. Built with React, GSAP, and questionable amounts of caffeine
                        <span className="text-lg leading-none" style={{ textShadow: `0 0 10px ${accentColor}` }}>
                            ☕
                        </span>
                    </p>
                </div>
            </div>
        </footer>
    );
}
