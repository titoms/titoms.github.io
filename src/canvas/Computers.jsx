import {Suspense, useEffect, useState } from 'react'
import {Canvas} from '@react-three/fiber';
import {OrbitControls, Preload, useGLTF } from '@react-three/drei'
import CanvasLoader from '../components/Loader';

const Computers = ({ isMobile }) => {
  const computer = useGLTF('./desktop_pc/scene.gltf')

  return (
    <mesh>
      <hemisphereLight 
        intensity={0.15}
        groundColor="black"
      />
      <pointLight intensity={1} />
      <spotLight 
        position={[-20, 50, 10]}
        angle={0.2}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <primitive 
        object={computer.scene}
        scale={isMobile ? 0.6 : 0.5}
        position={[0, -1.25, -1.5]}
        rotation={[-0.05, -0.4, -0.2]}
      />
    </mesh>
  )
}

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // add listener for changes to screen size
    const mediaQuery = window.matchMedia('(max-width: 500px)');
    // isMobile initial value
    setIsMobile(mediaQuery.matches);
    // handle changes
    const handleMediaQueryChange = () => {
      setIsMobile(event.matches);
    }
    // add to a listener
    mediaQuery.addEventListener('change', handleMediaQueryChange);
    // then remove when is unmounted
    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    }
  }, [])

  return (
    <Canvas 
      frameloop="demand"
      shadows
      camera={{position: [20, 3, 5], fov: 25}}
      gl={{preserveDrawingBuffer: true}}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls 
          enableZoom={false}
          maxPolarAngle={Math.PI / 2} 
          minPolarAngle={Math.PI / 2} 
        />
        <Computers isMobile={isMobile}/>
      </Suspense>

      <Preload all />
    </Canvas>
  )
}

export default ComputersCanvas