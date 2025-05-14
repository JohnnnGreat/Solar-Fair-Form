import mongoose from "mongoose";

const RegistrationSchema = new mongoose.Schema({
  organisationName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Prefer not to say"],
  },
  categorisation: {
    type: String,
    required: true,
    enum: ["Customer", "Business", "Solar company", "Financiers", "Development Agency"],
  },
  registeredOnMarketplace: {
    type: Boolean,
    required: true,
  },
  interests: {
    type: String,
  },
  permissionForFutureEvents: {
    type: Boolean,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Registration || mongoose.model("Registration", RegistrationSchema);
