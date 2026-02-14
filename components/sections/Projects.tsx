"use client";

import { useRef, useLayoutEffect, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Section from "@/components/ui/Section";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";

const projects = [
    {
        id: 1,
        title: "ResuMatch",
        label: "AI Product",
        description: "An AI powered resume analysis tool that evaluates resumes against job descriptions, generates an ATS compatibility score, and provides actionable feedback to improve shortlisting chances. Built to explore how AI can be applied to real world hiring workflows, with a focus on clarity, relevance scoring, and useful feedback rather than vague suggestions. Supports resume parsing, keyword matching, and structured improvement insights through a clean, fast interface.",
        tech: ["React", "TypeScript", "Node.js", "AI APIs", "Docker"],
        link: "https://resumatch-1-83rglj.puter.site/",
        githubLink: "https://github.com/harddikk/ResuMatch",
        color: "from-purple-500 to-cyan-500",
        image: "R",
        imageUrl: "/images/resumatch/ResuMatch.png" // Add your screenshot URL here
    },
    {
        id: 2,
        title: "Catching the Rare",
        label: "Research Project",
        description: "A machine learning research project focused on detecting rare network intrusions under extreme class imbalance. The work studies how linear and ensemble models behave when malicious traffic is vastly outnumbered by benign data. The study evaluates Logistic Regression, Random Forest, and XGBoost using imbalance aware metrics such as precision recall curves, ROC analysis, and balanced accuracy. The goal was not just performance, but interpretability and understanding which features contribute most to intrusion detection. Experiments were conducted on the CICIDS 2017 dataset using simulated network traffic. The project emphasizes reproducibility, transparent methodology, and practical evaluation over headline accuracy scores.",
        tech: ["Python", "scikit-learn", "XGBoost", "Data Preprocessing", "Model Evaluation"],
        link: "https://zenodo.org/records/18408605",
        githubLink: "https://github.com/harddikk/Catching-the-Rare",
        color: "from-blue-500 to-emerald-500",
        image: "C",
        imageUrl: "/images/research/research.png", // Add your screenshot URL here
        isPaper: true
    },
    {
        id: 3,
        title: "Notesy",
        label: "Shipped App",
        description: "A lightweight notes application focused on speed, clarity, and offline reliability. Built as a daily use tool with a clean interface and minimal friction. Features include fast note creation, local storage, and a distraction free writing experience. Designed, developed, and published independently.",
        tech: ["Android", "Java", "Local Storage"],
        link: "https://github.com/harddikk/Notesy",
        color: "from-orange-500 to-red-500",
        image: "N",
        imageUrl: "https://opengraph.githubassets.com/1/harddikk/Notesy" // Add your screenshot URL here
    },
    {
        id: 4,
        title: "Wallpaper X API",
        description: "An Android application that fetches and displays high quality wallpapers using external APIs. Built to explore API integration, asynchronous loading, and efficient media handling.",
        tech: ["Android", "REST APIs"],
        link: "https://github.com/harddikk/Wallaby-Android-Wallpaper-App",
        color: "from-pink-500 to-purple-500",
        image: "W",
        imageUrl: "" // Add your screenshot URL here
    },
];

export default function Projects() {
    const containerRef = useRef<HTMLDivElement>(null);
    const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
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
            projectRefs.current.forEach((el, index) => {
                if (!el) return;

                const direction = index % 2 === 0 ? -100 : 100;

                gsap.fromTo(
                    el,
                    { x: direction, opacity: 0 },
                    {
                        x: 0,
                        opacity: 1,
                        duration: 1.2,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: el,
                            start: "top 75%",
                            toggleActions: "play none none none",
                        },
                    }
                );
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    // 3D Tilt Effect for Images
    const handleImageMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -8;
        const rotateY = ((x - centerX) / centerX) * 8;

        gsap.to(card, {
            rotationX: rotateX,
            rotationY: rotateY,
            scale: 1.02,
            transformPerspective: 1000,
            duration: 0.4,
            ease: "power2.out",
        });

        // Update CSS variables for light sweep
        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
    };

    const handleImageLeave = (e: React.MouseEvent<HTMLDivElement>) => {
        gsap.to(e.currentTarget, {
            rotationX: 0,
            rotationY: 0,
            scale: 1,
            duration: 0.6,
            ease: "elastic.out(1, 0.5)",
        });
    };

    return (
        <Section id="projects" className="bg-background py-32 relative overflow-hidden">
            {/* Theme Glow */}
            <div
                className="absolute top-1/4 right-0 w-[600px] h-[600px] rounded-full blur-[150px] opacity-10 pointer-events-none transition-colors duration-700"
                style={{ backgroundColor: themeColor }}
            />

            <div ref={containerRef} className="w-full max-w-[1400px] mx-auto px-6 space-y-32 relative z-10">
                <div className="text-center space-y-4 mb-24">
                    <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter">
                        Selected <span className="transition-colors duration-500 drop-shadow-[0_0_15px_rgba(135,87,255,0.5)]" style={{ color: themeColor }}>Works</span>
                    </h2>
                    <div
                        className="h-1 w-24 mx-auto rounded-full shadow-[0_0_10px_#8757FF] transition-colors duration-500"
                        style={{ backgroundColor: themeColor }}
                    />
                </div>

                {projects.map((project, index) => (
                    <div
                        key={project.id}
                        ref={(el) => { projectRefs.current[index] = el }}
                        className={`flex flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                            } gap-12 lg:gap-24 items-center`}
                    >
                        {/* Project Visual (Cinematic Image) */}
                        <div
                            className="w-full lg:w-[60%] aspect-video rounded-2xl overflow-hidden relative group cursor-none perspective-1000"
                            onMouseMove={handleImageMove}
                            onMouseLeave={handleImageLeave}
                            style={{ transformStyle: "preserve-3d" } as any}
                        >
                            {/* Base Image Placeholder */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-20 group-hover:opacity-30 transition-opacity duration-500`} />

                            {/* Actual Project Image */}
                            {project.imageUrl ? (
                                <img
                                    src={project.imageUrl}
                                    alt={project.title}
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                            ) : (
                                /* Fallback Letter Display */
                                <div className="absolute inset-0 flex items-center justify-center text-white/10 text-9xl font-bold group-hover:scale-110 transition-transform duration-700 select-none transform-gpu">
                                    {project.image}
                                </div>
                            )}

                            {/* Holographic Grain Overlay */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat mix-blend-overlay" />

                            {/* Parallax Light Sweep */}
                            <div
                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                style={{
                                    background: `radial-gradient(circle at var(--mouse-x) var(--mouse-y), ${themeColor}30, transparent 40%)`
                                }}
                            />

                            {/* Glowing Border */}
                            <div
                                className="absolute inset-0 border border-white/10 rounded-2xl transition-colors duration-300 shadow-[0_0_30px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_50px_rgba(135,87,255,0.15)]"
                                style={{ borderColor: "rgba(255,255,255,0.1)" }}
                            />
                        </div>

                        {/* Project Details */}
                        <div className="w-full lg:w-[40%] space-y-8 text-center lg:text-left">
                            {/* Category Label */}
                            {project.label && (
                                <div className="inline-block">
                                    <span
                                        className="px-4 py-1.5 text-xs uppercase tracking-widest font-semibold rounded-full border transition-all duration-300"
                                        style={{
                                            color: themeColor,
                                            borderColor: `${themeColor}40`,
                                            backgroundColor: `${themeColor}10`,
                                        }}
                                    >
                                        {project.label}
                                    </span>
                                </div>
                            )}
                            <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight">{project.title}</h3>
                            <p className="text-gray-400 text-lg leading-relaxed">{project.description}</p>

                            {/* Interactive Skill Tags */}
                            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                                {project.tech.map((t, techIndex) => (
                                    <span
                                        key={t}
                                        ref={(el) => {
                                            if (el && !el.dataset.animated) {
                                                gsap.fromTo(
                                                    el,
                                                    { opacity: 0, y: 20, scale: 0.8 },
                                                    {
                                                        opacity: 1,
                                                        y: 0,
                                                        scale: 1,
                                                        duration: 0.5,
                                                        delay: techIndex * 0.1,
                                                        ease: "back.out(1.7)",
                                                        scrollTrigger: {
                                                            trigger: el,
                                                            start: "top 85%",
                                                            toggleActions: "play none none none",
                                                        },
                                                    }
                                                );
                                                el.dataset.animated = "true";
                                            }
                                        }}
                                        className="px-4 py-2 text-sm rounded-full bg-white/5 border border-white/10 text-gray-300 hover:text-white transition-all duration-300 cursor-default"
                                        style={{
                                            boxShadow: "0 0 0 rgba(135, 87, 255, 0)",
                                            transition: "all 0.3s ease",
                                        }}
                                        onMouseEnter={(e) => {
                                            gsap.to(e.currentTarget, {
                                                scale: 1.05,
                                                duration: 0.3,
                                                ease: "power2.out",
                                            });
                                            e.currentTarget.style.boxShadow = `0 0 15px ${themeColor}50, 0 0 30px ${themeColor}20`;
                                            e.currentTarget.style.borderColor = `${themeColor}40`;
                                        }}
                                        onMouseLeave={(e) => {
                                            gsap.to(e.currentTarget, {
                                                scale: 1,
                                                duration: 0.3,
                                                ease: "power2.out",
                                            });
                                            e.currentTarget.style.boxShadow = "0 0 0 rgba(135, 87, 255, 0)";
                                            e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
                                        }}
                                    >
                                        {t}
                                    </span>
                                ))}
                            </div>

                            {/* Premium Button */}
                            <div className="pt-4 flex gap-4 justify-center lg:justify-start flex-wrap">
                                <Link
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="relative group inline-flex items-center justify-center px-8 py-4 overflow-hidden font-medium transition-all duration-500 bg-white/5 rounded-full border border-white/10"
                                    style={{
                                        color: themeColor,
                                        borderColor: `${themeColor}40`,
                                    }}
                                    onMouseEnter={(e) => {
                                        gsap.to(e.currentTarget, {
                                            scale: 1.05,
                                            duration: 0.4,
                                            ease: "power2.out",
                                        });
                                        e.currentTarget.style.boxShadow = `0 0 30px ${themeColor}60, 0 0 60px ${themeColor}30, 0 10px 40px rgba(0,0,0,0.3)`;
                                        e.currentTarget.style.borderColor = themeColor;
                                        e.currentTarget.style.backgroundColor = `${themeColor}15`;
                                    }}
                                    onMouseLeave={(e) => {
                                        gsap.to(e.currentTarget, {
                                            scale: 1,
                                            duration: 0.4,
                                            ease: "power2.out",
                                        });
                                        e.currentTarget.style.boxShadow = `0 0 20px ${themeColor}20`;
                                        e.currentTarget.style.borderColor = `${themeColor}40`;
                                        e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.05)";
                                    }}
                                >
                                    {/* Animated gradient border */}
                                    <span
                                        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                        style={{
                                            background: `conic-gradient(from 0deg, transparent, ${themeColor}40, transparent, ${themeColor}40, transparent)`,
                                            animation: "spin 3s linear infinite",
                                        }}
                                    />

                                    {/* Inner glow */}
                                    <span className="absolute inset-0 rounded-full bg-gradient-to-b from-white/10 via-transparent to-transparent opacity-50" />

                                    <span className="relative flex items-center gap-3 z-10">
                                        {project.isPaper ? "View Paper" : project.githubLink ? "View Project" : "View on GitHub"}
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={2}
                                            stroke="currentColor"
                                            className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-2"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                        </svg>
                                    </span>
                                </Link>

                                {/* View Code Button (if githubLink exists) */}
                                {project.githubLink && (
                                    <Link
                                        href={project.githubLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="relative group inline-flex items-center justify-center px-8 py-4 overflow-hidden font-medium transition-all duration-500 bg-white/5 rounded-full border border-white/10"
                                        style={{
                                            color: themeColor,
                                            borderColor: `${themeColor}40`,
                                        }}
                                        onMouseEnter={(e) => {
                                            gsap.to(e.currentTarget, {
                                                scale: 1.05,
                                                duration: 0.4,
                                                ease: "power2.out",
                                            });
                                            e.currentTarget.style.boxShadow = `0 0 30px ${themeColor}60, 0 0 60px ${themeColor}30, 0 10px 40px rgba(0,0,0,0.3)`;
                                            e.currentTarget.style.borderColor = themeColor;
                                            e.currentTarget.style.backgroundColor = `${themeColor}15`;
                                        }}
                                        onMouseLeave={(e) => {
                                            gsap.to(e.currentTarget, {
                                                scale: 1,
                                                duration: 0.4,
                                                ease: "power2.out",
                                            });
                                            e.currentTarget.style.boxShadow = `0 0 20px ${themeColor}20`;
                                            e.currentTarget.style.borderColor = `${themeColor}40`;
                                            e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.05)";
                                        }}
                                    >
                                        {/* Animated gradient border */}
                                        <span
                                            className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                            style={{
                                                background: `conic-gradient(from 0deg, transparent, ${themeColor}40, transparent, ${themeColor}40, transparent)`,
                                                animation: "spin 3s linear infinite",
                                            }}
                                        />

                                        {/* Inner glow */}
                                        <span className="absolute inset-0 rounded-full bg-gradient-to-b from-white/10 via-transparent to-transparent opacity-50" />

                                        <span className="relative flex items-center gap-3 z-10">
                                            View Code
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={2}
                                                stroke="currentColor"
                                                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-2"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                            </svg>
                                        </span>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Section>
    );
}
