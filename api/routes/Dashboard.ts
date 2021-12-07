
import { Router } from 'express';
import multer from '../config/multerConfig';
import DashboardController from '../controller/DashboardController';
import checkToken from './medlewares/checkToken';

const routes = Router();
const dashboardController = new DashboardController();

routes.post('/dashboard/upload', checkToken, multer.single('csv'), async (req, res) => {
    return dashboardController.upload(req, res)
});

export default routes;
