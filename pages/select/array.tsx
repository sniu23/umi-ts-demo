import * as React from "react";
import { observable, action, runInAction, autorun } from "mobx";
import { observer } from "mobx-react";


class Store {
  @observable todos:Array<Itodo> = [];
  @action add = () => {
    this.todos.push({
      title: "完成 Mobx 翻译",
      done: false,
    })
  }
}

interface Istore {
  todos: Array<Itodo>
}

interface Itodo {
  title: string,
  done: boolean,
}

const store = new Store();

@observer
export default class AddNumView extends React.Component {
  render() {
    return (
      <div>
        <button onClick={store.add} > add </button>
        {/* <TodoBox store={store} /> */}
        {
          store.todos.map((todo, index) => <li key={index} >{todo.title}</li>)
        }
      </div>
    )
  }
}


