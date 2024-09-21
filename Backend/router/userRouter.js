import express from 'express';
import { isAdminAuthenticated,isPatientAuthenticated } from '../middlewares/auth.js';
import { addNewAdmin, addNewDoctor, getAllDocters, getuserDetails, logoutAdmin, logoutPatient, patientRegister } from "../controller/userController.js";
import {login} from "../controller/userController.js";
const router = express.Router();

router.post("/patient/register",patientRegister);
router.post("/login",login);
router.post("/admin/addnew",isAdminAuthenticated,addNewAdmin);
router.get("/doctors",getAllDocters);

router.get("/admin/me",isAdminAuthenticated,getuserDetails);
router.get("/patient/me",isPatientAuthenticated,getuserDetails);

router.get("/admin/logout",isAdminAuthenticated,logoutAdmin);
router.get("/patient/logout",isPatientAuthenticated,logoutPatient);
router.post("/doctor/addnew",isAdminAuthenticated,addNewDoctor);



export default router;

