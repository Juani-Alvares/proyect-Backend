import mongoose from "mongoose";

const adoptionSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true
    },

    pet: {
      type: String,
      required: true
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending"
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Adoption", adoptionSchema);