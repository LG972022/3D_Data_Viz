import axios from "axios";
import React, { useEffect, useState } from "react";
import AnimShowCanvas from "./AnimShowCanvas";
import "../Components/CSS_Files/DataBreakDown.css";

export function NYTData({ setMainMenuSelection }) {
  const [loading, setLoading] = useState(true);
  const [NYTStatsObj, setNYTStatsObj] = useState({});
  const [segmentArray, setSegmentArray] = useState([]);

  function createBreakdownOfNYTData(responseData) {
    const NYTCountObj = {
      countTitleOneWord: 0,
      countTitleTwotoThreeWord: 0,
      countTitleOverThreeWord: 0,

      totalTitleCount: 0,

      percentageTitleOneWord: 0,
      percentageTitleTwotoThreeWord: 0,
      percentageTitleOverThreeWord: 0,
    };

    for (let i = 0; i < responseData.length; i++) {
      const nameWordsArr = responseData[i].title.split(" ");
      const numWordsInTitle = nameWordsArr.length;

      if (numWordsInTitle > 3) {
        NYTCountObj.countTitleOverThreeWord += 1;
        NYTCountObj.totalTitleCount += 1;
      } else if (numWordsInTitle === 1) {
        NYTCountObj.countTitleOneWord += 1;
        NYTCountObj.totalTitleCount += 1;
      } else if (numWordsInTitle > 1 && numWordsInTitle < 4) {
        NYTCountObj.countTitleTwotoThreeWord += 1;
        NYTCountObj.totalTitleCount += 1;
      }
    }

    NYTCountObj.percentageTitleOneWord = Math.round(
      (NYTCountObj.countTitleOneWord / NYTCountObj.totalTitleCount) * 100
    );

    NYTCountObj.percentageTitleTwotoThreeWord = Math.round(
      (NYTCountObj.countTitleTwotoThreeWord / NYTCountObj.totalTitleCount) * 100
    );

    NYTCountObj.percentageTitleOverThreeWord = Math.round(
      (NYTCountObj.countTitleOverThreeWord / NYTCountObj.totalTitleCount) * 100
    );

    const updatedSegmentArray = [
      {
        percentageNum: NYTCountObj.percentageTitleOneWord,
        segmentColour: "#43C41D",
        segmentLabel: "One Words",
      },
      {
        percentageNum: NYTCountObj.percentageTitleTwotoThreeWord,
        segmentColour: "#EE850F",
        segmentLabel: "Two - Three Words",
      },
      {
        percentageNum: NYTCountObj.percentageTitleOverThreeWord,
        segmentColour: "#0FBEEE",
        segmentLabel: "Four or more Words",
      },
    ];
    setNYTStatsObj(NYTCountObj);
    setSegmentArray(updatedSegmentArray);
  }

  useEffect(() => {
    axios
      .get(
        `https://api.nytimes.com/svc/books/v3/lists/full-overview.json?api-key=${process.env.REACT_APP_NYT_API_KEY}`
      )
      .then((response) => {
        createBreakdownOfNYTData(response.data.results.lists[0].books);
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
          <h2>
            Recent New York Times best sellers broken down by number of words in
            the title
          </h2>
          <h4>{NYTStatsObj.totalTitleCount} Books returned</h4>
          <p>
            {NYTStatsObj.countTitleOneWord} Books with one word Titles:{" "}
            {NYTStatsObj.percentageTitleOneWord}%
          </p>
          <p>
            {NYTStatsObj.countTitleTwotoThreeWord} Books with two or three word
            Titles: {NYTStatsObj.percentageTitleTwotoThreeWord}%
          </p>
          <p>
            {NYTStatsObj.countTitleOverThreeWord} Books with four or more word
            Titles: {NYTStatsObj.percentageTitleOverThreeWord}%
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
