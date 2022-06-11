import axios from "axios";
import React, { useEffect, useState } from "react";
import AnimShowCanvas from "./AnimShowCanvas";
import "../Components/CSS_Files/DataBreakDown.css";

export function createBreakdownOfMetorData(responseData) {
  // create variable that will be enriched and returned
  const meteorCountObj = {
    countOver1000g: 0,
    countUnder1000g: 0,
    totalMeteorCount: 0,
    percentageUnder1000g: 0,
    percentageOver1000g: 0,
    segmentArray: [],
  };
  // loop through API response and count total entries and number of each cateogry
  for (let i = 0; i < responseData.length; i++) {
    if (responseData[i].mass < 1000) {
      meteorCountObj.countUnder1000g += 1;
      meteorCountObj.totalMeteorCount += 1;
    } else {
      meteorCountObj.countOver1000g += 1;
      meteorCountObj.totalMeteorCount += 1;
    }
  }
  // get percentages of each category from counts and update object to return
  meteorCountObj.percentageUnder1000g = Math.round(
    (meteorCountObj.countUnder1000g / meteorCountObj.totalMeteorCount) * 100
  );

  meteorCountObj.percentageOver1000g = Math.round(
    (meteorCountObj.countOver1000g / meteorCountObj.totalMeteorCount) * 100
  );

  // create updated sugment array using percentages and update object to return
  const updatedSegmentArray = [
    {
      percentageNum: meteorCountObj.percentageUnder1000g,
      segmentColour: "#276CB2",
      segmentLabel: "Meteors under 1000g",
    },
    {
      percentageNum: meteorCountObj.percentageOver1000g,
      segmentColour: "#7098BF",
      segmentLabel: "Meteors over 1000g",
    },
  ];

  meteorCountObj.segmentArray = updatedSegmentArray;

  return meteorCountObj;
}

export function MeteorData({ setMainMenuSelection }) {
  const [loading, setLoading] = useState(true);
  const [meteorStatsObj, setMeteorStatsObj] = useState({});
  const [segmentArray, setSegmentArray] = useState([]);

  useEffect(() => {
    //get API reponse
    axios
      .get("https://data.nasa.gov/resource/gh4g-9sfh.json")
      // create breakdown object update states
      .then((response) => {
        const processedMeteorData = createBreakdownOfMetorData(response.data);
        setMeteorStatsObj(processedMeteorData);
        setSegmentArray(processedMeteorData.segmentArray);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  if (loading !== true) {
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
          <h2>NASA recordered meteors broken down by mass</h2>
          <h4>{meteorStatsObj.totalMeteorCount} Meteors returned</h4>
          <p>
            {meteorStatsObj.countOver1000g} Meteors over 1000g:{" "}
            {meteorStatsObj.percentageOver1000g}%
          </p>
          <p>
            {meteorStatsObj.countUnder1000g} Meteors under 1000g:{" "}
            {meteorStatsObj.percentageUnder1000g}%
          </p>
        </div>
        <React.Suspense fallback={<div>Loading... </div>}>
          <AnimShowCanvas segmentArray={segmentArray} />
        </React.Suspense>
      </>
    );
  } else {
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
          <h1>Loading...</h1>
        </div>
      </>
    );
  }
}
