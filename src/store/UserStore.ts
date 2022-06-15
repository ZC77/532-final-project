import { makeAutoObservable, runInAction } from "mobx";
import { Demographic } from "../components/DemographicSelector";
import { Metrics, MetricDomain } from "../components/DemographicSelector";

export default class UserStore {
  selectedCountry: string = "";
  selectedMetric: Metrics = "ELECTRICITY";
  selectedMetricDomain: MetricDomain = {
    min: "",
    max: "",
  };

  constructor() {
    makeAutoObservable(this);
  }

  selectCountry(country: string) {
    runInAction(() => {
      this.selectedCountry = country;
    });
  }

  selectMetric(metric: Metrics) {
    runInAction(() => {
      this.selectedMetric = metric;
    });
  }

  setMetricDomain(min: string, max: string) {
    runInAction(() => {
      this.selectedMetricDomain = {
        min,
        max,
      };
    });
  }
}
