import * as React from "react";
import { observable, computed, autorun, action } from "mobx";
import { observer } from "mobx-react";

class Todo {
  id = Math.random();
  @observable task:string;
  @observable complate:boolean = false;
  @observable assignee:string = 'Jack';
  constructor(task) {
    this.task = task;
  }
  @action rename(task) {
    this.task = task;
  }
  @action toggleComplated() {
    this.complate = !this.complate;
  }
}

class TodoList {
  constructor() {
    autorun(() => {
      console.log(this.report)
    })
  }
  @observable todos: Todo[] = [];
  @computed get complatedTodosCount():number {
    return this.todos.filter(todo => todo.complate === true).length;
  }
  @computed get report():string {
    if (this.todos.length === 0)
      return 'No tasks!';
    return `have finished: ${this.complatedTodosCount}/${this.todos.length}`
  }
  @action addTodo(task):void {
    this.todos.push(
      new Todo(task)
    )
  }
}

const store = new TodoList();

store.addTodo('task1');

interface TodoViewProps {
  todo: Todo,
}

@observer
class TodoView extends React.Component<TodoViewProps> {
  render() {
    const { todo } = this.props;
    function onRename() {
      todo.rename(prompt('task\'s name:', todo.task) || todo.task)
    }
    function onToggleComplated() {
      todo.toggleComplated()
    }
    return (
      <li onDoubleClick={onRename} >
        <input 
          type="checkbox"
          checked={todo.complate}
          onChange={onToggleComplated}
        />
        {todo.task} - {todo.assignee ? <small>{todo.assignee}</small> : null}
      </li>
    )
  }
}

@observer
export default class TodoListView extends React.Component {
  render() {
    function onAddTodo() {
      store.addTodo(prompt('task\'s name:','task1') ||'task1')
    }
    return (
      <div>
        {store.report}
        <ul>
          {
            store.todos.map(todo => <TodoView todo={todo} key={todo.id} />)
          }
          <button onClick={onAddTodo}> New Todo </button>
          <small>(double-click a todo to edit)</small>
        </ul>
      </div>
    )
  }
}