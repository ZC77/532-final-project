import { FunctionComponent, useContext } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { observer } from "mobx-react-lite";
import { scaleLinear } from "d3-scale";
import ReactTooltip from "react-tooltip";

import { userStoreContext } from "../store/StoreContexts";
import { Metrics } from "../components/DemographicSelector";

let demographicData = require("../data/demographicData.json");
let dieselData = require("../data/dieselPrice.json");
let electricityData = require("../data/electricityPrices.json");
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

type worldMapProps = {
  setTooltipContent: React.Dispatch<React.SetStateAction<string>>;
};

const WorldMap: FunctionComponent<worldMapProps> = ({ setTooltipContent }) => {
  const userStore = useContext(userStoreContext);
  const geoUrl =
    "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json";

  // Map constants to their data
  const dataMap = new Map<Metrics, any>();
  dataMap.set("ELECTRICITY", electricityData);
  dataMap.set("DIESEL", dieselData);
  dataMap.set("GAS", gasData);

  let data = dataMap.get(userStore.selectedMetric);
  let arr = Object.values(data) as any;
  let DOMAIN_MIN = Math.min(...arr);
  let DOMAIN_MAX = Math.max(...arr);
  userStore.setMetricDomain(DOMAIN_MIN.toString(), DOMAIN_MAX.toString());

  const setColour = (geo: geoObject): string => {
    if (userStore.selectedMetric) {
      const colorScale = scaleLinear<string>()
        .domain([DOMAIN_MIN, DOMAIN_MAX])
        .range(["#fcead2", "#f79716"]);

      return Object.keys(data).find((key) => key === geo.properties.name)
        ? colorScale(data[geo.properties.name])
        : "#F5F4F6";
    }
    return "#F5F4F6";
  };

  return (
    <>
      <ComposableMap data-tip="" width={1000} height={500}>
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
                onMouseEnter={() => {
                  setTooltipContent(
                    `${geo.properties.name} - ${
                      data[geo.properties.name] ?? "No data collected"
                    }`
                  );
                }}
                onMouseLeave={() => {
                  setTooltipContent("");
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
