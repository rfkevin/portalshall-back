import mongoose from "mongoose";

const donationsSchema = mongoose.Schema({
  id: { type: String, required: true },
  date: { type: String, required: true },
  currency: { type: String, required: true },
  amounts: { type: String, required: true },
  email:{ type: String, required: true },
  payer_id:{type: String},
  given_name:{ type: String},
  surname: { type: String },
  location: { type: String},

});

export default mongoose.model("Donations", donationsSchema);
