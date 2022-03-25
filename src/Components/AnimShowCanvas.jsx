import React, { useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, PerspectiveCamera } from "@react-three/drei";
import { useSpring, animated, config } from "@react-spring/three";

import AdaptiveBox from "../MeshMakers/adaptiveBox";

function AnimShowCanvas({ segmentArray }) {
  const [in3DMode, setIn3DMode] = useState(true);

  function toggleIn3DMode() {
    setIn3DMode(!in3DMode);
  }

  return (
    <div className="Canvas_Container">
      <div className="Canvas_Background">
        <button className="Switch_Mode_Button__3D" onClick={toggleIn3DMode}>
          {in3DMode ? "Switch to 2.5D Mode" : "Switch to 3D Mode"}
        </button>

        <Canvas style={{ width: "45vw", height: "50vh" }}>
          {/* /////////////////////////////////////////////////////////////// */}

          <PerspectiveCamera makeDefault position={[-1, 0, 15]} />

          <OrbitControls
            panSpeed={1}
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            rotateSpeed={0.7}
          />
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <pointLight intensity={0.3} position={[0, 5, -20]} visible={true} />

          {segmentArray.map((segment, index) => {
            return (
              <AdaptiveBox
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
                in3DMode={in3DMode}
              />
            );
          })}
        </Canvas>
      </div>
    </div>
  );
}

export default AnimShowCanvas;
