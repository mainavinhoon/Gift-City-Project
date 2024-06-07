import mongoose, { Schema, models } from "mongoose";

const eventSchema = new Schema(
  {
    title: { type: String },

    location: { type: String },
    price: { type: String },
    description: { type: String },
    // img: "string (URL)",
  },

  // {
  //   username:{
  //     type:String,
  //     require:true,
  //   },
  //   email: {
  //     type: String,
  //     require: true,
  //   },

  //   password: {
  //     type: String,
  //     require: true,
  //   },
  //   confirmPassword: {
  //     type: String,
  //     require: true,
  //   },
  // },
  { timestamps: true }
);
const Event = models?.Event || mongoose.model("Event", eventSchema);

export default Event;

// mobile sndown thai gayou
