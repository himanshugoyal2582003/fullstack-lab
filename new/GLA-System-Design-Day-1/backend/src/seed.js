require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./db");
const Record = require("./models/Record");
const departments = ["AIML", "CSE", "IT", "ECE", "ME", "Civil"];

async function seed() {
  const count = Math.max(1, Number.parseInt(process.env.SEED_COUNT || "20000", 10));
  try {
    await connectDB();
    // Clears only this demo collection. Use a dedicated teaching database, never production.
    await Record.deleteMany({});
    const batchSize = 1000;
    for (let start = 0; start < count; start += batchSize) {
      const end = Math.min(start + batchSize, count);
      const batch = [];
      for (let i = start; i < end; i++) {
        batch.push({ name: `Student ${String(i + 1).padStart(6, "0")}`, email: `student${i + 1}@example.test`, department: departments[i % departments.length], score: (i * 17) % 101 });
      }
      await Record.insertMany(batch, { ordered: false });
      console.log(`Seeded ${end}/${count}`);
    }
    console.log(`Seed complete: ${count} records`);
  } catch (error) {
    console.error("Seed failed:", error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}
seed();
