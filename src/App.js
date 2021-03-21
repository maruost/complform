import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import { Step1 } from "./components/Step1";
import { Step2 } from "./components/Step2";
import { Result } from "./components/Result";

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Step1}></Route>
      <Route exact path="/step2" component={Step2}></Route>
      <Route exact path="/result" component={Result}></Route>
    </Switch>
  );
}

export default App;
