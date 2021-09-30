import React, { useState } from "react"
import './App.css';
import Profilescreen from "./screen/Profilescreen";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { StateHandler } from "./component/login/context/Authcontext";
import HomeScreen from "./screen/HomeScreen";
import Login from "./component/login/Login";
import Register from "./component/login/Register";
import Messenger from "./component/Messenger/Messenger";
import Sidebar from "./component/Sidebar";
import BackDrop from "./component/BackDrop";
import People from "./component/People/People";
import EditProfile from "./component/EditProfile";


function App() {

  const [toggle, setToggle] = useState(false);
  const { user } = StateHandler();

  return (
    <Router>
      <Switch>
        <div className="App">
          <Sidebar show={toggle} click={() => setToggle(false)} />
          <BackDrop show={toggle} click={() => setToggle(false)} />
          <Route exact path="/" >
            {user ? <HomeScreen click={() => setToggle(true)} show={toggle} /> : <Login />}
          </Route>
          <Route exact path="/profile/:userName" >
            <Profilescreen click={() => setToggle(true)} show={toggle} />
          </Route>
          <Route path="/message" >
            <Messenger click={() => setToggle(true)} show={toggle} />
          </Route>
          <Route exact path="/Login">
            {user ? <Redirect to="/" /> : <Login />}
          </Route>
          <Route exact path="/People">
            <People click={() => setToggle(true)} show={toggle} />
          </Route>
          <Route exact path="/Register" >
            {user ? <Redirect to="/" /> : <Register />}
          </Route>
          <Route exact path="/edit" >
            <EditProfile />
          </Route>
        </div>
      </Switch>
    </Router>

  );
}

export default App;
