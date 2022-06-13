import { FunctionComponent, useContext } from "react";
import { Button } from "react-bootstrap";
import { observer } from "mobx-react-lite";

import { userStoreContext } from "../store/StoreContexts";

export type Metrics = "ELECTRICITY" | "GAS" | "DIESEL";

export type Demographic = {
  displayText: string;
  metric: Metrics;
};

const options: Demographic[] = [
  { displayText: "Electricity Price", metric: "ELECTRICITY" },
  { displayText: "Gasoline Price", metric: "GAS" },
  { displayText: "Diesel Price", metric: "DIESEL" },
];

const DemographicSelector: FunctionComponent = () => {
  const userStore = useContext(userStoreContext);

  const clickHandler = (metric: Metrics) => {
    userStore.selectMetric(metric);
  };

  return (
    <div className="mx-5 bg-light p-4 rounded">
      <h3 className="d-inline-block">Compare countries by: </h3>
      <div className="float-end d-inline-block ">
        {options.map((option) => {
          return (
            <Button
              className="mx-1"
              onClick={() => clickHandler(option.metric)}
              variant={
                userStore.selectedMetric == option.metric
                  ? "primary"
                  : "secondary"
              }
            >
              {option.displayText}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default observer(DemographicSelector);
