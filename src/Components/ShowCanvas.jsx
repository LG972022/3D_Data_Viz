import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Text,
  PerspectiveCamera,
  Segment,
} from "@react-three/drei";
import Blue from "../Colour_Imgs/Blue.png";
import Pink from "../Colour_Imgs/Pink.png";
import Green from "../Colour_Imgs/Green.png";

function ShowCanvas({ segmentArray, modeSelected }) {
  console.log(segmentArray);
  console.log(modeSelected);

  function MakeBox(props) {
    return (
      <mesh position={props.positionCoords} scale={props.scale}>
        <boxGeometry scale={props.scale} />
        <meshStandardMaterial color={props.colour} />
      </mesh>
      // <Box position={props.positionCoords} scale={props.scale}>s
      //   <meshStandardMaterial color={props.colour} />
      // </Box>
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
                <MakeBox
                  positionCoords={[index * 5, 0, 0]}
                  colour={segment.segmentColour}
                  scale={[
                    Math.cbrt(segment.percentageNum),
                    Math.cbrt(segment.percentageNum),
                    Math.cbrt(segment.percentageNum),
                  ]}
                />
                <Text
                  scale={[3, 3, 3]}
                  color="black" // default
                  anchorX="center" // default
                  anchorY="middle" // default
                  position={[index * 5, 0, 2.5]}
                >
                  Metric {index}
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