import { Application } from "../../../DataBase/model/Application.model.js";
import { catchError } from "../../middleware/error-handdling.js";

const addApplication=catchError(async(req,res,next)=>{
    const data=await Application.create(req.body)
    res.status(201).json({message:'success', data})
})

const getAllAppForSpecificJob=catchError(async(req,res,next)=>{
const data=await Application.find({jobId:req.params.id}).populate('userId')
res.status(200).json({message:'success', data})
})

export{
    addApplication,
    getAllAppForSpecificJob
}