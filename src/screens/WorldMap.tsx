import { FunctionComponent, useContext } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { observer } from "mobx-react-lite";
import { scaleLinear } from "d3-scale";

import { userStoreContext } from "../store/StoreContexts";
import { Metrics } from "../components/DemographicSelector";

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

const WorldMap: FunctionComponent = () => {
  const userStore = useContext(userStoreContext);
  const geoUrl =
    "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json";

  const dataMap = new Map<Metrics, any>();
  dataMap.set("ELECTRICITY", electrictyData);
  dataMap.set("DIESEL", dieselData);
  dataMap.set("GAS", gasData);

  const setColour = (geo: geoObject): string => {
    if (userStore.selectedMetric) {
      let data = dataMap.get(userStore.selectedMetric);
      let arr = Object.values(data) as any;

      const colorScale = scaleLinear<string>()
        .domain([Math.min(...arr), Math.max(...arr)])
        .range(["#fcead2", "#f79716"]);

      return Object.keys(data).find((key) => key === geo.properties.name)
        ? colorScale(data[geo.properties.name])
        : "#F5F4F6";
    }
    return "#F5F4F6";
  };

  console.log(userStore.selectedMetric);

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
