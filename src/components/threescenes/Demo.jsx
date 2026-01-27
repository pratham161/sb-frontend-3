import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, Center } from "@react-three/drei";
import Model from "./Model";

export default function Demo({ modelPath = "/models/masala.glb" } = {}) {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Canvas camera={{ position: [0, 1.5, 4], fov: 100 }} style={{ width: "100%", height: "100%" }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Center>
          <Model modelPath={modelPath} />
        </Center>

        <OrbitControls
          enableZoom={false}
          enableDamping={true}
          dampingFactor={0.05}
          autoRotate={true}
          autoRotateSpeed={1.0}
        />
        <Environment preset="studio" />
      </Canvas>
    </div>
  );
}
