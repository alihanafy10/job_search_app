import { Schema,Types, model } from "mongoose";
const schema = new Schema(
  {
   companyName:{
    type:String,
    unique:true,
   },
   description:String,
   industry:String,
   address:String,
   numberOfEmployees:{
    type:Number,
    min:11,
    max:20
   },
   companyEmail:{
    type:String,
    unique:true,
   },
   companyHR:{
    type:Types.ObjectId,
    ref:"User",
   },
   
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Company=model('Company',schema)