import { makeAutoObservable } from "mobx";
import { Demographic } from "../components/DemographicSelector";
import { Metrics } from "../components/DemographicSelector";

export default class UserStore {
  selectedCountry: string = "";
  selectedMetric: Metrics = "ELECTRICITY";

  constructor() {
    makeAutoObservable(this);
  }

  selectCountry(country: string) {
    this.selectedCountry = country;
  }

  selectMetric(metric: Metrics) {
    this.selectedMetric = metric;
  }
}
