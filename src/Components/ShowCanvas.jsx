import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Blue from "../Colour_Imgs/Blue.png";
import Pink from "../Colour_Imgs/Pink.png";
import Green from "../Colour_Imgs/Green.png";

function ShowCanvas({ segmentArray, modeSelected }) {
  // console.log(segmentArray);
  // console.log(modeSelected);

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
        <Canvas
          style={{ width: "25vw", height: "50vh" }}
          camera={{ zoom: 12, position: [0, 10, -50] }}
        >
          {/* <PerspectiveCamera makeDefault position={[-1, 1, 5]} /> */}
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
          />
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <pointLight intensity={0.3} position={[0, 5, -20]} visible={true} />
          {/* <ambientLight intensity={0.3} /> */}

          <MakeBox
            positionCoords={[-1, 0, 0]}
            // key={index}
            colour="#3A76DD"
            scale={[Math.cbrt(10), Math.cbrt(10), Math.cbrt(10)]}
          />
          <MakeBox
            positionCoords={[-5, 0, 0]}
            // key={index}
            colour="#3A76DD"
            scale={[Math.cbrt(20), Math.cbrt(20), Math.cbrt(20)]}
          />
          <MakeBox
            positionCoords={[-10, 0, 0]}
            // key={index}
            colour="#3A76DD"
            scale={[Math.cbrt(30), Math.cbrt(30), Math.cbrt(30)]}
          />
          <MakeBox
            positionCoords={[-15, 0, 0]}
            // key={index}
            colour="#3A76DD"
            scale={[Math.cbrt(40), Math.cbrt(40), Math.cbrt(40)]}
          />
          <MakeBox
            positionCoords={[-20, 0, 0]}
            // key={index}
            colour="#3A76DD"
            scale={[Math.cbrt(50), Math.cbrt(50), Math.cbrt(50)]}
          />
          <MakeBox
            positionCoords={[-25, 0, 0]}
            // key={index}
            colour="#3A76DD"
            scale={[Math.cbrt(99), Math.cbrt(99), Math.cbrt(99)]}
          />
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
// <MakeBox
//   positionCoords={[1, 0, 0]}
//   colour="#3A76DD"
//   scale={[1, 1, 1]}
// />
// <MakeBox
//   positionCoords={[-1, 0, 0]}
//   colour="#58e0af"
//   scale={[1, 1, 1]}
// />
// <MakeBox
//   positionCoords={[-2, 0, 0]}
//   colour="#F85AA3"
//   scale={[1, 1, 1]}
// />

/* {segmentArray.map((segment, index) => {
            return (
              <MakeBox
                positionCoords={[segment / 100, 0, 0]}
                key={index}
                colour="#3A76DD"
                scale={[segment / 100, segment / 100, segment / 100]}
              />
            );
          })} */
