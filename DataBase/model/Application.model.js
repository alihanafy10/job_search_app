import { Schema,Types, model } from "mongoose";
const schema = new Schema(
  {
    jobId:{
        type:Types.ObjectId,
        ref:"Jop"
   },
   userId:{
    type:Types.ObjectId,
    ref:"User"
},
userTechSkills:[String],
userSoftSkills:[String],

  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Application=model('Application',schema)