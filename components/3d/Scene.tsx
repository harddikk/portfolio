import { Canvas } from "@react-three/fiber";
import { Environment, Sparkles } from "@react-three/drei";
import { Suspense } from "react";

export default function Scene({ children }: { children: React.ReactNode }) {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none">
            <Canvas
                gl={{ antialias: true, alpha: true }}
                dpr={[1, 2]}
                camera={{ position: [0, 0, 5], fov: 50 }}
            >
                <Suspense fallback={null}>
                    <color attach="background" args={["#05060f"]} />
                    <fog attach="fog" args={["#05060f", 5, 20]} />
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={1} color="#D8ECF8" />
                    <Environment preset="city" />
                    <Sparkles count={100} scale={10} size={2} speed={0.4} opacity={0.5} color="#D8ECF8" />
                    {children}
                </Suspense>
            </Canvas>
        </div>
    );
}

