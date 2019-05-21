import React from "react";
import { shallow } from "enzyme";
import ReactDOM from "react-dom";
import Home from '../components/Home/Home';

describe('Home Component', () => { 
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Home />, div);
  });
})
