import { Router } from "express";
import {gerSearchForFLName,createUsers,getUsersByCedula}  from '../controllers/UsersController.js'

const router = Router();

router.get('/search', gerSearchForFLName);
router.post('/users', createUsers);
router.get('/users/:cedula', getUsersByCedula);



export default router;