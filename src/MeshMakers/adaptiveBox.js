import React, { useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useSpring, animated, config } from "@react-spring/three";

function AnimBox(props) {
  const myMesh = React.useRef();
  const [active, setActive] = useState(true);

  const spring = useSpring({
    scale: active ? props.boxScale[0] : props.boxScale[1],
    position: active ? props.positionCoords[0] : props.positionCoords[1],
    color: active ? props.colour[0] : props.colour[1],
    opacity: active ? 1 : 0.1,
    config: config.wobbly,
  });

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
      position={spring.position}
      scale={spring.scale}
      onClick={() => {
        setActive(!active);
      }}
    >
      <boxGeometry />

      <animated.meshLambertMaterial
        opacity={spring.opacity}
        color={spring.color}
      />
    </animated.mesh>
  );
}

export default AnimBox;
