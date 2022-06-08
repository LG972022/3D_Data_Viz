import logo from "./logo.svg";
import React, { useState } from "react";
import "./App.css";
import DistributionSetting from "./Components/DistributionSetting";
import MainMenu from "./Components/MainMenu";
import MeteorData from "./Components/MeteorData";

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
          <MeteorData setMainMenuSelection={setMainMenuSelection} />
        </header>
      </div>
    );
  } else {
    return (
      <div className="App">
        <header className="App-header">
          <React.Suspense fallback={<div>Loading... </div>}>
            <DistributionSetting setMainMenuSelection={setMainMenuSelection} />
          </React.Suspense>
        </header>
      </div>
    );
  }
}

export default App;
