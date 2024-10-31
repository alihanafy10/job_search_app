import { Schema,Types, model } from "mongoose";
const schema = new Schema(
  {
    jobTitle:String,
    jobLocation:{
        type:String,
        enum:['onsite','remorely','hybrid']
    },
    workingTime:{
        type:String,
        enum:['full-time','part-time']
    },
    seniorityLevel:{
        type:String,
        enum:['Junior', 'Mid-Level', 'Senior','Team-Lead', 'CTO']
    },
    jobDescription:String,
    technicalSkills:[String],
    softSkills:[String],
    addedBy:{
        type:Types.ObjectId,
        ref:"User"
    },
    company:{
      type:Types.ObjectId,
        ref:"Company"
    }
   
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Job=model('Job',schema)