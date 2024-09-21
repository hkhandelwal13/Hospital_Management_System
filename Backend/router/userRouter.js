import express from 'express';
import { isAdminAuthenticated,isPatientAuthenticated } from '../middlewares/auth.js';
import { addNewAdmin, patientRegister } from "../controller/userController.js";
import {login} from "../controller/userController.js";
const router = express.Router();

router.post("/patient/register",patientRegister);
router.post("/login",login);
router.post("/admin/addnew",isAdminAuthenticated,addNewAdmin);



export default router;

