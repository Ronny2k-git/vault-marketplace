import { NextApiRequest, NextApiResponse } from "next";
import { createVaultInDb } from "../createVault/createPrisma";

export async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const vaultDate = req.body;

      const createdVault = await createVaultInDb(vaultDate);

      return res.status(200).json({ success: true, vault: createdVault });
    } catch (error) {
      return res.status(500).json({ sucess: false });
    }
  } else {
    return res
      .status(405)
      .json({ sucess: false, message: "Method Not Allowed" });
  }
}
