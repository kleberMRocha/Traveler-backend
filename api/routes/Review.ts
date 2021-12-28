import { Router } from 'express';
import ReviewController from '../controller/ReviewController';
import checkToken from './medlewares/checkToken';
import multer from '../config/multerConfig';
import {deleteFile, uploadFiles} from '../infra/storage';

const routes = Router();
const reviewController = new ReviewController();

routes
.get('/review', async (req, res) => reviewController.index(req, res))
.post('/review', multer.single('img'), uploadFiles, async (req, res) => reviewController.create(req, res))
.put('/review/:id', checkToken, async (req, res) => reviewController.publish(req, res))
.delete('/review/:id', checkToken, deleteFile, async (req, res) => reviewController.delete(req, res))
export default routes;
