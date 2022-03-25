import { useState } from "react";
import AnimShowCanvas from "./AnimShowCanvas";

function DistributionSetting() {
  const [segmentArray, setSegmentArray] = useState([]);
  const [formArray, setFormArray] = useState([]);
  const [totalWillExceedWarning, setTotalWillExceedWarning] = useState(false);
  const [unsubmittedFormExists, setUnsubmittedFormExists] = useState(false);
  const [hyperColour, setHyperColour] = useState("#3a76dd");

  function addToFormArr(thing) {
    if (unsubmittedFormExists === false) {
      setFormArray((currentFormArray) => {
        const updatedFormArr = [...currentFormArray];
        updatedFormArr.push(thing);
        return updatedFormArr;
      });
      setUnsubmittedFormExists(true);
      setHyperColour((currentHyperColour) => {
        if (currentHyperColour === "#ff5ca4") {
          return "#98eccc";
        } else if (currentHyperColour === "#98eccc") {
          return "#3a76dd";
        } else if (currentHyperColour === "#3a76dd") {
          return "#ff5ca4";
        }
      });
    }
  }

  function addToSegmentArray(segment) {
    setSegmentArray((currentSegmentArray) => {
      const updatedSegmentArr = [...currentSegmentArray];
      updatedSegmentArr.push(segment);
      return updatedSegmentArr;
    });
  }

  function generateClassName__AddSegmentButton(input) {
    if (unsubmittedFormExists === true) {
      return "Add_Segment_Button__Suspended";
    } else if (unsubmittedFormExists === false) {
      return "Add_Segment_Button";
    }
  }

  function generateClassName__segment_form__Delete_Button(index) {
    if (index === formArray.length - 1) {
      return "segment_form__Delete_Button";
    } else if (unsubmittedFormExists === true) {
      return "segment_form__Delete_Button__Suspended";
    } else {
      return "segment_form__Delete_Button";
    }
  }

  function removeFromAllArr(index) {
    if (unsubmittedFormExists === false) {
      setFormArray((currentFormArray) => {
        const updatedFormArr = [...currentFormArray];
        updatedFormArr.splice(index, 1);
        return updatedFormArr;
      });
      setSegmentArray((currentSegmentArray) => {
        const updatedSegmentArr = [...currentSegmentArray];
        updatedSegmentArr.splice(index, 1);
        return updatedSegmentArr;
      });
    }
    if (index === formArray.length - 1) {
      setFormArray((currentFormArray) => {
        const updatedFormArr = [...currentFormArray];
        updatedFormArr.splice(index, 1);
        return updatedFormArr;
      });
      setUnsubmittedFormExists(false);
    }
  }

  function checkCurrentTotal() {
    let totalVar = 0;
    for (let x = 0; x < segmentArray.length; x++) {
      totalVar += segmentArray[x].percentageNum;
    }
    return totalVar;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (Number(event.target[0].value) === 0) {
      return;
    } else if (checkCurrentTotal() + Number(event.target[0].value) > 100) {
      setTotalWillExceedWarning(true);
    } else if (checkCurrentTotal() + Number(event.target[0].value) <= 100) {
      setTotalWillExceedWarning(false);
      event.target.childNodes[1].className = "segment_form__Input__USED";
      event.target.className = "segment_form__Used";
      addToSegmentArray({
        percentageNum: Number(event.target[0].value),
        segmentColour: event.target[1].value,
      });
      setUnsubmittedFormExists(false);
    }
  }

  function setNextHyperColour() {
    setHyperColour((currentHyperColour) => {
      if (currentHyperColour === "#ff5ca4") {
        return "#98eccc";
      } else if (currentHyperColour === "#98eccc") {
        return "#3a76dd";
      } else if (currentHyperColour === "#3a76dd") {
        return "#ff5ca4";
      }
    });
  }

  return (
    <>
      <div className="distributionSetting">
        <div className="distributionSetting__Total__Add__Container">
          <p className="distributionSetting__Total__Add__Container__Current_Total">
            Total: {checkCurrentTotal()}
          </p>
          <button
            className={generateClassName__AddSegmentButton()}
            onClick={() => {
              addToFormArr({ distValue: 100 });
            }}
          >
            Add New Segment
          </button>
        </div>
        {totalWillExceedWarning === true && (
          <p>Total Percentage Must Not Exceed 100%</p>
        )}
        {formArray.map((segment, index) => {
          return (
            <div key={index} className="segment_form__OUTER__container">
              <div className="segment_form__container">
                <form
                  name="form"
                  onSubmit={handleSubmit}
                  className="segment_form"
                >
                  <label className="segment_form__Label">
                    Metric Percentage {index + 1}
                  </label>
                  <input
                    type="number"
                    className="segment_form__Input"
                    name="Metric_1"
                    max={100}
                    min={1}
                  />
                  <input
                    type="color"
                    className="segment_form__color_Picker"
                    defaultValue={hyperColour}
                  />
                  <input
                    type="submit"
                    value="Submit"
                    className="segment_form__Submit"
                  />
                </form>

                <label className="segment_form__Label">
                  Percentage:
                  {segmentArray[index] === undefined
                    ? " TBC"
                    : "  " + segmentArray[index].percentageNum + "%"}
                </label>
              </div>
              <button
                onClick={() => {
                  removeFromAllArr(index);
                }}
                className={generateClassName__segment_form__Delete_Button(
                  index
                )}
              >
                X
              </button>
            </div>
          );
        })}
      </div>
      <div>
        <AnimShowCanvas segmentArray={segmentArray} />
      </div>
    </>
  );
}

export default DistributionSetting;

// setTotal((currentTotal) => {
//       let totalVar = 0;
//       for (let x = 0; x < segmentArray.length; x++) {
//         totalVar += segmentArray[x];
//         console.log(totalVar);
//       }
//       // console.log(totalVar);
//       return totalVar;
