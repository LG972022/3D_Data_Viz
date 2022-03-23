import React, { useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, PerspectiveCamera } from "@react-three/drei";
import { useSpring, animated, config } from "@react-spring/three";
import Blue from "../Colour_Imgs/Blue.png";
import Pink from "../Colour_Imgs/Pink.png";
import Green from "../Colour_Imgs/Green.png";

function ShowCanvas({ segmentArray }) {
  // function MakeBox(props) {
  //   return (
  //     <mesh position={props.positionCoords} scale={props.scale}>
  //       <boxGeometry scale={props.scale} />
  //       <meshStandardMaterial color={props.colour} />
  //     </mesh>
  //     // <Box position={props.positionCoords} scale={props.scale}>s
  //     //   <meshStandardMaterial color={props.colour} />
  //     // </Box>
  //   );
  // }

  function AdaptiveBox(props) {
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

    const myMesh = React.useRef();

    const { scale } = useSpring({
      scale: modeSelected === "3D" ? props.scale[0] : props.scale[1],
      config: config.wobbly,
    });

    const { position } = useSpring({
      position:
        modeSelected === "3D"
          ? props.positionCoords[0]
          : props.positionCoords[1],
      config: config.wobbly,
    });

    return (
      <animated.mesh
        position={position}
        scale={scale}
        ref={myMesh}
        onClick={switchModeSelected}
      >
        <boxGeometry />
        <meshStandardMaterial color={props.colour} />
      </animated.mesh>
    );
  }

  return (
    <div className="Canvas_Container">
      <div className="Canvas_Background">
        <Canvas style={{ width: "45vw", height: "50vh" }}>
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
              <mesh key={index}>
                <AdaptiveBox
                  positionCoords={[
                    [index * 5.5, 0, 0],
                    [index * 5, 0, 0],
                  ]}
                  colour={segment.segmentColour}
                  scale={[
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
                />
                <Text
                  scale={[3, 3, 3]}
                  color="black" // default
                  anchorX="center" // default
                  anchorY="middle" // default
                  position={[
                    [index * 5.5, 0, 2.5],
                    [index * 5, 0, 0.75],
                  ]}
                >
                  Metric {index}
                </Text>
                <Text
                  scale={[3, 3, 3]}
                  color="black" // default
                  anchorX="center" // default
                  anchorY="middle" // default
                  position={[
                    [index * 5.5, -0.3, 2.5],
                    [index * 5, -0.3, 0.75],
                  ]}
                >
                  {segment.percentageNum + "%"}
                </Text>
              </mesh>
            );
          })}
        </Canvas>
      </div>
      <div className="legend">
        <img src={Pink} alt="Pink" className="legend_colour_pick" />
        <p className="legend_colour_text">Metric 1</p>
        <img src={Green} alt="Green" className="legend_colour_pick" />
        <p className="legend_colour_text">Metric 2</p>
        <img src={Blue} alt="Blue" className="legend_colour_pick" />
        <p className="legend_colour_text">Metric 3</p>
      </div>
    </div>
  );
}

export default ShowCanvas;
