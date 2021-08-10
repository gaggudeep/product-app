import React, { useState } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import { Link, Redirect, withRouter } from "react-router-dom";
import axios from "axios";
import "./css/login.css";
import { BASE_URI } from "../../config/config";

const LoginPage = function (props) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    axios.post(`${BASE_URI}/api/auth/login`, {
      username: userName,
      password: password,
    })
    .then(resp => {
      setErrorMsg("");
      if(resp.statusText === "OK") {
        const newState = {
          isAuthenticated: true,
          isAdmin: resp.data.roles.some(role => role === "admin"),
          userName: resp.data.username,
          userId: resp.data.userid
        };
        props.onChange(newState);
      }
    })
    .catch(err => {
      console.log(err);
      setErrorMsg(err.response?.data.message)
    });
  }

  function validateInputs() {
    return userName.length > 0 && password.length > 0;
  }

  if(props.data.isAuthenticated) {
    return props.isAdmin ? 
      <Redirect to="/adminDashBoard" /> :
      <Redirect to="/dashboard" />;
  }
  else {
    return (
      <div className="Login">
        <h2 style={{ textAlign: "center" }}>Please Log In</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group size="lg" controlId="userName">
            <Form.Label>User name</Form.Label>
            <Form.Control
              autoFocus
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Row>
            <Button block size="lg" type="submit" disabled={!validateInputs()}>
              Login
            </Button>
            <Link to="/register">
              <Button id="register" block size="lg" type="submit">
                Register new user
              </Button>
            </Link>
          </Form.Row>
          {
            errorMsg && <Alert variant="danger">{errorMsg}</Alert>
          }
        </Form>
      </div>
    );
  }
}

export default withRouter(LoginPage);