import express from "express";
import { adminOnly } from "../middlewares/auth.js";
import { newProduct, getlatestProducts, getAllCategories, getAdminProducts, getSingleProduct, updateProduct, deleteProduct, getAllProducts } from "../controllers/product.js";
import { singleUpload } from "../middlewares/multer.js";

const app = express.Router();

// To Create New Product - /api/v1/product/new
app.post("/new", adminOnly, singleUpload, newProduct)

// To get all Products with filter - /api/v1/product/all
app.get("/all", getAllProducts);
//To get last 10 Products - /api/v1/product/latest
app.get("/latest", getlatestProducts);

//To get  all unique categories - api/v1/product/categories
app.get("/categories", getAllCategories);

//To get all Products - /api/v1/product/admin-products
app.get("/admin-products", adminOnly, getAdminProducts);

//To get, update, delete Product
app.route("/:id")
.get(getSingleProduct)
.put(adminOnly, singleUpload, updateProduct)
.delete(adminOnly, deleteProduct);

export default app; 