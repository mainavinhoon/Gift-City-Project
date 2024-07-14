import mongoose, { Schema, models } from "mongoose";

const commentSchema = new Schema({
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post",
    },
    username:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    body:{
        type:String,
        required:true
    }
})
const Comment = models?.Comment || mongoose.model("Comment", commentSchema);

export default Comment;