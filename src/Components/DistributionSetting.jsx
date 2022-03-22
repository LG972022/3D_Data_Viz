import { useState } from "react";
import ShowCanvas from "./ShowCanvas";

function DistributionSetting() {
  const [segmentArray, setSegmentArray] = useState([]);
  const [formArray, setFormArray] = useState([]);
  const [totalWillExceedWarning, setTotalWillExceedWarning] = useState(false);
  const [unsubmittedFormExists, setUnsubmittedFormExists] = useState(false);
  const [modeSelected, setModeSelected] = useState("3D");

  function addToFormArr(thing) {
    if (unsubmittedFormExists === false) {
      setFormArray((currentFormArray) => {
        const updatedFormArr = [...currentFormArray];
        updatedFormArr.push(thing);
        return updatedFormArr;
      });
      setUnsubmittedFormExists(true);
    }
  }

  function addToSegmentArray(segment) {
    setSegmentArray((currentSegmentArray) => {
      const updatedSegmentArr = [...currentSegmentArray];
      updatedSegmentArr.push(segment);
      return updatedSegmentArr;
    });
  }

  function generateClassName__AddSegmentButton() {
    if (unsubmittedFormExists === true) {
      return "Add_Segment_Button__Suspended";
    } else if (unsubmittedFormExists === false) {
      return "Add_Segment_Button";
    }
  }

  function generateClassName__segment_form__Delete_Button() {
    if (unsubmittedFormExists === true) {
      return "segment_form__Delete_Button__Suspended";
    } else if (unsubmittedFormExists === false) {
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
  }

  function checkCurrentTotal() {
    let totalVar = 0;
    for (let x = 0; x < segmentArray.length; x++) {
      totalVar += segmentArray[x].percentageNum;
    }
    return totalVar;
  }

  function switchModeSelected(event) {
    setModeSelected((currentModeSelected) => {
      if (currentModeSelected === "3D") {
        event.target.className = "Switch_Mode_Button__2_5D";
        return "2.5D";
      } else if (currentModeSelected === "2.5D") {
        event.target.className = "Switch_Mode_Button__3D";
        return "3D";
      }
    });
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

  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  return (
    <>
      <div className="distributionSetting">
        <p>Total: {checkCurrentTotal()}</p>
        {totalWillExceedWarning === true && (
          <p>Total Percentage Must Not Exceed 100%</p>
        )}

        <button
          className={generateClassName__AddSegmentButton()}
          onClick={() => {
            addToFormArr({ distValue: 100 });
          }}
        >
          Add New Segment
        </button>
        <button className="Switch_Mode_Button__3D" onClick={switchModeSelected}>
          {modeSelected}
        </button>
        {formArray.map((segment, index) => {
          return (
            <div className="segment_form__container" key={index}>
              <form
                name="form"
                onSubmit={handleSubmit}
                className="segment_form"
              >
                <label className="segment_form__Label">
                  Metric Percentage {index}
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
                  defaultValue={getRandomColor()}
                />
                <input
                  type="submit"
                  value="Submit"
                  className="segment_form__Submit"
                />
              </form>
              <button
                onClick={() => {
                  removeFromAllArr(index);
                }}
                className={generateClassName__segment_form__Delete_Button()}
              >
                Delete Metric
              </button>

              <label className="segment_form__Label">
                Percentage:
                {segmentArray[index] === undefined
                  ? " TBC"
                  : "  " + segmentArray[index].percentageNum + "%"}
              </label>
            </div>
          );
        })}
      </div>
      <div>
        <ShowCanvas segmentArray={segmentArray} modeSelected={modeSelected} />
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
