import { Router } from 'express';
import PlaceController from '../controller/PlaceController';
import checkToken from './medlewares/checkToken';
import multer from '../config/multerConfig';
import {updateFiles,uploadFiles} from '../infra/storage';

const routes = Router();
const placeController = new PlaceController();

routes
  .post('/places', checkToken, multer.single('img'), uploadFiles, async (req, res) => placeController.create(req, res))
  .get('/places', async (req, res) => placeController.index(req, res))
  .get('/places/:id', async (req, res) => placeController.indexById(req, res))
  .put('/places/:id', checkToken, async (req, res) => placeController.update(req, res))
  .put('/places/img/:id', checkToken, multer.single('img'), updateFiles, async (req, res) => placeController.updateImg(req, res))
  .delete('/places/:id', checkToken, async (req, res) => placeController.delete(req, res));

export default routes;
