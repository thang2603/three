import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Box } from "@react-three/fiber/three";

const IndependentCloneObject = () => {
  const originalObjectRef = useRef();
  const clonedObjectRef = useRef();

  // Deep clone the original object
  const clonedObject = originalObjectRef.current.clone(true);

  // Customize the cloned object (optional)
  clonedObject.position.set(2, 0, 0);

  useFrame(() => {
    // Rotate the original object
    originalObjectRef.current.rotation.y += 0.01;

    // Rotate the cloned object
    clonedObjectRef.current.rotation.y -= 0.01;
  });

  return (
    <>
      {/* Original object */}
      <Box
        ref={originalObjectRef}
        position={[-1, 0, 0]}
        args={[1, 1, 1]}
        color="blue"
      />

      {/* Cloned object */}
      <Box
        ref={clonedObjectRef}
        position={[3, 0, 0]}
        args={[1, 1, 1]}
        color="red"
      />
    </>
  );
};

const Scene = () => {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <IndependentCloneObject />
    </Canvas>
  );
};

export default Scene;
