import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    state = {todos: []};

    componentDidMount() {
      fetch("todos/")
          .then(res => res.json())
          .then(data => this.setState({
              todos:data.todos
          }))
    }

    render() {
        console.log(this.state.todos);
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
                <h1>Todos</h1>
                {this.state.todos.map(todo =>
                    <div key={todo.Id}>{todo.Title}</div>
                )}
            </div>
        );
    }
}

export default App;
