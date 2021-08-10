import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "./css/register.css";

export default function NewUserForm() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
  }

  function validateInputs() {
    return (
      userName.length > 0 && password.length > 0 && confirmPassword.length > 0
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
          <Button block size="lg" type="submit" disabled={!validateInputs()}>
            Register
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
}
