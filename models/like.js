import mongoose, { Schema, models } from "mongoose";

const likeSchema = new Schema({
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post",
    },
    username:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
})
const Like = models?.Like || mongoose.model("Like", likeSchema);

export default Like;