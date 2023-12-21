import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

function MyModel() {
  const groupRef = useRef();
  const { nodes } = useGLTF("/path/to/your/model.gltf");

  // Tạo một đối tượng mới và gán vật liệu từ đối tượng đã nạp
  const clonedObject = useMemo(() => {
    if (nodes && nodes.YourObject) {
      const cloned = nodes.YourObject.clone();
      cloned.material = cloned.material.clone(); // Clone vật liệu để không ảnh hưởng đến vật liệu gốc
      cloned.material.opacity = 0.5;
      cloned.material.transparent = true;
      return cloned;
    }
    return null;
  }, [nodes]);

  useFrame(() => {
    groupRef.current.rotation.y += 0.01;
  });

  return (
    <group ref={groupRef}>
      {clonedObject && <primitive object={clonedObject} />}
    </group>
  );
}

function App() {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <MyModel />
    </Canvas>
  );
}

export default App;
