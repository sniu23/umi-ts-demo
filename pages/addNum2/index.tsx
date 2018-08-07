import * as React from "react";
import { observable, action, computed } from "mobx";
import { observer } from "mobx-react";

class Store {
  @observable num1 = 0;
  @observable num2 = 0;
  @action addNum1 = () => {
    this.num1++;
  }
  @action addNum2 = () => {
    this.num2++;
  }
  @computed get total() {
    return this.num1 + this.num2;
  }
};

const newStore2 = new Store()

@observer
export default class AddNumView extends React.Component {
  render() {
    return (
      <div>
        <p>num1 = {newStore2.num1}</p>
        <p>num2 = {newStore2.num2}</p>
        <p>total = {newStore2.total}</p>
        <button onClick={newStore2.addNum1}> Add Num1 </button>
        <button onClick={newStore2.addNum2}> Add Num2 </button>
      </div>
    )
  }
}


