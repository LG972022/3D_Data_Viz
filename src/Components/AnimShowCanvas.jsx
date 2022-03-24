import React, { useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, PerspectiveCamera } from "@react-three/drei";
import { useSpring, animated, config } from "@react-spring/three";

import AnimBox from "../MeshMakers/adaptiveBox";

function AnimShowCanvas({ segmentArray }) {
  const [in3DMode, setIn3DMode] = useState("3D");

  console.log(segmentArray);

  return (
    <div className="Canvas_Container">
      <div className="Canvas_Background">
        <button>Press Me</button>
        <Canvas style={{ width: "45vw", height: "50vh" }}>
          {/* /////////////////////////////////////////////////////////////// */}

          <PerspectiveCamera makeDefault position={[-1, 1, 15]} />
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
          />
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <pointLight intensity={0.3} position={[0, 5, -20]} visible={true} />

          {segmentArray.map((segment, index) => {
            return (
              <AnimBox
                key={index}
                boxPositionCoords={[
                  [index * 5, 0, 0],
                  [index * 5, 0, 0],
                ]}
                colour={[segment.segmentColour, segment.segmentColour]}
                boxScale={[
                  [
                    Math.cbrt(segment.percentageNum),
                    Math.cbrt(segment.percentageNum),
                    Math.cbrt(segment.percentageNum),
                  ],
                  [
                    Math.sqrt(segment.percentageNum) / 2,
                    Math.sqrt(segment.percentageNum) / 2,
                    1,
                  ],
                ]}
                text1Content={String(index + 1)}
                text2Content={String(segment.percentageNum)}
              />
            );
          })}
        </Canvas>
      </div>
    </div>
  );
}

export default AnimShowCanvas;
