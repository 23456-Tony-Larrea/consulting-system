import { Router } from "express";
import {createConadies,getConadies,getConadisBycedula} from '../controllers/conadiesController.js'

const router = Router();

router.get('/conadies', getConadies);
router.get('/conadies/:CEDULA', getConadisBycedula);
router.post('/conadies', createConadies);

export default router;