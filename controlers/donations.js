import * as paypal from "../Payment/paypal.js";
import Donations from "../models/donation.js";
import { checkDb } from "../index.js";

export const createOrder = async (req, res) => {
  const { currency, amount } = req.body;
  try {
    const order = await paypal.createOrderComp(currency, amount);
    res.json(order);
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
};

export const capture = async (req, res) => {
  const { orderID } = req.params;
  const db = checkDb();
  try {
    if ( db === 1) {
      const captureData = await paypal.capturePayment(orderID);
      if (captureData.status === "COMPLETED") {
        const data = await saveInfo(captureData);
      }
      res.json(captureData);
    }else{
      res.status(502).send("database probleme retry later");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
};

export const getDonationList = async (req, res) => {
  try {
    const newsList = await Donations.find();
    res.status(200).json({ result: newsList, count: newsList.length });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


 const saveInfo = async (captureData) => {
  await Donations.create({
    id: captureData.order_id,
    date: captureData.update_time,
    currency: captureData.gross_total_amount.currency,
    amounts: captureData.gross_total_amount.value,
    email: captureData.payer.email_address,
    given_name: captureData.payer.name.given_name,
    surname: captureData.payer.name.surname,
    location: captureData.payer.address.country_code,
    payer_id: captureData.payer.payer_id
  });
};
