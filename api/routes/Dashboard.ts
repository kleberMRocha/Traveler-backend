
import { Router } from 'express';
import multer from '../config/multerConfig';
import DashboardController from '../controller/DashboardController';
import checkToken from './medlewares/checkToken';

const routes = Router();
const dashboardController = new DashboardController();

routes
.post('/dashboard/upload', checkToken, multer.single('csv'), async (req, res, next) => {
    return dashboardController.upload(req, res, next)
})
.post('/dashboard/upload/:type', checkToken, multer.single('csv'), async (req, res, next) => {
    return dashboardController.uploadAttraction(req, res, next)
})
.get('/dashboard', checkToken, (req, res, next) => {
  return dashboardController.getCardsValue(req, res, next)
})
.get('/dashboard/filter', checkToken, (req, res, next) => {
  return dashboardController.getCardsValueFilter(req, res, next)
});

export default routes;
