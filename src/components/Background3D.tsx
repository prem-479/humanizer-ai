import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Float } from '@react-three/drei';
import type { Mesh } from 'three';

function Core() {
    const meshRef = useRef<Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            const t = state.clock.getElapsedTime();
            meshRef.current.rotation.x = t * 0.1;
            meshRef.current.rotation.y = t * 0.15;

            // Gentle pulsing scale
            const scale = 1 + Math.sin(t * 0.5) * 0.1;
            meshRef.current.scale.set(scale, scale, scale);
        }
    });

    return (
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
            <Sphere args={[1.5, 32, 32]} ref={meshRef}>
                <meshStandardMaterial
                    color="#d97706"
                    roughness={0.4}
                    metalness={0.6}
                    wireframe={true} // Stylish technical look that is performant
                />
            </Sphere>
        </Float>
    );
}

export function Background3D() {
    // Simple error boundary fallback for just this component could be added,
    // but refining the component to purely local assets is safer.
    return (
        <div className="fixed inset-0 -z-10 opacity-30 pointer-events-none">
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <spotLight
                    position={[10, 10, 10]}
                    angle={0.15}
                    penumbra={1}
                    intensity={1}
                />
                <pointLight position={[-10, -10, -10]} intensity={0.5} />

                <Core />
                {/* Removed Environment to avoid network/loading failures */}
            </Canvas>
        </div>
    );
}
