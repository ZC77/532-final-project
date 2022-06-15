import ReactTooltip from "react-tooltip";
import { useState } from "react";

import Header from "./components/Header";
import WorldMap from "./screens/WorldMap";
import DemographicSelector from "./components/DemographicSelector";
import Comparison from "./components/Comparison";

function App() {
  const [content, setContent] = useState("");
  return (
    <div>
      <Header></Header>
      <div>
        <WorldMap setTooltipContent={setContent}></WorldMap>
        <ReactTooltip>{content}</ReactTooltip>
      </div>
      <DemographicSelector></DemographicSelector>
      <Comparison></Comparison>
    </div>
  );
}

export default App;
