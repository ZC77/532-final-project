import { FunctionComponent } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

const HomeScreen: FunctionComponent = () => {
  const geoUrl =
    "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json";

  return (
    <div className="w-75 mx-auto">
      <ComposableMap>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography key={geo.rsmKey} geography={geo} />
            ))
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
};

export default HomeScreen;
