import db from "@/db";
import CodeSearch from "@/models/codeSearchSchema";
import CountModel from "@/models/countModel";

/* export default async function handler(req, res) {
  const response = await req.body;
  const pharmacy = response.name;

  try {
    await db.connectDb();
    const data = await CountModel.find({ pharmacy });

    return res.status(200).json(data);
  } catch (error) {
    console.log(error.message);
  } finally {
    db.disconnectDb();
  }
}
 */

export default async function handler(req, res) {
  const response = await req.body;
  const pharmacy = response.name;

  try {
    await db.connectDb();
    const data = await CodeSearch.find({ pharmacy });

    return res.status(200).json(data);
  } catch (error) {
    console.log(error.message);
  } finally {
    db.disconnectDb();
  }
}
