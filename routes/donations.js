import express from "express";
import {createOrder, capture} from '../controlers/donations.js';
const router = express.Router();
router.post("/createOrder" , createOrder);
router.post("/:orderID/capture" , capture);


export default router;
