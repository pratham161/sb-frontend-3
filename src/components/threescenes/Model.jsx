import { useGLTF } from "@react-three/drei";

export default function Model({ modelPath = "/models/masala.glb", ...props }) {
  const { scene } = useGLTF(modelPath);

  return (
    <primitive
      object={scene}
      scale={1}
      position={[0, 0, 0]}
      rotation={[0, 0, 0]}
      {...props}
    />
  );
}

// Optional: preloads model
useGLTF.preload("/models/masala.glb");
