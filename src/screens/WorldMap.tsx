import { FunctionComponent, useContext } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { observer } from "mobx-react-lite";
import { scaleLinear } from "d3-scale";

import { userStoreContext } from "../store/StoreContexts";

let demographicData = require("../data/demographicData.json");
let dieselData = require("../data/dieselPrice.json");
let electrictyData = require("../data/electricityPrices.json");
let gasData = require("../data/gasolinePrice.json");
let policyData = require("../data/policies.json");

type geoObject = {
  geometry?: {
    type: string;
    coordinates: any;
  };
  id: number;
  properties: {
    name: string;
  };
  rsmKey: any;
  svgPath: any;
  type: String;
};

const colorScale = scaleLinear<string>()
  .domain([0, 3])
  .range(["#fcead2", "#f79716"]);

const WorldMap: FunctionComponent = () => {
  const userStore = useContext(userStoreContext);
  const geoUrl =
    "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json";

  const setColour = (geo: geoObject): string => {
    return Object.keys(dieselData).find((key) => key == geo.properties.name)
      ? colorScale(dieselData[geo.properties.name])
      : "#F5F4F6";
  };

  return (
    <>
      <ComposableMap width={1000} height={500}>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo: geoObject) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill={setColour(geo)}
                onMouseDown={() => {
                  userStore.selectCountry(geo.properties.name);
                  console.log(colorScale(dieselData[geo.properties.name]));
                }}
                style={{
                  hover: {
                    fill: "#4287f5",
                    outline: "none",
                  },
                }}
              />
            ))
          }
        </Geographies>
      </ComposableMap>
      <h5 className="text-center mb-4">
        {"Selected country: " + userStore.selectedCountry}
      </h5>
    </>
  );
};

export default observer(WorldMap);
