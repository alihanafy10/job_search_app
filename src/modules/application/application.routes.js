import { Router } from "express";

import { systemRoles } from "../../utils/system.roles.js";
import { validationMiddleware } from "../../middleware/validation.js";
import { auth } from "../../middleware/auth.js";
import { authorization } from "../../middleware/Authorization.js";
import { addApplication, getAllAppForSpecificJob } from "./application.controller.js";
import { addApplicationSchema, getAllAppForSpecificJobSchema } from "./application.schema.js";

const {COMPANY_HR,USER}=systemRoles
const applicationRouter = Router();


applicationRouter.post('/apply-application',validationMiddleware(addApplicationSchema),auth,authorization([USER]),addApplication)
applicationRouter.get('/getAllAppForSpecificJob/:id',validationMiddleware(getAllAppForSpecificJobSchema),auth,authorization([COMPANY_HR]),getAllAppForSpecificJob)



export default applicationRouter;

