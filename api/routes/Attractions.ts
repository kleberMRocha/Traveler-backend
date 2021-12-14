import { Router } from 'express';
import AttractionsController from '../controller/AttractionsController';
import checkToken from './medlewares/checkToken';
import multer from '../config/multerConfig';
import {deleteFile, updateFiles,uploadFiles} from '../infra/storage';

const routes = Router();
const attractionsController = new AttractionsController();

routes
  .post('/attractions', checkToken, multer.single('img'), uploadFiles, async (req, res) => attractionsController.create(req, res))
  .get('/attractions', async (req, res) => attractionsController.index(req, res))
  .get('/attractions/:id', async (req, res) => attractionsController.indexById(req, res))
  .put('/attractions/:id', checkToken, async (req, res) => attractionsController.update(req, res))
  .put('/attractions/img/:id', checkToken, multer.single('img'), updateFiles, async (req, res) => attractionsController.updateImg(req, res))
  .delete('/attractions/:id', checkToken, deleteFile, async (req, res) => attractionsController.delete(req, res));

export default routes;
