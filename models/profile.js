import mongoose, { Schema, models } from "mongoose";

const profileSchema = new Schema(
  {
    
    name: {
        type: String,
    },
    email:{
      type:String,
    },
    location: {
        type: String,
      
    },
    occupation: {
      type: String,
 
    },
    bio: {
        type: String,
    },
    dp:{
        type:String,
    }
  },
  { timestamps: true }
);
const Profile = models?.Profile || mongoose.model("Profile", profileSchema);

export default Profile;

// mobile sndown thai gayou
