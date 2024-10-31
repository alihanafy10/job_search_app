import { Job } from "../../../DataBase/model/Job.model.js";
import { catchError } from "../../middleware/error-handdling.js";
import { AppEroor } from "../../utils/appError.js";

const addJob=catchError(async(req,res,next)=>{
    console.log(req.body)
    const data=await Job.create(req.body)
    res.status(201).json({message:'success', data})
})

const ubdateJob=catchError(async(req,res,next)=>{
    const {jobTitle,jobLocation,workingTime,seniorityLevel,jobDescription,technicalSkills,softSkills}=req.body
    const data=await Job.findByIdAndUpdate(req.params.id,{jobTitle,jobLocation,workingTime,seniorityLevel,jobDescription,technicalSkills,softSkills},{new:true})
    res.status(201).json({message:'success', data})
})
const deleteJob=catchError(async(req,res,next)=>{
   await Job.findByIdAndDelete(req.params.id)
    res.status(201).json({message:'success'})
})

const getAllJobWithCompany=catchError(async(req,res,next)=>{
    const data=await Job.find({}).populate('company')
    res.status(200).json({message:'success',data})
})


const getAllJob=catchError(async(req, res, next)=>{
    const { workingTime, jobLocation, seniorityLevel, jobTitle, technicalSkills } = req.query;
    console.log(req.query);
    let filter = {};

  if (workingTime) filter.workingTime = workingTime;
  if (jobLocation) filter.jobLocation = jobLocation;
  if (seniorityLevel) filter.seniorityLevel = seniorityLevel;
  if (jobTitle) filter.jobTitle =  jobTitle;
  if (technicalSkills) filter.technicalSkills = { $in: technicalSkills.split(',') };

console.log(filter);

  const jobs = await Job.find(filter).lean();
  res.status(200).json({ message: 'success', jobs });
})
export{
    addJob,
    ubdateJob,
    deleteJob,
    getAllJobWithCompany,
    getAllJob
}