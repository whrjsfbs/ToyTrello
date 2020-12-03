import { observable, action } from "mobx";

class SampleStore {
  @observable sample = false;

  @action sampleChange = () => {
    this.sample = !this.sample;
  };
}

export default new SampleStore();
