import express from "express";
import {addNews, getNewsList, deleteNews} from '../controlers/news.js';
const router = express.Router();
router.get("/" , getNewsList);
router.post("/get" , getNewsList);
router.post("/delete", deleteNews);
router.post("/add" , addNews);

export default router;
