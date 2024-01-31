import db from "@/db";
import CodeModel from "@/models/codeModel";
import CountModel from "@/models/countModel";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  await db.connectDb();

  try {
    // Find the document and increment the count by 1
    const topItems = await CountModel.find({}).sort({ count: -1 }).limit(20);

    /*     // Fetch the global count from CountModel
    const countDocument = await CountModel.findOne();
    const count = countDocument ? countDocument.count : 0; */
    async function getCountSum() {
      try {
        const result = await CountModel.aggregate([
          {
            $group: {
              _id: null,
              total: { $sum: "$count" },
            },
          },
        ]);

        if (result.length > 0) {
          const count = result[0].total;

          return count;
        } else {
          return 0;
        }
      } catch (error) {
        throw error;
      }
    }

    // Call the function to get the count sum
    const count = await getCountSum();
    return res.status(200).json({ topItems, count });
  } catch (error) {
    console.error("Error fetching top items:", error);
    return res.status(500).json({ error: "Internal server error" });
  } finally {
    await db.disconnectDb();
  }
}
