import React, { useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useSpring, animated, config } from "@react-spring/three";

function AnimBox(props) {
  const myMesh = React.useRef();
  const [active, setActive] = useState(true);

  const scaleSpring = useSpring({
    scale: active ? props.boxScale[0] : props.boxScale[1],
    config: config.wobbly,
  });

  const positionSpring = useSpring({
    position: active ? props.positionCoords[0] : props.positionCoords[1],
    config: config.wobbly,
  });

  // const colourSpring = useSpring({
  //   colour: active ? props.positionCoords[0] : props.positionCoords[1],
  //   config: config.wobbly,
  // });

  // const [{ rotation }, setSpring] = useSpring(() => ({
  //   rotation: [0, 0, 0],
  // }));

  //   useFrame(({ clock }) => {
  //     const a = clock.getElapsedTime();
  //     myMesh.current.rotation.x = a;
  //   });

  return (
    <animated.mesh
      position={positionSpring.position}
      scale={scaleSpring.scale}
      // rotation={[0, 1, 1]}
      ref={myMesh}
      onClick={() => {
        console.log("click");
        setActive(!active);
      }}
    >
      <boxGeometry />
      <meshStandardMaterial color={props.colour[1]} />
    </animated.mesh>
  );
}

export default AnimBox;
