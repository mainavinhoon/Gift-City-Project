import mongoose, { Schema, models } from "mongoose";

const postSchema = new Schema(
  {
    username: { 
      type:String,
    
    },
    // likes: { type: String },
    // comments: { type: String },
    description: { type: String },
    image: {type: String},

    likes:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Like",
  },

    comments:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Comment",
  }
    // date:Date.now(),
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
const Post = models?.Post || mongoose.model("Post", postSchema);

export default Post;

// mobile sndown thai gayou
