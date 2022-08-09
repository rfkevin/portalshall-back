import express from "express";
import {createOrder, capture, getDonationList} from '../controlers/donations.js';
const router = express.Router();
router.post("/createOrder" , createOrder);
router.post("/:orderID/capture" , capture);
router.post("/list" , getDonationList);

export default router;
