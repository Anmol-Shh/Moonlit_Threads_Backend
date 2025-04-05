
import express from 'express';
import { fetchMenImages } from '../controllers/mensImageController.js';
import { fetchWomenImages } from '../controllers/womensImageController.js';
import { fetchDropImages } from '../controllers/dropImageController.js';
import { fetchFragranceImages } from '../controllers/fragranceController.js';

const router = express.Router();

router.get('/menImages', fetchMenImages);
router.get('/womenImages', fetchWomenImages);
router.get('/dropImages', fetchDropImages);
router.get('/fragranceImages', fetchFragranceImages);  
export default router;
