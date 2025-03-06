import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

declare global {
  var cachedPrisma: PrismaClient | undefined;
}

const prisma = new PrismaClient().$extends(withAccelerate());
export const db = prisma;
