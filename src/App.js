import React, { useState } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import Header from "./components/header/Header";
import LoginPage from "./components/login/LoginPage";
import Dashboard from "./components/dashboard/Dashboard";
import AdminDashboard from "./components/dashboard/AdminDashboard";
import NewUserForm from "./components/registration/NewUserForm";

function App() {
  const [state, setState] = useState({
    isAuthenticated: false,
    userName: null,
    isAdmin: null,
    userId: null
  });

 function handleChange(newState) {
    console.log(`Changing state from: ${JSON.stringify(state)}\n to\n ${JSON.stringify(newState)}`);
    setState(newState);
};

  return (
    <BrowserRouter>
      <div className="App">
          <Header data={state} onChange={handleChange} />
          <Redirect from="/" to="/login" />
          <Switch>
            <Route path="/register">
              <NewUserForm />
            </Route>
            <Route path="/login">
              <LoginPage data={state} onChange={handleChange} />
            </Route>
              <Route path="/dashboard">
                <Dashboard data={state} onChange={handleChange} />
              </Route>
              <Route path="/adminDashboard">
                <AdminDashboard data={state} />
              </Route>
          </Switch>
      </div>
    </BrowserRouter>

  );
}

export default App;
