import { FunctionComponent, useContext, useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { Modal, Button } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { scaleLinear } from "d3-scale";

import { userStoreContext } from "../store/StoreContexts";
import { Metrics } from "../components/DemographicSelector";

let demographicData = require("../data/demographicData.json");
let dieselData = require("../data/dieselPrice.json");
let electricityData = require("../data/electricityPrices.json");
let gasData = require("../data/gasolinePrice.json");
let policyData = require("../data/policies.json");
let evSalesData = require("../data/evSalesPercentage.json");

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

type demographicDataType = {
  Country: string;
  Region: string;
  Population: string;
  "Area (sq. mi.)": string;
  "Pop. Density (per sq. mi.)": string;
  "Coastline (coast/area ratio)": string;
  "Net migration": string;
  "Infant mortality (per 1000 births)": string;
  "GDP ($ per capita)": string;
  "Literacy (%)": string;
  "Phones (per 1000)": string;
  "Arable (%)": string;
  "Crops (%)": string;
  "Other (%)": string;
  Climate: string;
  Birthrate: string;
  Deathrate: string;
  Agriculture: string;
  Industry: string;
  Service: string;
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
  dataMap.set("EV_ADOPTION", evSalesData);

  const [showModal, setShowModal] = useState(false);

  let demographics: demographicDataType[] = demographicData;
  console.log();

  let data = dataMap.get(userStore.selectedMetric);
  let arr = Object.values(data) as any;
  let DOMAIN_MIN = Math.min(...arr);
  let DOMAIN_MAX = Math.max(...arr);
  userStore.setMetricDomain(DOMAIN_MIN.toString(), DOMAIN_MAX.toString());

  const setColour = (geo: geoObject): string => {
    if (geo.properties.name === userStore.selectedCountry) {
      return "#4287f5";
    }

    if (userStore.selectedMetric) {
      const colorScale = scaleLinear<string>()
        .domain([DOMAIN_MIN, DOMAIN_MAX])
        .range(["#fcfaf7", "#fa9907"]);

      return Object.keys(data).find((key) => key === geo.properties.name)
        ? colorScale(data[geo.properties.name])
        : "#F5F4F6";
    }
    return "#F5F4F6";
  };

  return (
    <>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{userStore.selectedCountry}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {Object.entries(
            demographics.filter(
              (country) => country.Country == userStore.selectedCountry
            )[0] ?? { "Data not available": "for this country" }
          )
            .filter(
              ([key]) =>
                key === "Area (sq. mi.)" ||
                key === "Pop. Density (per sq. mi.)" ||
                key === "GDP ($ per capita)" ||
                key === "Literacy (%)" ||
                key === "Population"
            )
            .map(([key, value]) => (
              <div>
                <h6 className="font-weight-bold">{key}:</h6>
                <p className="font-weight-bold">{value}</p>
              </div>
            ))}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

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
                  setShowModal(!showModal);
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
