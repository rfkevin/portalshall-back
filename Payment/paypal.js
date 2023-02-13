import fetch from "node-fetch";

const base = "https://api-m.sandbox.paypal.com";

export async function createOrderComp(currency, amount) {
  const accessToken = await generateAccessToken();
  const data = JSON.stringify({
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: currency,
          value: amount,
          breakdown: {
            item_total: {
              currency_code: currency,
              value: amount,
            },
          },
        },
        items: [
          {
            name: "Portals Hall",
            description: "Donations",
            unit_amount: {
              currency_code: currency,
              value: amount,
            },
            quantity: "1",
          },
        ],
      },
    ],
  });
  const url = `${base}/v2/checkout/orders`;
  const response = await fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: data,
  });
  return handleResponse(response);
}

export async function capturePayment(orderId) {
  const accessToken = await generateAccessToken();
  const url = `${base}/v1/checkout/orders/${orderId}/capture`;
  const response = await fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return handleResponse(response);
}
export async function generateAccessToken() {
  const client_id = process.env.PAYPAL_CLIENT_ID;
  const secret_id = process.env.PAYPAL_SECERT_ID;
  const auth = Buffer.from(client_id + ":" + secret_id).toString("base64");
  console.log(auth  )
  const response = await fetch(`${base}/v1/oauth2/token`, {
    method: "post",
    body: "grant_type=client_credentials",
    headers: {
      Authorization: `Basic ${auth}`,
    },
  });
const jsonData = await handleResponse(response);
 return jsonData.access_token;
}

async function handleResponse(response) {
  if (response.status === 200 || response.status === 201) {
    return await response.json();
  }
  const errorMessage = await response.statusText;
  console.log(errorMessage);
  throw new Error(errorMessage);
}
