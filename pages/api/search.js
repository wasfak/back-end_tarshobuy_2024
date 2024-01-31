import db from "@/db";
import CodeModel from "@/models/codeModel";
import CodeSearch from "@/models/codeSearchSchema";
import CountModel from "@/models/countModel";


export default async function handler(req, res) {
  try {
    if (req.method !== "GET") {
      return res.status(405).json({ error: "Method Not Allowed" });
    }

    const { code, pharmacy } = req.query;

    if (!code || !pharmacy) {
      return res.status(400).json({ error: "Invalid input data" });
    }

    await db.connectDb();

    // Search for the code in the CodeModel
    const foundCode = await CodeModel.findOne({ code });

    if (!foundCode) {
      return res.status(404).json({ message: "Code not found" });
    }

    // Search for the code and pharmacy in the CodeSearch schema
    let searchEntry = await CodeSearch.findOne({ pharmacy });

    // If the entry exists, update it
    if (searchEntry) {
      // Check if the code already exists in the codes array
      const existingCodeIndex = searchEntry.codes.findIndex(
        (c) => c.code === Number(code)
      );

      if (existingCodeIndex !== -1) {
        // If the code exists, increment searchCount
        searchEntry.codes[existingCodeIndex].searchCount++;
      } else {
        // If the code doesn't exist, add it with searchCount 1
        searchEntry.codes.push({
          code,
          name: foundCode.name,
          searchCount: 1,
        });
      }

      // Save the updated document in CodeSearch
      await searchEntry.save();
    } else {
      // If the entry doesn't exist, create a new one
      searchEntry = new CodeSearch({
        pharmacy,
        codes: [
          {
            code,
            name: foundCode.name,
            searchCount: 1,
          },
        ],
      });

      // Save the new document in CodeSearch
      await searchEntry.save();
    }

    // Update or create an entry in CountModel
    let countEntry = await CountModel.findOne({ code });

    if (countEntry) {
      countEntry.count++;
    } else {
      countEntry = new CountModel({
        code,
        name: foundCode.name,
        searchCount: 1,
      });
    }

    // Save the updated or new entry in CountModel
    await countEntry.save();

    // Return a response with the found code and the global count
    return res.status(200).json({ foundCode });
  } catch (error) {
    console.error("Error searching for code:", error);
    return res.status(500).json({ error: "Internal server error" });
  } finally {
    await db.disconnectDb();
  }
}
