import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import "./css/login.css";

export default function LoginPage() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
  }

  function validateInputs() {
    return userName.length > 0 && password.length > 0;
  }

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
      </Form>
    </div>
  );
}
