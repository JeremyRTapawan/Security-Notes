import { PrismaClient } from "@prisma/client";

// Use the global prisma variable in dev to prevent multiple instances
const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}

export default prisma;
