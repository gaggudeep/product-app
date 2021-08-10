import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useHistory } from "react-router-dom";

export default function Header(props) {
  const history = useHistory();

  function handleClick(event) {
    event.preventDefault();
    props.onChange({
      isAdmin: null,
      isAuthorized: false,
      userName: null,
    });
    history.push("/login");
  }

  return (
    <div className="Header">
      <Navbar>
        <Container sm={12}>
          {/* <Col md={{ span: 1, offset: 4 }}> */}
            <Navbar.Brand sm={6}>
              FARMSTOP
            </Navbar.Brand>
          {/* </Col> */}
          <Nav sm={{ span: 6, offset: 6 }}>
            {
              props.data.userName && <Nav.Link>Hello, {props.data.userName}</Nav.Link>
            }
            {
              props.data.isAuthenticated && <Nav.Link onClick={handleClick}>Logout</Nav.Link>
            }
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}
