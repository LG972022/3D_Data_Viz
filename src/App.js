import React, { useState } from "react";
import "./App.css";
import DistributionSetting from "./Components/DistributionSetting";
import { MainMenu } from "./Components/MainMenu";
import { MeteorData } from "./Components/MeteorData";
import { NYTData } from "./Components/NYTData";

function App() {
  const [mainMenuSelection, setMainMenuSelection] = useState(0);
  if (mainMenuSelection === 0) {
    return (
      <div className="App">
        <header className="App-header">
          <MainMenu setMainMenuSelection={setMainMenuSelection} />
        </header>
      </div>
    );
  }
  if (mainMenuSelection === 1) {
    return (
      <div className="App">
        <header className="App-header">
          <NYTData setMainMenuSelection={setMainMenuSelection} />
        </header>
      </div>
    );
  }
  if (mainMenuSelection === 2) {
    return (
      <div className="App">
        <header className="App-header">
          <MeteorData setMainMenuSelection={setMainMenuSelection} />
        </header>
      </div>
    );
  } else {
    return (
      <div className="App">
        <header className="App-header">
          <DistributionSetting setMainMenuSelection={setMainMenuSelection} />
        </header>
      </div>
    );
  }
}

export default App;
