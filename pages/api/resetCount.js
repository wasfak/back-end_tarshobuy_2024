// pages/api/resetCount.js
import db from "@/db";
import CountModel from "@/models/countModel";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  await db.connectDb();

  try {
    // Update the count in the CountModel to reset it to 0
    await CountModel.updateOne({}, { $set: { count: 0 } });

    return res
      .status(200)
      .json({ message: "Total search count reset successfully" });
  } catch (error) {
    console.error("Error resetting count:", error);
    return res.status(500).json({ error: "Internal server error" });
  } finally {
    await db.disconnectDb();
  }
}
