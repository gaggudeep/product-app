import axios from "axios";
import React, { useState } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import "./css/register.css";
import { BASE_URI } from "../../config/config";
import { Link, withRouter } from "react-router-dom";

const NewUserForm = function () {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if(password !== confirmPassword) {
      setErrorMsg("Passwords do not match");
      return;
    }

    axios.post(`${BASE_URI}/api/auth/register`, {
      username: userName,
      password: password,
    }).then(resp => {
      if(resp.statusText === "OK") {
        setSuccessMsg(resp.data.message);
        setErrorMsg("");
      }
    })
    .catch(err => {
      setSuccessMsg("");
      setErrorMsg(err.response.data.message)
    });
  }

  function validateInputs() {
    return (
      userName.length > 0 && password.length > 0 && confirmPassword.length > 0
    );
  }

  function renderMessage(type, msg) {
    return (
      <Alert variant={type}>{msg}</Alert>
    );
  }

  return (
    <div className="Register">
      <h2 style={{ textAlign: "center" }}>Please enter details</h2>
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
        <Form.Group size="lg" controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Row>
            <Button block size="lg" type="submit" disabled={!validateInputs()}>
              Register
            </Button>
              <Link to="/login">
                <Button block size="lg">
                  Back to Login
                </Button>
              </Link>
          </Form.Row>
        </Form.Group>
        {
          errorMsg && renderMessage("danger", errorMsg)
        }
        {
          successMsg && renderMessage("success", successMsg)
        }
      </Form>
    </div>
  );
}

export default withRouter(NewUserForm);