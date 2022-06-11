import { animated, config, useSpring } from "@react-spring/three";
import { Text } from "@react-three/drei";
import React, { useEffect, useState } from "react";

function AdaptiveBox(props) {
  const myMesh = React.useRef();
  const [inIntro, setInIntro] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setInIntro(false);
    }, 900);
  }, []);

  const spring = useSpring({
    scale: props.in3DMode ? props.boxScale[0] : props.boxScale[1],
    boxPosition: props.in3DMode
      ? props.boxPositionCoords[0]
      : props.boxPositionCoords[1],
    color: props.in3DMode ? props.colour[0] : props.colour[1],
    opacity: props.in3DMode ? 1 : 0.1,
    config: config.wobbly,
  });

  const spawnSpring = useSpring({
    to: { scale: props.in3DMode ? props.boxScale[0] : props.boxScale[1] },
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

  return (
    <animated.mesh
      ref={myMesh}
      position={spring.boxPosition}
      scale={getCurrentSpring().scale}
    >
      <boxGeometry />
      <animated.meshLambertMaterial
        opacity={spring.opacity}
        color={spring.color}
      />

      <Text
        scale={[1.5, 1.5, 1.5]}
        color="black" // default
        position={[0, 0.05, 0.6]}
      >
        {props.text1Content}
      </Text>
      <Text
        scale={[1.5, 1.5, 1.5]}
        color="black" // default
        position={[0, -0.1, 0.6]}
      >
        {props.text2Content + "%"}
      </Text>
    </animated.mesh>
  );
}

export default AdaptiveBox;
