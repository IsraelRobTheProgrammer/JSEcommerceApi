const router = require("express").Router();
const {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProduct,
  getProduct,
} = require("../controllers/productController");

const {
  checkAdminPermission,
} = require("../middlewares/authMiddleware");

router.post("/", checkAdminPermission, createProduct);

router.post("/:id", checkAdminPermission, updateProduct);

router.post("/:id", checkAdminPermission, deleteProduct);

router.get("/find/:id", getProduct);

router.get("/", getAllProduct);

module.exports = router;
