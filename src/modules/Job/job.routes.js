import { Router } from "express";
import * as jc from "./job.controller.js"
import expressAsyncHandler from "express-async-handler";
import { auth } from "../../middleware/auth.js";
import { validation } from "../../middleware/validation.js";
import { multerMiddleHost } from "../../middleware/multer.js";
import { allowedExtenstions } from "../../utils/allowedExtensions.js";

import { addSchema } from "./job.validation.js";
import { updateSchema } from "./job.validation.js";
import { deleteSchema } from "./job.validation.js";
import { getAllSchema } from "./job.validation.js";
import { getCompaniesSchema } from "./job.validation.js";
import { filterJobsSchema } from "./job.validation.js";
import { addAppSchema } from "./job.validation.js";

const router = Router();

router.post('/', validation(addSchema), auth(['Company_HR']), expressAsyncHandler(jc.addJob))

router.put('/', validation(updateSchema), auth(['Company_HR']), expressAsyncHandler(jc.updateJob))

router.delete('/', validation(deleteSchema), auth(['Company_HR']), expressAsyncHandler(jc.deleteJob))

router.get('/', validation(getAllSchema), auth(['Company_HR', 'User']), expressAsyncHandler(jc.getAllJobs))

router.get('/companies', validation(getCompaniesSchema), auth(['Company_HR', 'User']), expressAsyncHandler(jc.getCompaniesWithJobs))

router.get('/filter', validation(filterJobsSchema), auth(['Company_HR', 'User']), expressAsyncHandler(jc.filterJobs))

router.post('/addApplication', validation(addAppSchema), auth(['User']), multerMiddleHost({extensions: allowedExtenstions.document}).single('userResume'),expressAsyncHandler(jc.addApplication))

router.get('/getApplicationforDay', auth(['Company_HR']),expressAsyncHandler(jc.allAppInADay))

export default router;