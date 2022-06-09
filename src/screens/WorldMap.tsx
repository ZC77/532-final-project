import React, { FunctionComponent, useContext } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { observer } from "mobx-react-lite";
import { userStoreContext } from "../store/StoreContexts";

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

  const setColour = (geo: geoObject): string => {
    return userStore.selectedCountry === geo.properties.name ? "blue" : "grey";
  };

  return (
    <div className="w-85 mx-auto">
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
                  console.log(userStore.selectedCountry);
                }}
                style={{
                  default: {
                    fill: "#D6D6DA",
                    outline: "none",
                  },
                  hover: {
                    fill: "#F53",
                    outline: "none",
                  },
                  pressed: {
                    fill: "#F53",
                    outline: "none",
                  },
                }}
              />
            ))
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
};

export default observer(WorldMap);
