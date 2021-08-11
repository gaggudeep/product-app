import axios from "axios";
import React, { useEffect, useState } from "react";
import { ListGroup, Button, Form, Modal, ListGroupItem, Container, ButtonGroup, Col } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { BASE_URI } from "../../config/config";

const AdminDashboard = function (props) {

  const [products, setProducts] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(-1);
  const [currentProductName, setCurrentProductName] = useState("");

  useEffect(() => fetchProducts(), []); 

  const handleAddClose = () => setShowAdd(false);
  const handleAddShow = () => setShowAdd(true);
  const handleEditClose = () => {
    setShowEdit(false);
  };
  const handleEditShow = (event) => {
    setCurrentProductId(event.target.id);
    setShowEdit(true);
  };
  const handleDeleteClose = () => {
    setShowDelete(false);
  };
  const handleDeleteShow = (event) => {
    setCurrentProductId(event.target.id);
    setShowDelete(true);
  };

  function fetchProducts() {
    axios.post(`${BASE_URI}/api/getProducts`, {
      userid: props.data.userId
    })
    .then(resp => {
      if(resp.statusText === "OK") {
        if(resp.data.user.products) {
          setProducts((_) => {
            const newList = resp.data.user.products;
            return newList;
          });
        }
      }
    })
    .catch(err => {
      console.log(err.response?.data.message);
    });
  }

  function addProduct(event) {
    event.preventDefault();
    handleAddClose();
    let newProductName = document.getElementById("newProduct").value;
    axios.post(`${BASE_URI}/api/addProduct`, {
      productname: newProductName,
      userid: props.data.userId
    })
    .then(resp => {
      setProducts(oldList => {
        const newList = [...oldList];
        newList.push(resp.data.product);
        return newList;
      });
    })
    .catch(err => {
      console.log("error:", err);
    });
  };

  function editProduct(event) {
    event.preventDefault();
    console.log(`editing: ${currentProductId} ${currentProductName}`);
    axios.put(`${BASE_URI}/api/editProduct`, {
      productid: currentProductId,
      productname: currentProductName
    })
    .then(resp => {
      fetchProducts();
      handleEditClose();
    })
    .catch(err => console.log(err))
  }

  function deleteProduct(event) {
    event.preventDefault();
    axios.post(`${BASE_URI}/api/deleteProduct`, {
      productid: currentProductId
    })
    .then(resp => {
      handleDeleteClose();
      fetchProducts();
    })
  }

  if(!props.data.isAuthenticated || !props.data.isAdmin) {
    return <h1>Your are not authorized to view this page.</h1>;
  }
  return (
    <div className="AdminDashboard">
      <h2>Product(s) added by you</h2>
      <Button variant="primary" onClick={handleAddShow}>
        Add Product
      </Button>
      <Modal show={showAdd} onHide={handleAddClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={addProduct}>
            <Form.Group>
              <Form.Control
                id="newProduct"
                autoFocus
                type="text"
                placeholder="Enter product name"
              />
            </Form.Group>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleAddClose}>
                Close
              </Button>
              <Button variant="primary" type="submit">
                Add
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
      <Container className="mt-2">
        {
          products.map(product => {
            return (
              <ListGroup className="mb-1" horizontal key={product.id}>
                <Col sm={8} >
                  <ListGroupItem key={product.id}>{product.name}</ListGroupItem>
                </Col>
                <Col sm={6}>
                  <ButtonGroup>
                    <Button id={product.id} variant="warning" onClick={handleEditShow}>Edit</Button>
                    <Modal show={showEdit} onHide={handleEditClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>Edit Product</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form onSubmit={editProduct}>
                          <Form.Group>
                            <Form.Control
                              id={`productName-${product.id}`}
                              autoFocus
                              type="text"
                              placeholder="Enter new name for product"
                              onChange={(e) => setCurrentProductName(e.target.value)}
                            />
                          </Form.Group>
                          <Modal.Footer>
                            <Button variant="secondary" onClick={handleEditClose}>
                              Close
                            </Button>
                            <Button variant="primary" type="submit">
                              Save change
                            </Button>
                          </Modal.Footer>
                        </Form>
                      </Modal.Body>
                    </Modal>

                    <Button variant="danger" id={product.id} onClick={handleDeleteShow}>Delete</Button>
                    <Modal show={showDelete} onHide={handleDeleteClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>Delete Product</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        Are you Sure you want to delete this product?
                        <Modal.Footer>
                          <Button variant="success" type="submit" onClick={deleteProduct}>
                            Yes
                          </Button>
                          <Button variant="danger" onClick={handleDeleteClose}>
                            No
                          </Button>
                        </Modal.Footer>
                      </Modal.Body>
                    </Modal>
                  </ButtonGroup>
                </Col>
              </ListGroup>
            )
          })
        }
      </Container>
    </div>
  );
}

export default withRouter(AdminDashboard);