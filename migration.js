// migration-script.js
// Run this once to update existing records

import mongoose from "mongoose";
import { MONGODB_URI } from "./src/lib/mongodb.js";
import Registration from "./src/models/Registration.js";

async function migrateDatabase() {
   try {
      // Connect to your database
      await mongoose.connect(MONGODB_URI);

      console.log("Connected to database");

      // Update existing records that don't have the age field
      const result = await Registration.updateMany(
         { age: { $exists: false } }, // Find records without age field
         { $set: { age: "18 to 23" } }, // Set a default value (you might want to adjust this)
      );

      console.log(`Updated ${result.modifiedCount} records`);

      // Alternatively, if you want to remove records without age (not recommended)
      // const deleteResult = await Registration.deleteMany({ age: { $exists: false } });
      // console.log(`Deleted ${deleteResult.deletedCount} records without age field`);
   } catch (error) {
      console.error("Migration failed:", error);
   } finally {
      await mongoose.disconnect();
      console.log("Migration completed");
   }
}

// Run the migration
migrateDatabase();
