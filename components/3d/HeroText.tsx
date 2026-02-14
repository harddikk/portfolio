"use client";

import { Text3D, Center } from "@react-three/drei";
import { useRef, useLayoutEffect } from "react";
import { Mesh } from "three";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { gsap } from "gsap";

export default function HeroText() {
    const meshRef = useRef<Mesh>(null);
    const groupRef = useRef<THREE.Group>(null);
    const materialRef = useRef<THREE.MeshStandardMaterial>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Intro Animation
            gsap.from(groupRef.current!.scale, {
                x: 0.9,
                y: 0.9,
                z: 0.9,
                duration: 2,
                ease: "power3.out",
            });

            gsap.from(groupRef.current!.position, {
                y: -0.5,
                duration: 2,
                ease: "power3.out",
            });

            if (materialRef.current) {
                gsap.from(materialRef.current, {
                    opacity: 0,
                    duration: 2,
                    ease: "power3.out",
                });
            }
        });

        return () => ctx.revert();
    }, []);

    useFrame((state) => {
        if (meshRef.current) {
            // Subtle floating animation
            meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
        }
    });

    return (
        <Center>
            <group ref={groupRef}>
                <Text3D
                    ref={meshRef}
                    font="https://threejs.org/examples/fonts/helvetiker_regular.typeface.json"
                    size={1.5}
                    height={0.2}
                    curveSegments={12}
                    bevelEnabled
                    bevelThickness={0.02}
                    bevelSize={0.02}
                    bevelOffset={0}
                    bevelSegments={5}
                >
                    HARDIK
                    <meshStandardMaterial
                        ref={materialRef}
                        color="#D8ECF8"
                        emissive="#D8ECF8"
                        emissiveIntensity={0.5}
                        roughness={0.1}
                        metalness={0.8}
                        transparent
                    />
                </Text3D>
            </group>
        </Center>
    );
}
