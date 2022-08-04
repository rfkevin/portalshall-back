import mongoose from "mongoose";

const newsSchema = mongoose.Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  image: { type: String, required: true },
  date: { type: String, required: true },
});

export default mongoose.model("News", newsSchema);
