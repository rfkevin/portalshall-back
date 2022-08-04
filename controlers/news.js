import News from "../models/news.js";
import { bucketAcess, upload, createBucketParams } from '../Storage/aws.js';



export const getNewsList = async (req, res) => {
  try {
    const newsList = await News.find();
    res.status(200).json({ result: newsList, count: newsList.length });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const deleteNews = async (req, res) => {
  const s3 = bucketAcess();
  try {
    if (req.body.action === "batch") {
      const list = req.body.deleted;
      const bucketParams = createBucketParams(list);
      const data = await s3.send(new DeleteObjectsCommand(bucketParams));
      const newsList = await News.deleteMany({
        _id: { $in: list },
      });
      res.status(200).json({ result: newsList, count: newsList.length });
    } else if (req.body.key._id) {
      const bucketParams = createBucketParams(req.body.key.image);
      const data = await s3.send(new DeleteObjectCommand(bucketParams));
      const newsList = await News.findOneAndDelete({ _id: req.body.key._id });
      res.status(200).json({ result: newsList, count: newsList.length });
    } else {
      res.status(404).json({ message: "file not selected" });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const addNews = async (req, res) => {
  try {
    const date = new Date(Date.now()).toLocaleString().split(",")[0];
    const uploadSingle = upload("news").single("image");
    uploadSingle(req, res, async (err) => {
      const { title, text } = req.body;
      if (err) {
        return res.status(400).json({ success: false, message: err.message });
      }
      await News.create({
        title,
        text,
        date,
        image: req.file.location,
      });
      res.status(200).json({ message: "successfully created" });
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
