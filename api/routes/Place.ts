import { Router } from 'express';
import PlaceController from '../controller/PlaceController';
import checkToken from './medlewares/checkToken';

const routes = Router();
const placeController = new PlaceController();

routes
  .post('/places', checkToken, async (req, res) => placeController.create(req, res))
  .get('/places', async (req, res) => placeController.index(req, res))
  .get('/places/:id', async (req, res) => placeController.indexById(req, res))
  .put('/places/:id', checkToken, async (req, res) => placeController.update(req, res))
  .delete('/places/:id', checkToken, async (req, res) => placeController.delete(req, res));

export default routes;
