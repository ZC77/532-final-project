import { makeAutoObservable } from "mobx";

export default class UserStore {
  selectedCountry: string = "";

  constructor() {
    makeAutoObservable(this);
  }

  selectCountry(country: string) {
    this.selectedCountry = country;
  }
}
