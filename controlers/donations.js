import * as paypal from '../Payment/paypal.js';

export const createOrder = async (req, res) => {

  const {currency, amount} = req.body
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
  try {
    const captureData = await paypal.capturePayment(orderID);
    console.log(captureData);
    res.json(captureData);
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
};
