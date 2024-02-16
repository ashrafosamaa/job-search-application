import { Router } from "express";
import * as companyController from "./company.controller.js"
import expressAsyncHandler from "express-async-handler";
import { auth } from "../../middleware/auth.js";
import { validation } from "../../middleware/validation.js";

import { addSchema } from "./company.validation.js";
import { updateSchema } from "./company.validation.js";
import { deleteSchema } from "./company.validation.js";
import { displaySchema } from "./company.validation.js";
import { searchSchema } from "./company.validation.js";
import { applicationForJobSchema } from "./company.validation.js";

const router = Router();

router.post('/', validation(addSchema), auth(['Company_HR']), expressAsyncHandler(companyController.addCompany))

router.put('/update', validation(updateSchema), auth(['Company_HR']), expressAsyncHandler(companyController.updateCompany))

router.delete('/', validation(deleteSchema), auth(['Company_HR']), expressAsyncHandler(companyController.deleteCompany))

router.get('/search/:companyId', validation(displaySchema), auth(['Company_HR']), expressAsyncHandler(companyController.getCompany))

router.get('/', validation(searchSchema), auth(['Company_HR', 'User']), expressAsyncHandler(companyController.searchCompany))

router.get('/applicationsForJob', validation(applicationForJobSchema), auth(['Company_HR']), expressAsyncHandler(companyController.allAppForJob))

export default router;