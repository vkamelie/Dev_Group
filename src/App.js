import React, { Component } from "react";
import routes from "./routes";
import NavBar from "./components/NavBar/NavBar";
import { withRouter } from "react-router-dom";
import "./App.css"

class App extends Component {
  render() {
    console.log(this.props.location);
    return (
      <div className="App">
        {this.props.location.pathname != "/" ? <NavBar /> : <div />}
        {routes}
      </div>
    );
  }
}

export default withRouter(App);
