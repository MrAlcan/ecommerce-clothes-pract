import { PrismaClient } from "../../generated/prisma";


export const prisma = new PrismaClient({ datasourceUrl: import.meta.env.DATABASE_URL });