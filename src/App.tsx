import ReactTooltip from "react-tooltip";
import { useState } from "react";

import Header from "./components/Header";
import WorldMap from "./screens/WorldMap";
import DemographicSelector from "./components/DemographicSelector";

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
    </div>
  );
}

export default App;
