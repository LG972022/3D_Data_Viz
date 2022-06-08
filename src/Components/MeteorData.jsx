import { useEffect, useState } from "react";
import AnimShowCanvas from "./AnimShowCanvas";
import "./DataBreakDown.css";

function MeteorData({ setMainMenuSelection }) {
  const [loading, setLoading] = useState(true);
  const [responseData, setResponseData] = useState(null);
  const [segmentArray, setSegmentArray] = useState([]);

  useEffect(() => {}, []);

  return (
    <>
      <button
        onClick={() => {
          setMainMenuSelection(0);
        }}
        className="Quit_To_Main_Menu_Button"
      >
        Return to main menu
      </button>

      <div className="Data_Break_Down_Container">
        <p>Percentage Meteors over 1000g: {50}%</p>
        <p>Percentage Meteors under 1000g: {50}%</p>
      </div>

      <AnimShowCanvas segmentArray={segmentArray} />
    </>
  );

  //   return (
  //     <>
  //       <div className="segment_form"></div>
  //       <div>
  //         <AnimShowCanvas segmentArray={segmentArray} />
  //       </div>
  //     </>
  //   );
}

export default MeteorData;
