import React from 'react'
import './App.css'

class App extends React.Component {
  
  state = {
    newTodoText: '',
    items: [],
    filter: 'all',
    counter: 0
  }

  addTodo = event => {
    if (event.key !== 'Enter') return
    const todo = {
      id: this.state.counter,
      text: this.state.newTodoText,
      completed: false
    }
    const {items} = this.state
    items.push(todo)
    this.setState({
      items,
      newTodoText: '',
      counter: this.state.counter + 1
    })
  }

  updateTodo = event => {
    const id = parseInt(event.target.id, 10)
    const {items} = this.state
    const idx = items.findIndex(item => item.id === id)
    items[idx].completed
    ? items[idx].completed = false
    : items[idx].completed = true
    this.setState({items})
  }

  removeTodo = event => {
    const id = parseInt(event.target.id, 10)
    const {items} = this.state
    const idx = items.findIndex(item => item.id === id)
    items.splice(idx, 1)
    this.setState({items})
  }

  updateFilter = event => {
    this.setState({filter: event.target.id})
  }

  updateTodoText = event => {
    this.setState({newTodoText: event.target.value})
  }

  TodoItem = props => {
    let status
    props.completed ? status = 'completed' : status = ''
    return (
      <li className={status}>
        <div className="view">
          <input
            id={props.id}
            className="toggle"
            type="checkbox"
            onChange={this.updateTodo}/>
          <label>{props.text}</label>
          <button className="destroy"
            onClick={this.removeTodo}
            id={props.id}/>
        </div>
        <input className="edit"/>
      </li>
    )
  }

  TodoFooter = props => {
    return (
      <footer className="footer">
        <span className="todo-count">
          ? item left
        </span>
        <ul className="filters">
          <li><a href="#/"
            onClick={this.updateFilter}
            id="all" className={
              this.state.filter === 'all'
              ? 'selected' : ''
            }>All</a></li>
          <li><a href="#/"
            onClick={this.updateFilter}
            id="active" className={
              this.state.filter === 'active'
              ? 'selected' : ''
            }>Active</a></li>
          <li><a href="#/"
            onClick={this.updateFilter}
            id="completed" className={
              this.state.filter === 'completed'
              ? 'selected' : ''
            }>Completed</a></li>
        </ul>
      </footer>
    )
  }
  
  render() {
    return (
      <div>
        <header className="header">
          <h1>todos</h1>
          <input className="new-todo"
            placeholder="What needs to be done?"
            autoFocus="true"
            onChange={this.updateTodoText}
            onKeyPress={this.addTodo}
            value={this.state.newTodoText}/>
        </header>
        <section className="main">
          <input className="toggle-all" type="checkbox"/>
          <ul className="todo-list">
            {this.state.items
            .filter(todo => {
              if (this.state.filter === 'all') return todo
              else if (this.state.filter === 'active')
                return !todo.completed 
              else return todo.completed
            })
            .map(todo =>
              <this.TodoItem
              id={todo.id}
              key={todo.id}
              text={todo.text}
              completed={todo.completed}/>
            )}
          </ul>
        </section>
        <this.TodoFooter/>
      </div>
    )
  }
}

export default App