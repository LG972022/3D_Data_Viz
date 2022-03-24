import React, { useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { useSpring, animated, config } from "@react-spring/three";

function AnimBox(props) {
  const myMesh = React.useRef();
  const [modeSelected, setModeSelected] = useState("3D");
  const [inIntro, setInIntro] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setInIntro(false);
    }, 900);
  }, []);

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

  const spring = useSpring({
    scale: modeSelected === "3D" ? props.boxScale[0] : props.boxScale[1],
    boxPosition:
      modeSelected === "3D"
        ? props.boxPositionCoords[0]
        : props.boxPositionCoords[1],
    color: modeSelected === "3D" ? props.colour[0] : props.colour[1],
    opacity: modeSelected === "3D" ? 1 : 0.1,
    config: config.wobbly,
  });

  const spawnSpring = useSpring({
    to: { scale: props.boxScale[0] },
    from: { scale: [0, 0, 0] },
    config: config.wobbly,
  });

  function getCurrentSpring() {
    if (inIntro === true) {
      return spawnSpring;
    } else if (inIntro === false) {
      return spring;
    }
  }

  // return (
  //   <mesh
  //     position={props.positionCoords[0]}
  //     scale={props.boxScale[0]}
  //     rotation={[0, 0, 0]}
  //     ref={myMesh}
  //     onClick={() => {
  //       console.log("click");
  //       setActive(!active);
  //     }}
  //   >
  //     <boxGeometry />
  //     <meshLambertMaterial color={props.colour[0]} transparent opacity={0.7} />
  //   </mesh>
  // );

  return (
    <animated.mesh
      ref={myMesh}
      position={spring.boxPosition}
      scale={getCurrentSpring().scale}
      onClick={switchModeSelected}
    >
      <boxGeometry onClick={switchModeSelected} />
      <animated.meshLambertMaterial
        opacity={spring.opacity}
        color={spring.color}
      />

      <Text
        onClick={switchModeSelected}
        scale={[1.5, 1.5, 1.5]}
        color="black" // default
        position={[0, 0.05, 0.6]}
      >
        {"Metric " + props.text1Content}
      </Text>
      <Text
        onClick={switchModeSelected}
        scale={[1.5, 1.5, 1.5]}
        color="black" // default
        position={[0, -0.1, 0.6]}
      >
        {props.text2Content + "%"}
      </Text>
    </animated.mesh>
  );
}

export default AnimBox;
