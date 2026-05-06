// "use client";

// import { Canvas } from "@react-three/fiber";
// import { OrbitControls } from "@react-three/drei";
// // import { RobotModel } from '../ui/RobotModel';

// export const Scene = () => {
//   return (
//     <div style={{ width: "100%", height: "100%", position: "relative" }}>
//       <Canvas
//         camera={{ position: [0, 0, 5], fov: 75 }}
//         gl={{ alpha: true, antialias: false, stencil: false, depth: true }} // Disabled antialiasing for performance
//         style={{ background: "transparent" }}
//       >
//         {/* Ambient Light - Reduced intensity */}
//         <ambientLight intensity={0.4} />

//         {/* Key Light - Reduced intensity */}
//         <pointLight position={[5, 5, 8]} intensity={0.8} color="#00d4ff" />

//         {/* Fill Light - Reduced intensity */}
//         <pointLight position={[-5, -3, 5]} intensity={0.4} color="#7c3aed" />

//         {/* Back Light - Reduced intensity */}
//         <pointLight position={[0, 0, -5]} intensity={0.3} color="#f59e0b" />

//         {/* Fog - Reduced density */}
//         <fog attach="fog" args={["#050510", 2, 15]} />

//         {/* Robot Model */}
//         <RobotModel />

//         {/* Disable orbit controls for static scene */}
//         <OrbitControls enabled={false} />
//       </Canvas>
//     </div>
//   );
// };
