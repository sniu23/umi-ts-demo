import * as React from "react";
import { observable, computed, autorun, action } from "mobx";
import { observer } from "mobx-react";

class Todo {
  id = Math.random();
  @observable task: string;
  @observable complate: boolean = false;
  @observable assignee: string = 'Jack';
  constructor(task) {
    this.task = task;
  }
}

class TodoList {
  constructor() {
    // autorun(() => {
    //   console.log(this.report)
    // })
  }
  @observable todos: Todo[] = [];
  @computed get complatedTodosCount() {
    return this.todos.filter(todo => todo.complate === true).length;
  }
  @computed get report() {
    if (this.todos.length === 0)
      return 'No tasks!';
    return `have finished: ${this.complatedTodosCount}/${this.todos.length}`
  }
  @action addTodo(task) {
    this.todos.push(
      new Todo(task)
    )
  }
}

const store = new TodoList();

store.addTodo('abc');

interface TodoListProps {
  store: TodoList,
}

@observer
class TodoListView extends React.Component<TodoListProps> {
  render() {
    const { store } = this.props;
    const { todos } = store;
    return (
      <div>
        {store.report}
        <ul>
          {
            todos.map((todo) => 
              <TodoView todo={todo} key={todo.id} />
            )
          }
          <button onClick={this.onAddTodo.bind(this)}> New Todo </button>
          <small>(double-click a todo to edit)</small>
        </ul>
      </div>
    )
  }
  onAddTodo() {
    this.props.store.addTodo(prompt('task name:', 'task1') || 'task1');
  }
}

interface TodoProps {
  todo: Todo,
}

@observer
class TodoView extends React.Component<TodoProps> {
  render() {
    const { todo } = this.props;
    return (
      <li onDoubleClick={this.onRename.bind(this)}>
        <input
          type="checkbox"
          checked={todo.complate}
          onChange={this.onToggleComplated.bind(this)}
        />
        {todo.task} - {todo.assignee ? <small>{todo.assignee}</small> : null}
      </li>
    )
  }
  onRename() {
    const todo = this.props.todo;
    todo.task = prompt('task name:', todo.task) || todo.task;
  }
  onToggleComplated() {
    const todo = this.props.todo;
    todo.complate = !todo.complate;
  }
}

export default class App extends React.Component {
  render() {
    return (
      <TodoListView store = {store} />
    )
  }
}