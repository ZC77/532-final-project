import Header from "./components/Header";
import WorldMap from "./screens/WorldMap";
import DemographicSelector from "./components/DemographicSelector";

function App() {
  return (
    <div>
      <Header></Header>
      <div className="mx-3">
        <WorldMap></WorldMap>
        <DemographicSelector></DemographicSelector>
      </div>
    </div>
  );
}

export default App;
