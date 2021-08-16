import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import HomeScreen from './components/Home/HomeScreen';
import QuestionScreen from "./components/QuestionScreen";


function App() {
  return (
    <div className="app">

      <Router>
        <Switch>
          <Route exact path="/">
            <HomeScreen />
          </Route>

          <Route exact path="/question">
            <QuestionScreen />
          </Route>
        </Switch>
      </Router>

    </div>
  );
}

export default App;
