import axios from "axios";
import React, { useState } from "react";
import { ListGroup, Button, Form, Modal, ListGroupItem } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { BASE_URI } from "../../config/config";

const AdminDashboard = function (props) {

  const [products, setProducts] = useState([]);
  const [init, setInit] = useState(true);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function fetchProducts() {
    console.log(props.data.userId);
    axios.post(`${BASE_URI}/api/getProducts`, {
      userid: props.data.userId
    })
    .then(resp => {
      if(resp.statusText === "OK") {
        if(resp.data.products)
          setProducts(resp.data.products);
      }
    })
    .catch(err => {
      console.log(err.response?.data.message);
    });
  }

  function addProduct(event) {
    event.preventDefault();
    handleClose();
    let newProductName = event.target.value;
    axios.post(`${BASE_URI}/api/addProduct`, {
      productname: newProductName,
      userid: props.data.userId
    })
    .then(resp => {
      let newProds = products;
      newProds.add(resp.data.product);
      setProducts(newProds);
      console.log(newProds);
    })
    .catch(err => {
      console.log(err.response?.data.message);
    });
  };

  function editProduct() {

  }

  function deleteProduct() {

  }

  if(init) {
    fetchProducts();
    setInit(false);
  }

  if(!props.data.isAuthenticated || !props.data.isAdmin) {
    return <h1>Your are not authorized to view this page.</h1>;
  }
  return (
    <div className="AdminDashboard">
      <h2>Product(s) added by you</h2>
      <Button variant="primary" onClick={handleShow}>
        Add Product
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={addProduct}>
            <Form.Group>
              <Form.Control
                autoFocus
                type="text"
                placeholder="Enter product name"
              />
            </Form.Group>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" type="submit" onSubmit={addProduct}>
                Add
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
      {/* {
        products?.map(product => {
          return (
            <ListGroup>
              <ListGroupItem>{product.name}</ListGroupItem>
            </ListGroup>
          )
        })
      } */}
    </div>
  );
}

export default withRouter(AdminDashboard);