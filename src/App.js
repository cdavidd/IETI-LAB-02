import React, { Component } from "react";
import "./App.css";
import "react-datepicker/dist/react-datepicker.css";
import { TodoApp } from "./components/TodoApp";
import { Login } from "./components/Login";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Redirect
} from "react-router-dom";
import logo from "./logo.svg";

class App extends Component {
  constructor(props) {
    super(props);
    const LoginView = () => <Login login={this.handleIsLoggedIn} />;
    const TodoAppView = () => <TodoApp />;
    this.state = {
      LoginView: LoginView,
      TodoAppView: TodoAppView,
      isLoggedIn: false
    };
    this.handleIsLoggedIn = this.handleIsLoggedIn.bind(this);
  }

  render() {
    let redi = (
      <Redirect
        to={
          this.state.isLoggedIn === false &&
          localStorage.getItem("email") === null
            ? "/"
            : "/todo"
        }
      />
    );

    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">TODO React App</h1>
          </header>
          <div>
            {redi}
            <Route exact path="/" component={this.state.LoginView} />
            <Route path="/todo" component={this.state.TodoAppView} />
          </div>
        </div>
      </Router>
    );
  }

  handleIsLoggedIn() {
    this.setState({
      isLoggedIn: true
    });
  }
}

export default App;
