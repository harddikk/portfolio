"use client";

import { useRef, useLayoutEffect, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Scene from "@/components/3d/Scene";
import HeroText from "@/components/3d/HeroText";
import { useThree } from "@react-three/fiber";
import { useTheme } from "@/context/ThemeContext";

gsap.registerPlugin(ScrollTrigger);

function CameraController() {
    const { camera } = useThree();
    const tl = useRef<gsap.core.Timeline | null>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            tl.current = gsap.timeline({
                scrollTrigger: {
                    trigger: "#hero-section",
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                    pin: false, // We don't pin the canvas, we animate the camera
                },
            });

            // Cinematic camera moves
            tl.current.to(camera.position, {
                y: -2,
                z: 2,
                ease: "none",
            });

            tl.current.to(camera.rotation, {
                x: -0.5,
                ease: "none",
            }, "<");

        });

        return () => ctx.revert();
    }, [camera]);

    return null;
}

export default function Hero() {
    const taglineRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLElement>(null);
    const { setTheme } = useTheme();

    // Set Theme on Mount/Scroll
    useEffect(() => {
        const ctx = gsap.context(() => {
            ScrollTrigger.create({
                trigger: containerRef.current,
                start: "top center",
                end: "bottom center",
                onEnter: () => setTheme("white"),
                onEnterBack: () => setTheme("white"),
            });
        }, containerRef);
        return () => ctx.revert();
    }, [setTheme]);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(taglineRef.current, {
                opacity: 0,
                y: 20,
                scale: 0.9,
                duration: 2,
                ease: "power3.out",
            });
        });

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} id="hero-section" className="relative h-[200vh] w-full">
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                <Scene>
                    <HeroText />
                    <CameraController />
                </Scene>

                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
                    <div className="mt-[55vh] text-center">
                        <div ref={taglineRef}>
                            <p className="text-accent text-lg tracking-[0.5em] uppercase font-light animate-pulse-slow">
                                Builder | Developer | RESEARCHER
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
