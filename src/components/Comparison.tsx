import { FunctionComponent, useContext } from "react";
import { Button } from "react-bootstrap";
import { observer } from "mobx-react-lite";

import { userStoreContext } from "../store/StoreContexts";

let evSalesData = require("../data/evSalesPercentage.json");
let dieselData = require("../data/dieselPrice.json");
let electricityData = require("../data/electricityPrices.json");
let gasData = require("../data/gasolinePrice.json");

const Comparison: FunctionComponent = () => {
  const userStore = useContext(userStoreContext);

  const clickHandler = (countryName: any) => {
    console.log(countryName as string);
    userStore.selectCountry(countryName as string);
  };

  let evSales = Object.keys(evSalesData)
    .map((country) => {
      return { countryName: country, percentage: evSalesData[country] };
    })
    .sort((a, b) => {
      return (a.percentage as any) - (b.percentage as any);
    });

  let dieselPrices = Object.keys(dieselData)
    .map((country) => {
      return { countryName: country, price: dieselData[country] };
    })
    .sort((a, b) => {
      return (a.price as any) - (b.price as any);
    });

  let gasPrices = Object.keys(gasData)
    .map((country) => {
      return { countryName: country, price: gasData[country] };
    })
    .sort((a, b) => {
      return (a.price as any) - (b.price as any);
    });

  let electricityPrices = Object.keys(electricityData)
    .map((country) => {
      return { countryName: country, price: electricityData[country] };
    })
    .sort((a, b) => {
      return (a.price as any) - (b.price as any);
    });

  return (
    <div className="mx-5 bg-light p-4 rounded horiziontal-scrollable">
      <div className="mx-auto text-center">
        <p>BEVs sold as a percentage of new vehicles in 2021</p>
        {evSales.map((tuple) => (
          <Button
            className="d-inline-flex mx-1"
            onClick={() => clickHandler(tuple.countryName)}
            variant={
              userStore.selectedCountry === tuple.countryName
                ? "primary"
                : "secondary"
            }
          >
            {tuple.percentage as any}%{" "}
          </Button>
        ))}
      </div>

      <div className="mx-auto my-3 text-center">
        <p>Diesel prices in 2021</p>
        {dieselPrices
          .filter((country) =>
            Object.keys(evSalesData).includes(country.countryName)
          )
          .map((tuple) => (
            <Button
              className="d-inline-flex mx-1"
              onClick={() => clickHandler(tuple.countryName)}
              variant={
                userStore.selectedCountry === tuple.countryName
                  ? "primary"
                  : "secondary"
              }
            >
              ${tuple.price as any}{" "}
            </Button>
          ))}
      </div>

      <div className="mx-auto my-3 text-center">
        <p>Gasoline prices in 2021 (in USD)</p>
        {gasPrices
          .filter((country) =>
            Object.keys(evSalesData).includes(country.countryName)
          )
          .map((tuple) => (
            <Button
              className="d-inline-flex mx-1"
              onClick={() => clickHandler(tuple.countryName)}
              variant={
                userStore.selectedCountry === tuple.countryName
                  ? "primary"
                  : "secondary"
              }
            >
              ${tuple.price as any}{" "}
            </Button>
          ))}
      </div>

      <div className="mx-auto my-3 text-center">
        <p>Electricity prices in 2021 per kW/h (in USD)</p>
        {electricityPrices
          .filter((country) =>
            Object.keys(evSalesData).includes(country.countryName)
          )
          .map((tuple) => (
            <Button
              className="d-inline-flex mx-1"
              onClick={() => clickHandler(tuple.countryName)}
              variant={
                userStore.selectedCountry === tuple.countryName
                  ? "primary"
                  : "secondary"
              }
            >
              ${tuple.price as any}{" "}
            </Button>
          ))}
      </div>
    </div>
  );
};

export default observer(Comparison);
