import { Router } from "express";
import * as uc from "./user.controller.js"
import expressAsyncHandler from "express-async-handler";
import { auth } from "../../middleware/auth.js";
import {validation} from "../../middleware/validation.js"

import { signUpSchema } from "./user.validationSchema.js";
import { signInSchema } from "./user.validationSchema.js";
import { updateSchema } from "./user.validationSchema.js";
import { deleteSchema } from "./user.validationSchema.js";
import { getProfileSchema } from "./user.validationSchema.js";
import { getDataSchema } from "./user.validationSchema.js";
import { updatePassSchema } from "./user.validationSchema.js";
import { recoveryEmailSchema } from "./user.validationSchema.js";
import { getToken } from "./user.validationSchema.js";
import { forgetPass } from "./user.validationSchema.js";

const router = Router()

router.post('/', expressAsyncHandler(uc.signUp))

router.post('/login', validation(signInSchema), expressAsyncHandler(uc.signIn))

router.put('/:id', validation(updateSchema), auth(['Company_HR', 'User']), expressAsyncHandler(uc.updateAcc))

router.delete('/:id', validation(deleteSchema), auth(['Company_HR', 'User']), expressAsyncHandler(uc.deleteAcc))

router.get('/myprofile/:id', validation(getProfileSchema), auth(['Company_HR', 'User']), expressAsyncHandler(uc.getAcc))

router.get('/account/:id', validation(getDataSchema), auth(['Company_HR', 'User']), expressAsyncHandler(uc.getUser))

router.patch('/:id', validation(updatePassSchema), auth(['Company_HR', 'User']), expressAsyncHandler(uc.updatePass))

router.post('/recoveryEmail', validation(recoveryEmailSchema), expressAsyncHandler(uc.recoveryEmail))

router.post('/getToken',  expressAsyncHandler(uc.getToken))

router.post('/forgetPass', validation(forgetPass), expressAsyncHandler(uc.forgetPass))


export default router;

