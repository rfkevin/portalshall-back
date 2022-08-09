import express from "express";
import {addProducts, getProductsList, deleteProducts} from '../controlers/products.js';
const router = express.Router();
router.get("/" , getProductsList);
router.post("/get" , getProductsList);
router.post("/delete", deleteProducts);
router.post("/add" , addProducts);

export default router;
