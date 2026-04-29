import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function checkAuth() {
  console.log("Checking DB...");
  const user = await prisma.user.findUnique({
    where: { email: "admin@12xdesk.com" },
  });

  if (!user) {
    console.log("❌ User not found in DB.");
    return;
  }

  console.log("✅ User found:", user.email);
  console.log("Hashed password in DB:", user.password);

  const isValid = await bcrypt.compare("password123", user.password!);
  console.log("Password valid?", isValid);
}

checkAuth()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
