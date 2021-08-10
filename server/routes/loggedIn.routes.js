const authJwt = require("../middleware");
const controller = require("../controllers/product.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/getProducts",
    controller.getProducts
  );

  app.post(
    "/api/addProduct",
    controller.addProduct
  );

  app.put(
    "/api/editProduct",
    controller.editProduct
  );

  app.post(
    "/api/deleteProduct",
    controller.deleteProduct
  );
};
