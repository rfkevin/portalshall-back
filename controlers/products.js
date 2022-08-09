import { bucketAcess, upload, createBucketParams } from '../Storage/aws.js';
import { DeleteObjectCommand, DeleteObjectsCommand } from "@aws-sdk/client-s3";
import Products from '../models/products.js';



export const getProductsList = async (req, res) => {
  try {
    const productsList = await Products.find();
    res.status(200).json({ result: productsList, count: productsList.length });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};
export const deleteProducts = async (req, res) => {
  const s3 = bucketAcess();
  try {
    if (req.body.action === "batch") {
      const list = req.body.deleted;
      const bucketParams = createBucketParams(list);
      const data = await s3.send(new DeleteObjectsCommand(bucketParams));
      const productsList = await Products.deleteMany({
        _id: { $in: list },
      });
      res.status(200).json({ result: productsList, count: ProductsList.length });
    } else if (req.body.key._id) {
      const bucketParams = createBucketParams(req.body.key.image);
      const data = await s3.send(new DeleteObjectCommand(bucketParams));
      const productsList = await Products.findOneAndDelete({ _id: req.body.key._id });
      res.status(200).json({ result: productsList, count: productsList.length });
    } else {
      res.status(404).json({ message: "file not selected" });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};
export const addProducts = async (req, res) => {
  try {
    const date = new Date(Date.now()).toLocaleString().split(",")[0];
    const uploadSingle = upload("Products").single("image");
    uploadSingle(req, res, async (err) => {
      console.log(req.body);
      const { title, text , link} = req.body;
      if (err) {
        return res.status(400).json({ success: false, message: err.message });
      }
      await Products.create({
        title,
        text,
        link,
        date,
        image: req.file.location,
      });
      res.status(200).json({ message: "successfully created" });
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};
