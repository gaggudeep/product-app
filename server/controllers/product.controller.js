const db = require("../models");

const User = db.user;
const Product = db.product;

exports.addProduct = (req, res) => {
  Product.create({
    name: req.body.productname,
    userId: req.body.userid
  })
  .then(product => {
    res.status(200).send({
      product: product,
      message: "Product added successfully"
    });
  })
  .catch((err) => {
    res.status(500).send({ message: err.message });
  });
};

exports.editProduct = (req, res) => {
  Product.findOne({
    where: {
      id: req.body.productid,
    },
  })
    .then((product) => {
      if (!product) {
        return res.status(404).send({ message: "Product not found" });
      }
      product.update({
        name: req.body.productname
      })
      .then(() => {
        res.send(({ message: "Product edit successful"}))
      })
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.deleteProduct = (req, res) => {
  Product.destroy({
    where: {
      id: req.body.productid
    }
  })
  .then(() => {
    res.send(({ message: "Product delete successful"}))
  })
  .catch((err) => {
    res.status(500).send({ message: err.message });
  });
};

exports.getProducts = (req, res) => {
  User.findByPk(req.body.userid, { include: ["products"] })
  .then((user) => {
    res.status(200).send({ user });
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  })
}
