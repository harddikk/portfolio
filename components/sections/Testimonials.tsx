"use client";

import { useRef, useState, useLayoutEffect, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Section from "@/components/ui/Section";
import { useTheme } from "@/context/ThemeContext";

const testimonials = [
    {
        id: 1,
        name: "Alex Rivera",
        role: "Product Designer",
        text: "Hardik's work is simply next level. The attention to detail and animations are unmatched. He turned our vision into a digital masterpiece.",
        image: "A"
    },
    {
        id: 2,
        name: "Sarah Chen",
        role: "CTO @ TechFlow",
        text: "A true visionary developer. He turned our complex requirements into a seamless experience. The performance optimization is incredible.",
        image: "S"
    },
    {
        id: 3,
        name: "James Wilson",
        role: "Director",
        text: "Cinematic, immersive, and performant. Exactly what we needed for our brand launch. The user feedback has been overwhelmingly positive.",
        image: "J"
    },
    {
        id: 4,
        name: "Elena Rodriguez",
        role: "Creative Director",
        text: "Working with Hardik was a dream. He understands design language and translates it into code perfectly. A rare talent in the industry.",
        image: "E"
    },
    {
        id: 5,
        name: "Michael Chang",
        role: "Founder @ Nova",
        text: "The holographic interface he built for us blew everyone away. It's not just a website, it's an experience. Highly recommended.",
        image: "M"
    }
];

export default function Testimonials() {
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [activeId, setActiveId] = useState<number>(2); // Default center
    const { setTheme, getHexColor } = useTheme();
    const themeColor = getHexColor("blue-500");

    // Set Theme
    useEffect(() => {
        const ctx = gsap.context(() => {
            ScrollTrigger.create({
                trigger: containerRef.current,
                start: "top center",
                end: "bottom center",
                onEnter: () => setTheme("blue-500"),
                onEnterBack: () => setTheme("blue-500"),
            });
        }, containerRef);
        return () => ctx.revert();
    }, [setTheme]);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Parallax Background
            gsap.to(".parallax-bg", {
                x: -100,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1,
                },
            });

            // Cards Entrance (Refined: Slide Up + Fade)
            if (scrollContainerRef.current) {
                gsap.fromTo(
                    scrollContainerRef.current.children,
                    { y: 50, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1.2,
                        stagger: 0.15,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: containerRef.current,
                            start: "top 75%",
                            toggleActions: "play reverse play reverse",
                        },
                    }
                );
            }
        }, containerRef);

        return () => ctx.revert();
    }, []);

    // Active Card Detection
    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const handleScroll = () => {
            const center = container.scrollLeft + container.offsetWidth / 2;
            const cards = Array.from(container.children) as HTMLElement[];

            let closestDist = Infinity;
            let closestId = -1;

            cards.forEach((card, index) => {
                const cardCenter = card.offsetLeft + card.offsetWidth / 2;
                const dist = Math.abs(center - cardCenter);
                if (dist < closestDist) {
                    closestDist = dist;
                    closestId = testimonials[index].id;
                }
            });

            if (closestId !== -1 && closestId !== activeId) {
                setActiveId(closestId);
            }
        };

        container.addEventListener("scroll", handleScroll);
        return () => container.removeEventListener("scroll", handleScroll);
    }, [activeId]);

    // Drag to Scroll
    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        let isDown = false;
        let startX: number;
        let scrollLeft: number;
        let velocity = 0;
        let lastX = 0;
        let lastTime = Date.now();
        let animationFrame: number;

        const handleMouseDown = (e: MouseEvent) => {
            isDown = true;
            container.style.cursor = 'grabbing';
            container.style.userSelect = 'none';
            startX = e.pageX - container.offsetLeft;
            scrollLeft = container.scrollLeft;
            velocity = 0;
            lastX = e.pageX;
            lastTime = Date.now();
            cancelAnimationFrame(animationFrame);
        };

        const handleMouseLeave = () => {
            isDown = false;
            container.style.cursor = 'grab';
            applyMomentum();
        };

        const handleMouseUp = () => {
            isDown = false;
            container.style.cursor = 'grab';
            applyMomentum();
        };

        const handleMouseMove = (e: MouseEvent) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - container.offsetLeft;
            const walk = (x - startX) * 2;
            container.scrollLeft = scrollLeft - walk;

            // Calculate velocity
            const now = Date.now();
            const dt = now - lastTime;
            if (dt > 0) {
                velocity = (e.pageX - lastX) / dt;
            }
            lastX = e.pageX;
            lastTime = now;
        };

        const applyMomentum = () => {
            if (Math.abs(velocity) > 0.1) {
                container.scrollLeft -= velocity * 20;
                velocity *= 0.95; // Deceleration
                animationFrame = requestAnimationFrame(applyMomentum);
            }
        };

        container.style.cursor = 'grab';
        container.addEventListener('mousedown', handleMouseDown);
        container.addEventListener('mouseleave', handleMouseLeave);
        container.addEventListener('mouseup', handleMouseUp);
        container.addEventListener('mousemove', handleMouseMove);

        return () => {
            container.removeEventListener('mousedown', handleMouseDown);
            container.removeEventListener('mouseleave', handleMouseLeave);
            container.removeEventListener('mouseup', handleMouseUp);
            container.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrame);
        };
    }, []);

    // Navigation
    const scroll = (direction: "left" | "right") => {
        if (scrollContainerRef.current) {
            const scrollAmount = 500; // Adjusted for wider cards/gap
            scrollContainerRef.current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth",
            });
        }
    };

    // 3D Tilt Effect
    const handleCardMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -5;
        const rotateY = ((x - centerX) / centerX) * 5;

        gsap.to(card, {
            rotationX: rotateX,
            rotationY: rotateY,
            transformPerspective: 1000,
            duration: 0.4,
            ease: "power2.out",
        });
    };

    const handleCardLeave = (e: React.MouseEvent<HTMLDivElement>) => {
        gsap.to(e.currentTarget, {
            rotationX: 0,
            rotationY: 0,
            duration: 0.6,
            ease: "elastic.out(1, 0.5)",
        });
    };

    return (
        <Section id="testimonials" className="bg-background relative min-h-screen flex flex-col justify-center overflow-hidden py-32 md:py-40">
            {/* Parallax Background */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="parallax-bg absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(216,236,248,0.03)_0%,transparent_70%)] scale-150" />
                <div className="absolute top-1/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
                <div className="absolute bottom-1/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />

                {/* Theme Glow */}
                <div
                    className="absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px] opacity-10 transition-colors duration-700"
                    style={{ backgroundColor: themeColor }}
                />
            </div>

            <div ref={containerRef} className="relative z-10 w-full max-w-[1600px] mx-auto space-y-20 px-6">

                {/* Header */}
                <div className="text-center space-y-4">
                    <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter">
                        Client <span className="transition-colors duration-500 drop-shadow-[0_0_15px_rgba(62,168,255,0.5)]" style={{ color: themeColor }}>Stories</span>
                    </h2>
                    <div
                        className="h-1 w-24 mx-auto rounded-full shadow-[0_0_10px_#3EA8FF] transition-colors duration-500"
                        style={{ backgroundColor: themeColor }}
                    />
                </div>

                {/* Carousel Container */}
                <div className="relative group">
                    {/* Navigation Arrows */}
                    <button
                        onClick={() => scroll("left")}
                        className="absolute left-4 md:-left-4 top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full border border-white/10 bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/10 transition-all duration-300 hover:scale-110 hidden md:flex"
                        style={{ borderColor: `${themeColor}40` }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                    </button>

                    <button
                        onClick={() => scroll("right")}
                        className="absolute right-4 md:-right-4 top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full border border-white/10 bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/10 transition-all duration-300 hover:scale-110 hidden md:flex"
                        style={{ borderColor: `${themeColor}40` }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                    </button>

                    {/* Scroll Area */}
                    <div
                        ref={scrollContainerRef}
                        className="flex overflow-x-auto gap-12 md:gap-16 pb-16 pt-12 px-6 md:px-[calc(50vw-250px)] snap-x snap-mandatory scrollbar-hide items-center"
                        style={{
                            scrollBehavior: "smooth",
                            scrollbarWidth: "none", /* Firefox */
                            msOverflowStyle: "none", /* IE/Edge */
                        }}
                    >
                        <style jsx>{`
                            div::-webkit-scrollbar {
                                display: none;
                            }
                        `}</style>
                        {testimonials.map((t) => (
                            <div
                                key={t.id}
                                onMouseMove={handleCardMove}
                                onMouseLeave={handleCardLeave}
                                className={`
                                    relative flex-shrink-0 w-[85vw] md:w-[500px] p-8 md:p-12 rounded-2xl 
                                    bg-white/5 border backdrop-blur-md transition-all duration-500 snap-center group/card
                                    ${activeId === t.id
                                        ? "scale-105 shadow-[0_0_40px_rgba(62,168,255,0.15)] bg-white/10 z-10"
                                        : "scale-95 border-white/10 opacity-60 hover:opacity-100 z-0"}
                                `}
                                style={{
                                    borderColor: activeId === t.id ? `${themeColor}40` : "rgba(255,255,255,0.1)"
                                }}
                            >
                                {/* Ambient Spotlight */}
                                <div
                                    className="absolute inset-0 blur-2xl rounded-2xl -z-10 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"
                                    style={{ backgroundColor: `${themeColor}0D` }}
                                />

                                <div className="flex items-start gap-6 mb-8">
                                    <div
                                        className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-800 to-black border flex items-center justify-center text-2xl font-bold shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                                        style={{ borderColor: `${themeColor}30`, color: themeColor }}
                                    >
                                        {t.image}
                                    </div>
                                    <div>
                                        <h4
                                            className="text-xl text-white font-bold tracking-wide transition-colors duration-300"
                                            style={{ color: activeId === t.id ? themeColor : "white" }}
                                        >
                                            {t.name}
                                        </h4>
                                        <p className="text-sm text-gray-400 uppercase tracking-wider font-medium mt-1">
                                            {t.role}
                                        </p>
                                    </div>
                                </div>

                                <p className="text-gray-300 text-lg leading-relaxed font-light italic">
                                    "{t.text}"
                                </p>

                                {/* Decorative Corner */}
                                <div className="absolute top-4 right-4 w-2 h-2 border-t border-r opacity-50" style={{ borderColor: themeColor }} />
                                <div className="absolute bottom-4 left-4 w-2 h-2 border-b border-l opacity-50" style={{ borderColor: themeColor }} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Section>
    );
}
