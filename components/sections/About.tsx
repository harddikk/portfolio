"use client";

import { useRef, useLayoutEffect, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Section from "@/components/ui/Section";
import { useTheme } from "@/context/ThemeContext";

export default function About() {
    const containerRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const signatureRef = useRef<HTMLDivElement>(null);
    const techHeaderRef = useRef<HTMLHeadingElement>(null);
    const techGridRef = useRef<HTMLDivElement>(null);

    const { setTheme, getHexColor } = useTheme();
    const themeColor = getHexColor("cyan-400");

    // Set Theme
    useEffect(() => {
        const ctx = gsap.context(() => {
            ScrollTrigger.create({
                trigger: containerRef.current,
                start: "top center",
                end: "bottom center",
                onEnter: () => setTheme("cyan-400"),
                onEnterBack: () => setTheme("cyan-400"),
            });
        }, containerRef);
        return () => ctx.revert();
    }, [setTheme]);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const scrollConfig = {
                toggleActions: "play reverse play reverse",
                start: "top 70%",
                end: "bottom 20%",
            };

            // Left Column: Card Entrance (From Left)
            gsap.fromTo(
                cardRef.current,
                { x: -100, opacity: 0, rotationY: -15 },
                {
                    x: 0,
                    opacity: 1,
                    rotationY: 0,
                    duration: 1.5,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        ...scrollConfig,
                    },
                }
            );

            // Right Column: Content Entrance (From Right)
            gsap.fromTo(
                contentRef.current,
                { x: 100, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 1.5,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        ...scrollConfig,
                    },
                }
            );

            // Signature Animation
            gsap.fromTo(
                signatureRef.current,
                { scaleX: 0, opacity: 0 },
                {
                    scaleX: 1,
                    opacity: 1,
                    duration: 1.2,
                    delay: 0.5,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        ...scrollConfig,
                    },
                }
            );

            // Tech Panel Stagger
            if (techGridRef.current) {
                gsap.fromTo(
                    techGridRef.current.children,
                    { opacity: 0, y: 20 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        stagger: 0.1,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: techGridRef.current,
                            start: "top 90%",
                            toggleActions: "play reverse play reverse",
                        },
                    }
                );
            }
        }, containerRef);

        return () => ctx.revert();
    }, []);

    // Holographic Card Effect
    const handleCardMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;

        gsap.to(card, {
            rotationX: rotateX,
            rotationY: rotateY,
            transformPerspective: 1000,
            ease: "power1.out",
            duration: 0.5,
        });

        // Update CSS variables for lighting
        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
    };

    const handleCardLeave = (e: React.MouseEvent<HTMLDivElement>) => {
        gsap.to(e.currentTarget, {
            rotationX: 0,
            rotationY: 0,
            ease: "power2.out",
            duration: 0.8,
        });
    };

    // Tech Item Hover
    const handleTechMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const item = e.currentTarget;
        const rect = item.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -15;
        const rotateY = ((x - centerX) / centerX) * 15;

        gsap.to(item, {
            rotationX: rotateX,
            rotationY: rotateY,
            scale: 1.05,
            transformPerspective: 500,
            duration: 0.3,
            ease: "power2.out",
        });
    };

    const handleTechLeave = (e: React.MouseEvent<HTMLDivElement>) => {
        gsap.to(e.currentTarget, {
            rotationX: 0,
            rotationY: 0,
            scale: 1,
            duration: 0.5,
            ease: "elastic.out(1, 0.5)",
        });
    };

    return (
        <Section id="about" className="bg-background relative min-h-screen flex items-center justify-center overflow-hidden py-24">
            {/* Ambient Grid Background */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000_90%)]" />
                {/* Theme Glow */}
                <div
                    className="absolute top-1/2 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px] opacity-10 transition-colors duration-700"
                    style={{ backgroundColor: themeColor }}
                />
            </div>

            <div ref={containerRef} className="relative z-10 flex flex-col md:flex-row items-center gap-12 md:gap-20 w-full px-4 md:px-8">

                {/* Left Column: Holographic 3D Card */}
                <div className="w-full md:w-[45%] flex justify-center perspective-1000">
                    <div
                        ref={cardRef}
                        onMouseMove={handleCardMove}
                        onMouseLeave={handleCardLeave}
                        className="relative w-full max-w-[400px] aspect-[3/4] rounded-2xl border bg-black/40 backdrop-blur-sm overflow-hidden group transition-colors duration-500"
                        style={{
                            transformStyle: "preserve-3d",
                            borderColor: `${themeColor}40`,
                            boxShadow: `0 0 40px ${themeColor}10`
                        } as any}
                    >
                        {/* Scan Ring */}
                        <div
                            className="absolute inset-2 border rounded-xl opacity-50 animate-[spin_10s_linear_infinite] transition-colors duration-500"
                            style={{ borderColor: `${themeColor}50` }}
                        />

                        {/* Portrait Placeholder */}
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
                            <span
                                className="text-9xl font-thin select-none transition-colors duration-500"
                                style={{ color: `${themeColor}20` }}
                            >
                                H
                            </span>
                        </div>

                        {/* Holographic Overlay */}
                        <div
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                            style={{
                                background: `radial-gradient(circle at var(--mouse-x) var(--mouse-y), ${themeColor}25, transparent 60%)`
                            }}
                        />

                        {/* Tech Details Overlay */}
                        <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                            <div className="flex flex-col gap-1">
                                <span
                                    className="text-xs tracking-widest uppercase transition-colors duration-500"
                                    style={{ color: `${themeColor}90` }}
                                >
                                    Identity
                                </span>
                                <span className="text-lg text-white font-bold tracking-wide">Hardik Tiwari</span>
                            </div>
                            <div
                                className="w-8 h-8 border rounded-full flex items-center justify-center animate-pulse transition-colors duration-500"
                                style={{ borderColor: `${themeColor}60` }}
                            >
                                <div
                                    className="w-2 h-2 rounded-full transition-colors duration-500"
                                    style={{ backgroundColor: themeColor }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Info Block */}
                <div ref={contentRef} className="w-full md:w-[55%] flex flex-col gap-10">

                    {/* Header & Bio */}
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                                About <span className="transition-colors duration-500" style={{ color: themeColor }}>Me</span>
                            </h2>
                            <div
                                ref={signatureRef}
                                className="h-[2px] w-full max-w-[200px] origin-left shadow-[0_0_10px_#D8ECF8] transition-all duration-500"
                                style={{
                                    background: `linear-gradient(to right, ${themeColor}, transparent)`
                                }}
                            />
                        </div>

                        <p className="text-gray-300 text-lg leading-relaxed max-w-[500px] font-light">
                            I build things on the internet - some useful, some experimental, all made with curiosity.
                            I enjoy turning ideas into interfaces and making code feel a little more human.
                        </p>
                    </div>

                    {/* Tech Stack Panel */}
                    <div className="space-y-6">
                        <h3 ref={techHeaderRef} className="text-sm uppercase tracking-[0.2em] font-semibold flex items-center gap-3 transition-colors duration-500" style={{ color: `${themeColor}CC` }}>
                            <span className="w-8 h-[1px] transition-colors duration-500" style={{ backgroundColor: `${themeColor}80` }} />
                            Tools & Tech
                        </h3>

                        <p className="text-gray-400 text-sm leading-relaxed max-w-[500px] font-light">
                            I use tools because they solve problems well, not because they are trending.
                        </p>

                        {/* Frontend and UX */}
                        <div className="space-y-3">
                            <h4 className="text-xs uppercase tracking-wider text-gray-500 font-medium">Frontend and UX</h4>
                            <div ref={techGridRef} className="grid grid-cols-2 gap-3">
                                {["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "Tailwind", "GSAP", "Three.js"].map((tech) => (
                                    <div
                                        key={tech}
                                        onMouseMove={handleTechMove}
                                        onMouseLeave={handleTechLeave}
                                        className="relative px-6 py-3 bg-white/5 border border-white/10 rounded-lg backdrop-blur-md group cursor-default overflow-hidden"
                                    >
                                        <div
                                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                            style={{ backgroundColor: `${themeColor}0D` }}
                                        />
                                        <div
                                            className="absolute left-0 top-0 bottom-0 w-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_10px_#D8ECF8]"
                                            style={{ backgroundColor: themeColor }}
                                        />

                                        <span className="text-gray-300 group-hover:text-white transition-colors duration-300 text-base font-medium tracking-wide relative z-10">
                                            {tech}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Backend and Systems */}
                        <div className="space-y-3">
                            <h4 className="text-xs uppercase tracking-wider text-gray-500 font-medium">Backend and Systems</h4>
                            <div className="grid grid-cols-2 gap-3">
                                {["Node.js", "Python", "FastAPI", "REST APIs"].map((tech) => (
                                    <div
                                        key={tech}
                                        onMouseMove={handleTechMove}
                                        onMouseLeave={handleTechLeave}
                                        className="relative px-6 py-3 bg-white/5 border border-white/10 rounded-lg backdrop-blur-md group cursor-default overflow-hidden"
                                    >
                                        <div
                                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                            style={{ backgroundColor: `${themeColor}0D` }}
                                        />
                                        <div
                                            className="absolute left-0 top-0 bottom-0 w-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_10px_#D8ECF8]"
                                            style={{ backgroundColor: themeColor }}
                                        />

                                        <span className="text-gray-300 group-hover:text-white transition-colors duration-300 text-base font-medium tracking-wide relative z-10">
                                            {tech}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Workflow and Design */}
                        <div className="space-y-3">
                            <h4 className="text-xs uppercase tracking-wider text-gray-500 font-medium">Workflow and Design</h4>
                            <div className="grid grid-cols-2 gap-3">
                                {["Git", "Figma"].map((tech) => (
                                    <div
                                        key={tech}
                                        onMouseMove={handleTechMove}
                                        onMouseLeave={handleTechLeave}
                                        className="relative px-6 py-3 bg-white/5 border border-white/10 rounded-lg backdrop-blur-md group cursor-default overflow-hidden"
                                    >
                                        <div
                                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                            style={{ backgroundColor: `${themeColor}0D` }}
                                        />
                                        <div
                                            className="absolute left-0 top-0 bottom-0 w-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_10px_#D8ECF8]"
                                            style={{ backgroundColor: themeColor }}
                                        />

                                        <span className="text-gray-300 group-hover:text-white transition-colors duration-300 text-base font-medium tracking-wide relative z-10">
                                            {tech}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <p className="text-gray-400 text-sm leading-relaxed max-w-[500px] font-light pt-2">
                            Performance, accessibility, and clean structure matter in every project I ship.
                        </p>
                    </div>

                </div>
            </div>
        </Section>
    );
}
