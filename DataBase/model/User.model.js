import { Schema, model } from "mongoose";
const schema = new Schema(
  {
    firstName:String,
    lastName:String,
    userName:String,
    email:{
        type:String,
        unique:true,
    },
    password:String,
    recoveryEmail:{
      type:String,
      required:false,
    },
    DOB:Date,
    mobileNumber:{
        type:String,
        unique:true,
    },
    role:{
        type:String,
        enum:['User','Company_HR'],
        required:true,
        default:'User',
    },
    status:{
        type:String,
        enum:['online','offline'],
        default:'offline',
    },
    confirmEmail:{
      type:Boolean,
      default:false,
    },
    otp:{
      type:String,
      default:'',
    },
    endDateOpt:{
      type:Date,
      default:null
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const User=model('User',schema)