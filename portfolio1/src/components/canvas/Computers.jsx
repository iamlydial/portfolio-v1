import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import CanvasLoader from "../Loader";

const Computers = ({ isMobile }) => {
  const computer = useGLTF("./desktop_pc/scene.gltf");

  return (
    <>
      <mesh>
        <hemisphereLight intensity={0.15} groundColor="black" />
        <pointLight intensity={1} />
        <spotLight
          position={[-20, 50, 10]}
          angle={0.12}
          penumbra={1}
          intensity={1}
          castShadow
          shadow-mapSize={1024}
        />
        <primitive
          object={computer.scene}
          scale={isMobile ? 0.7 : 0.75}
          position={isMobile ? [0, -3, -2.2] : [0, -3.25, -1.5]}
          rotation={[-0.01, -0.2, -0.1]}
        />
      </mesh>
    </>
  );
};

const ComputersCanvas = () => {
  // Define a state variable named 'isMobile' and a function to update it named 'setIsMobile'
  const [isMobile, setIsMobile] = useState(false);

  // Use the useEffect hook to perform side effects in functional components
  useEffect(() => {
    // Create a media query that checks if the screen width is at most 500px
    const mediaQuery = window.matchMedia("(max-width: 500px)");

    // Set the initial value of the 'isMobile' state variable based on the media query result
    setIsMobile(mediaQuery.matches);

    // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event) => {
      // Update the 'isMobile' state variable based on the new media query result
      setIsMobile(event.matches);
    };

    // Add the 'handleMediaQueryChange' callback as a listener for changes to the media query
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Clean up function: this function will be called when the component is unmounted
    return () => {
      // Remove the 'handleMediaQueryChange' listener when the component is unmounted
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []); // An empty dependency array means this effect runs only after the initial render

  return (
    <>
      <Canvas
        frameloop="demand"
        shadows
        camera={{ position: [20, 2, 5], fov: 25 }}
        gl={{ preserveDrawingBuffer: true }}
      >
        <Suspense fallback={<CanvasLoader />}>
          <OrbitControls
            enableZoom={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
          <Computers isMobile={isMobile} />
        </Suspense>
        <Preload all />
      </Canvas>
    </>
  );
};

export default ComputersCanvas;
