import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, Center } from "@react-three/drei";
import Model from "./Model";

export default function ProductCard({ modelPath = "/models/masala.glb", title, subtitle, description }) {
  return (
    <div className="bg-emerald-700 rounded-lg p-6 shadow-lg"> 
      <div className="w-full h-56 bg-emerald-800 rounded-md mb-6 flex items-center justify-center">
        <Canvas camera={{ position: [0, 0.8, 2.5], fov: 40 }}>
          <ambientLight intensity={0.7} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <Center>
            <Model modelPath={modelPath} autoRotate={false} />
          </Center>
          <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} enableDamping={true} dampingFactor={0.05} />
          <Environment preset="studio" />
        </Canvas>
      </div>

      <p className="text-xs text-amber-300 font-semibold mb-2">{subtitle}</p>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-sm text-emerald-100">{description}</p>
    </div>
  );
}
