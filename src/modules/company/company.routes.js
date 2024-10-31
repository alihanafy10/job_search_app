import { Router } from "express";
import { addCompany, deleteCompany, getCompany, searchCompany, updateCompany } from "./company.controller.js";
import { validationMiddleware } from "../../middleware/validation.js";
import { addCompanySchema, deleteCompanySchema, getCompanySchema, searchCompanySchema, updateCompanySchema } from "./company.schema.js";
import { auth } from "../../middleware/auth.js";
import { authorization } from "../../middleware/Authorization.js";
import { systemRoles } from "../../utils/system.roles.js";
import { checkExistingCompany } from "../../middleware/check-companyName-and-email-existing.js";

const {COMPANY_HR,USER}=systemRoles
const companyRouter = Router();

companyRouter.post('/add-company',validationMiddleware(addCompanySchema),auth,authorization([COMPANY_HR]),checkExistingCompany,addCompany)
companyRouter.put('/update-company/:id',validationMiddleware(updateCompanySchema),auth,authorization([COMPANY_HR]),checkExistingCompany,updateCompany)
companyRouter.delete('/delete-company/:id',validationMiddleware(deleteCompanySchema),auth,authorization([COMPANY_HR]),deleteCompany)
companyRouter.get('/get-company/:id',validationMiddleware(getCompanySchema),auth,authorization([COMPANY_HR]),getCompany)
companyRouter.get('/search-company',validationMiddleware(searchCompanySchema),auth,authorization([COMPANY_HR,USER]),searchCompany)







export default companyRouter;

