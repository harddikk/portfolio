"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useTheme } from "@/context/ThemeContext";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function Navbar() {
    const { theme, getHexColor } = useTheme();
    const navRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const ctx = gsap.context(() => {
            ScrollTrigger.create({
                trigger: "#hero-section",
                start: "bottom top+=80", // Trigger after hero leaves (adjusted for 80px)
                onLeave: () => {
                    setIsVisible(true);
                    gsap.to(navRef.current, {
                        y: 0,
                        opacity: 1,
                        duration: 0.6,
                        ease: "power3.out"
                    });
                },
                onEnterBack: () => {
                    setIsVisible(false);
                    gsap.to(navRef.current, {
                        y: -100,
                        opacity: 0,
                        duration: 0.5,
                        ease: "power3.in"
                    });
                },
            });
        });

        return () => ctx.revert();
    }, []);

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const targetId = href.replace("#", "");
        const target = document.getElementById(targetId);

        if (target) {
            gsap.to(window, {
                scrollTo: { y: target, offsetY: 80 }, // Adjusted offset for 80px height
                duration: 0.9,
                ease: "power3.inOut",
            });
        }
    };

    const navLinks = [
        { name: "About", href: "#about", sectionTheme: "cyan-400" },
        { name: "Works", href: "#projects", sectionTheme: "cyan-400" },
        { name: "Gallery", href: "#gallery", sectionTheme: "emerald-400" },
        { name: "Connect", href: "#contact", sectionTheme: "orange-500" },
    ];

    const currentColor = getHexColor(theme);

    return (
        <nav
            ref={navRef}
            className="fixed top-0 left-0 right-0 z-50 h-[80px] flex items-center px-8 md:px-16 bg-black/50 backdrop-blur-md transition-all duration-700 ease-out"
            style={{
                transform: "translateY(-100%)",
                opacity: 0,
                boxShadow: "inset 0 1px 0 0 rgba(255,255,255,0.05)"
            }}
        >
            <div className="w-full max-w-[1400px] mx-auto flex items-center justify-between">
                {/* Logo */}
                <Link
                    href="#hero-section"
                    onClick={(e) => handleScroll(e, "#hero-section")}
                    className="text-2xl font-bold tracking-tighter transition-colors duration-700 ease-out hover:opacity-80"
                    style={{ color: currentColor }}
                >
                    HARDIK
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-12">
                    {navLinks.map((link) => {
                        const isActive = theme === link.sectionTheme;
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={(e) => handleScroll(e, link.href)}
                                className="text-base font-medium tracking-wide transition-all duration-500 relative group"
                                style={{
                                    color: isActive ? currentColor : "rgba(255,255,255,0.6)",
                                    textShadow: isActive ? `0 0 15px ${currentColor}40` : "none"
                                }}
                            >
                                <span className="relative z-10 group-hover:-translate-y-0.5 transition-transform duration-300 block">
                                    {link.name}
                                </span>

                                {/* Hover Glow */}
                                <span
                                    className="absolute inset-0 blur-md opacity-0 group-hover:opacity-40 transition-opacity duration-300"
                                    style={{ color: isActive ? currentColor : "white" }}
                                >
                                    {link.name}
                                </span>

                                {/* Active Indicator */}
                                <span
                                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-[1px] transition-all duration-500 group-hover:w-full opacity-0 group-hover:opacity-100"
                                    style={{ backgroundColor: isActive ? currentColor : "rgba(255,255,255,0.5)" }}
                                />
                            </Link>
                        );
                    })}
                </div>

                {/* Mobile Menu Button (Placeholder) */}
                <button
                    className="md:hidden transition-colors duration-300 hover:text-white"
                    style={{ color: "rgba(255,255,255,0.6)" }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </button>
            </div>
        </nav>
    );
}
