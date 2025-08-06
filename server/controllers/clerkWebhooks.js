import User from "../models/User.js";
import { Webhook } from "svix";

const clerkWebhooks = async (req, res) => {
  try {
    // ✅ Verify Clerk Webhook Signature
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    if (!headers["svix-id"] || !headers["svix-timestamp"] || !headers["svix-signature"]) {
      return res.status(400).json({ success: false, message: "Missing Svix headers" });
    }

    await whook.verify(JSON.stringify(req.body), headers);

    // ✅ Extract data from the webhook
    const { data, type } = req.body;
    if (!data?.id) {
      return res.status(400).json({ success: false, message: "Invalid webhook payload" });
    }

    const userData = {
      _id: data.id,
      email: data.email_addresses?.[0]?.email_address || "",
      username: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
      image: data.image_url || "",
    };

    // ✅ Handle different webhook events
    switch (type) {
      case "user.created":
        await User.create(userData);
        console.log(`✅ User created: ${userData.email}`);
        break;

      case "user.updated":
        await User.findByIdAndUpdate(data.id, userData, { new: true });
        console.log(`✅ User updated: ${userData.email}`);
        break;

      case "user.deleted":
        await User.findByIdAndDelete(data.id);
        console.log(`✅ User deleted: ${data.id}`);
        break;

      default:
        console.log(`ℹ️ Unknown Clerk event type received: ${type}`);
        break;
    }

    return res.json({ success: true, message: "Webhook processed successfully" });

  } catch (error) {
    console.error("❌ Clerk Webhook Error:", error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
};

export default clerkWebhooks;
