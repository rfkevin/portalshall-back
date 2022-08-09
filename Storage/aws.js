import { S3Client } from "@aws-sdk/client-s3";

import multer from "multer";
import multerS3 from "multer-s3";
import path from "path";
const extractName = (url) => {
  return url.split("/").slice(-2).join("/");
};
export const bucketAcess = () => {
  const region = process.env.BUCKET_REGION;
  const accessKeyId = process.env.BUCKET_ACCESS_KEY;
  const secretKey = process.env.BUCKET_SECRET_KEY;
  const s3 = new S3Client({
    region: region,
    credentials: {
      accessKeyId,
      secretAccessKey: process.env.BUCKET_SECRET_KEY,
    },
  });
  return s3;
};

export const upload = (container) => {
  const s3 = bucketAcess();
  try {
    return multer({
      storage: multerS3({
        s3,
        bucket: process.env.BUCKET_NAME,
        metadata: (req, file, cb) => {
          cb(null, { fieldName: file.fieldname });
        },
        key: (req, file, cb) => {
          const ext = path.extname(file.originalname);
          cb(null, `${container}/${container}-${Date.now()}${ext}`);
        },
      }),
    });
  } catch (e) {
    console.log(e);
  }
};

export const createBucketParams = (deleted) => {
  const bucketName = process.env.BUCKET_NAME;
  try {
    if (Array.isArray(deleted)) {
      let name = "";
      let names = [];

      Object.entries(deleted).map(([id, data]) => {
        name = extractName(data.image);
        console.log(name);
        names.push({ Key: name });
      });
      const bucketParams = {
        Bucket: bucketName,
        Delete: {
          Objects: names,
        },
      };
      return bucketParams;
    } else {
      const name = extractName(deleted);
      const bucketParams = { Bucket: bucketName, Key: name };
      return bucketParams;
    }
  } catch (e) {
    console.log(e);
  }
};
