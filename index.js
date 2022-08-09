import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import newsRoutes from './routes/news.js';
import dotenv from "dotenv";
import donationsRoutes from './routes/donations.js';
import productsRoutes from './routes/products.js';
dotenv.config();
const app = express();
app.use(
  bodyParser.json({
    limit: "30mb",
    extended: true,
  })
);
app.use(
  bodyParser.urlencoded({
    limit: "30mb",
    extended: true,
  })
);
app.use(cors());
app.use(express.json());
app.use("/news", newsRoutes);
app.use("/donations", donationsRoutes)
app.use("/products", productsRoutes)
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`serveur runing on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));

export const checkDb = () =>{
  return mongoose.connection.readyState
}
