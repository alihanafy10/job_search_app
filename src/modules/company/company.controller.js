import { Company } from "../../../DataBase/model/Company.model.js";
import { Job } from "../../../DataBase/model/Job.model.js";
import { catchError } from "../../middleware/error-handdling.js";
import {AppEroor} from "../../utils/appError.js"

const addCompany=catchError(async(req,res,next)=>{
const data=await Company.create(req.body)
res.status(201).json({message:'success',data})
})

const updateCompany=catchError(async(req,res,next)=>{
    //destruct data from body
    const{companyName,description,industry,address,numberOfEmployees,companyEmail}=req.body
    //update company
    const data=await Company.findByIdAndUpdate(req.params.id,{
        companyName,description,industry,address,numberOfEmployees,companyEmail
    },{new:true})
    res.status(201).json({message:'success',data})
})

const deleteCompany=catchError(async(req,res,next)=>{
    //delete company
    const data=await Company.findByIdAndDelete(req.params.id)
    res.status(201).json({message:'success',data})
})

//get all jobs bay a company
const getCompany=catchError(async(req,res,next)=>{
    if(req.query.companyName){
        //get company data
   let data=await Company.findOne({companyName:req.query.companyName}).populate('companyHR').lean()
   //get jobs
    const jobs=await Job.find({addedBy:data.companyHR._id})

    return res.status(200).json({message:'success',jobs})
    }

const data=await Job.find({
    company:req.params.id})
    res.status(200).json({message:'success',data})
})

//get company by name
const searchCompany=catchError(async(req,res,next)=>{
    const data=await Company.findOne({companyName:req.query.name})
    res.status(200).json({message:'success',data})
})

export{
    addCompany,
    updateCompany,
    deleteCompany,
    getCompany,
    searchCompany
}