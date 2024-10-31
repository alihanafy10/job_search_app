import { Router } from "express";
import { systemRoles } from "../../utils/system.roles.js";
import { addJob, deleteJob, getAllJob, getAllJobWithCompany, ubdateJob } from "./job.controller.js";
import { validationMiddleware } from "../../middleware/validation.js";
import { addJobSchema, deleteJobSchema, getAllJobSchema, getAllJobWithCompanySchema, updateJobSchema } from "./job.schema.js";
import { auth } from "../../middleware/auth.js";
import { authorization } from "../../middleware/Authorization.js";


const {COMPANY_HR,USER}=systemRoles
const jobRouter = Router();

jobRouter.post('/add-job',validationMiddleware(addJobSchema),auth,authorization([COMPANY_HR]),addJob)
jobRouter.put('/update-job/:id',validationMiddleware(updateJobSchema),auth,authorization([COMPANY_HR]),ubdateJob)
jobRouter.delete('/delete-job/:id',validationMiddleware(deleteJobSchema),auth,authorization([COMPANY_HR]),deleteJob)
jobRouter.get('/getAllJobWithCompany-job',validationMiddleware(getAllJobWithCompanySchema),auth,authorization([COMPANY_HR,USER]),getAllJobWithCompany)
jobRouter.get('/getAll-job',validationMiddleware(getAllJobSchema),auth,authorization([COMPANY_HR,USER]),getAllJob)







export default jobRouter;

