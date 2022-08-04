import mongoose from "mongoose";

const donationsSchema = mongoose.Schema({
  id: { type: String, required: true },
  date: { type: String, required: true },
  currency: { type: String, required: true },
  amountsSend: { type: String, required: true },
  email:{ type: String, required: true },
  given_name:{ type: String},
  surname: { type: String },
  address: { type: String},

});

export default mongoose.model("News", donationsSchema);
