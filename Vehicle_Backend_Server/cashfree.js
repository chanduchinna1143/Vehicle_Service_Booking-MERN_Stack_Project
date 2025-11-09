
require("dotenv").config();
const axios = require("axios");

const getAccessToken = async () => {
  try {
    const { data } = await axios.post(
      "https://sandbox.cashfree.com/pg/authorize",
      {},
      {
        headers: {
          "x-client-id": process.env.CASHFREE_CLIENT_ID,
          "x-client-secret": process.env.CASHFREE_CLIENT_SECRET,
          "x-api-version": "2022-09-01",
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ Cashfree Auth Response:", data);

    if (!data?.data?.token) {
      throw new Error("Failed to get token from Cashfree response");
    }

    return data.data.token;
  } catch (err) {
    console.error("❌ Cashfree Auth Error:", err.response?.data || err.message);
    throw new Error("Cashfree authentication failed");
  }
};




const createPaymentLink = async ({ orderId, amount, customer }) => {
  try {
    const token = await getAccessToken();
    const { data } = await axios.post(
      "https://sandbox.cashfree.com/pg/links",
      {
        customer_details: {
          customer_id: customer.id,
          customer_email: customer.email,
          customer_phone: customer.phone,
          customer_name: customer.name,
        },
        order_id: orderId,
        order_amount: amount,
        order_currency: "INR",
        order_note: "Car service bill payment",
        link_notify: {
          send_sms: true,
          send_email: true,
        },
        link_expiry_time: 86400,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "x-api-version": "2023-08-01",
        },
      }
    );

    console.log("✅ Cashfree Link Response:", data);

    if (!data?.data?.link_url) {
      throw new Error("Payment link not returned in response");
    }

    return data.data.link_url;
  } catch (err) {
    console.error("❌ Cashfree API Error:", err.response?.data || err.message);
    throw new Error("Cashfree payment link failed");
  }
};

module.exports = { createPaymentLink };
