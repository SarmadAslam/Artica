import express from 'express';
const router = express.Router();

import * as artController from "../controllers/art_controller.js";
import { verifyToken } from '../utils/verifyToken.js';

router.post('/create', verifyToken, artController.createArt);

router.get('/all', artController.getAllArts);

router.get('/getById/:id', artController.getArtById);

router.put('/update/:id', verifyToken, artController.updateArt);

router.delete('/delete/:id', verifyToken, artController.deleteArt);

export default router;
