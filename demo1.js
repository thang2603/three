import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

const ClonableGLTFModel = () => {
  const { scene } = useGLTF("/path/to/your/model.glb");
  const originalModelRef = useRef();
  const clonedModelRef = useRef();

  // Clone the original GLTF model
  const clonedModel = scene.clone(true);

  // Customize the cloned model (optional)
  clonedModel.position.set(2, 0, 0);

  // Save a reference to the cloned model
  clonedModelRef.current = clonedModel;

  useFrame(() => {
    // Rotate the original model
    originalModelRef.current.rotation.y += 0.01;

    // Rotate the cloned model
    if (clonedModelRef.current) {
      clonedModelRef.current.rotation.y -= 0.01;
    }
  });

  return (
    <>
      {/* Original GLB model */}
      <primitive object={scene} ref={originalModelRef} />

      {/* Cloned GLB model */}
      <primitive object={clonedModel} />
    </>
  );
};

const Scene = () => {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <ClonableGLTFModel />
    </Canvas>
  );
};

export default Scene;
