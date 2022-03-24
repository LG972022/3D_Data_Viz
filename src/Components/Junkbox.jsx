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

///////////// WORKING SPRINGS /////////////////////

// const scaleSpring = useSpring({
//   scale: active ? props.boxScale[0] : props.boxScale[1],
//   config: config.wobbly,
// });

// const positionSpring = useSpring({
//   position: active ? props.positionCoords[0] : props.positionCoords[1],
//   config: config.wobbly,
// });

// const rotationSpring = useSpring({
//   rotation: active ? [0, 0, 0] : [1, 5, 3],
//   config: config.wobbly,
// });

// const spring = useSpring({
//   scale: modeSelected === "3D" ? props.boxScale[0] : props.boxScale[1],
//   boxPosition:
//     modeSelected === "3D"
//       ? props.boxPositionCoords[0]
//       : props.boxPositionCoords[1],
//   color: modeSelected === "3D" ? props.colour[0] : props.colour[1],
//   opacity: modeSelected === "3D" ? 1 : 0.1,
//   config: config.wobbly,
// });

///////////////////OLD SWITCH MODE FUNCTION ///////////////////////////

//   function switchModeSelected(event) {
//     setModeSelected((currentModeSelected) => {
//       if (currentModeSelected === "3D") {
//         event.target.className = "Switch_Mode_Button__2_5D";
//         return "2.5D";
//       } else if (currentModeSelected === "2.5D") {
//         event.target.className = "Switch_Mode_Button__3D";
//         return "3D";
//       }
//     });
//   }
