export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { amount } = req.body;
    if (!amount || isNaN(amount)) {
      return res.status(400).json({ error: "Invalid amount" });
    }

    const key_id = process.env.REACT_APP_RAZORPAY_TEST_KEY_ID;
    const secret = process.env.REACT_APP_RAZORPAY_KEY_SECRET;
    const auth =
      "Basic " + Buffer.from(`${key_id}:${secret}`).toString("base64");

    const body = {
      amount: Math.round(Number(amount) * 100), // rupees -> paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      payment_capture: 1, // auto-capture (1) or manual (0)
    };

    const r = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: auth,
      },
      body: JSON.stringify(body),
    });

    const data = await r.json();
    if (!r.ok) {
      return res.status(r.status).json({ error: data });
    }

    return res.status(200).json(data);
  } catch (err) {
    console.error("create-order error:", err);
    return res.status(500).json({ error: "Server error" });
  }
}
