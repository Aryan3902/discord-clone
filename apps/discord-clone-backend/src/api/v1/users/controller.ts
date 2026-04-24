import { usersTable } from "../../../db/postgres/schema";
import { db } from "../../../db/postgres/index.js";
import { eq } from "drizzle-orm";
import { type Request, type Response } from "express";

export const getCurrentUser = async (req: Request, res: Response) => {
  const userId = req.user?.userId;

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, BigInt(userId)));
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const { passwordHash: _p, ...safe } = user;
    res.status(200).json(safe);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
