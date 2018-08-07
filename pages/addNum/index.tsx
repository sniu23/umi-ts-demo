import * as React from "react";
import { observable, action } from "mobx";
import { observer } from "mobx-react";

class Store {
  @observable num = 0;
  @action addNum = () => {
    this.num++;
  }
};

const newStore = new Store()

@observer
export default class AddNumView extends React.Component {
  render() {
    return (
      <div>
        <p>{newStore.num}</p>
        <button onClick={newStore.addNum}> Add Num </button>
      </div>
    )
  }
}


