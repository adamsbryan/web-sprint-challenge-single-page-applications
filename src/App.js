import React from "react";
import Form from "./Form";
import HomePage from "./HomePage";
import {Route, Switch} from "react-router-dom";

export default function App() {
  return (
    <div className="App">
      
      <Switch>
        <Route path = "/pizza">
          <Form />
        </Route>
        <Route path = "/">
          <HomePage />
        </Route>  
      </Switch>

    </div>
  );
}