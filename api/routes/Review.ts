import { Router } from 'express';
import ReviewController from '../controller/ReviewController';
import checkToken from './medlewares/checkToken';
import multer from '../config/multerConfig';
import {uploadFiles} from '../infra/storage';

const routes = Router();
const reviewController = new ReviewController();

routes
.post('/review', checkToken, multer.single('img'), uploadFiles, async (req, res) => reviewController.create(req, res))
.put('/review/:id', checkToken, async (req, res) => reviewController.publish(req, res))
.get('/review', async (req, res) => reviewController.index(req, res));
export default routes;
