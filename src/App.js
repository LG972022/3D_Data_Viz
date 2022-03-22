import logo from "./logo.svg";
import React from "react";
import "./App.css";
import DistributionSetting from "./Components/DistributionSetting";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <h1>Hello</h1> */}
        <React.Suspense fallback={<div>Loading... </div>}>
          <DistributionSetting />
        </React.Suspense>
      </header>
    </div>
  );
}

export default App;
