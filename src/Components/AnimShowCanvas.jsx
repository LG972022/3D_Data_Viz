import React, { useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, PerspectiveCamera } from "@react-three/drei";
import { useSpring, animated, config } from "@react-spring/three";

import AnimBox from "../MeshMakers/adaptiveBox";

function AnimShowCanvas({ segmentArray }) {
  const [modeSelected, setModeSelected] = useState("3D");

  function switchModeSelected(event) {
    setModeSelected((currentModeSelected) => {
      if (currentModeSelected === "3D") {
        event.target.className = "Switch_Mode_Button__2_5D";
        return "2.5D";
      } else if (currentModeSelected === "2.5D") {
        event.target.className = "Switch_Mode_Button__3D";
        return "3D";
      }
    });
  }

  return (
    <div className="Canvas_Container">
      <div className="Canvas_Background">
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
          {/* /////////////////////////////////////////////////////////////// */}
          {/* <AnimBox
            positionCoords={[0 * 5.5, 0, 0]}
            rotation={[100, 160]}
            colour={["yellow", "blue"]}
            boxScale={[
              [Math.cbrt(70), Math.cbrt(70), Math.cbrt(70)],
              [Math.sqrt(70) / 2, Math.sqrt(70) / 2, 1],
            ]}
          /> */}
          <AnimBox
            positionCoords={[
              [0 * 5, 0, 0],
              [0 * 5.5, 0, 0],
            ]}
            colour={["#6246ea", "#e45858"]}
            boxScale={[
              [Math.cbrt(40), Math.cbrt(40), Math.cbrt(40)],
              [Math.sqrt(40) / 2, Math.sqrt(40) / 2, 1],
            ]}
          />
        </Canvas>
      </div>
    </div>
  );
}

export default AnimShowCanvas;
