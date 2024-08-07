import mongoose, { Schema, models } from "mongoose";

const eventSchema = new Schema(
  {
    title: { type: String },
    // user: {type: mongoose.Schema.Types.ObjectId,ref: 'User'},
    location: { type: String },
    price: { type: String },
    description: { type: String },
    image: { type: String },
    latitude: { type: Number },
    longitude: { type: Number },
  },

  // {
  //   usernae:{
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
