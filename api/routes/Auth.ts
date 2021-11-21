import { Router } from 'express';
import AuthController from '../controller/AuthController';

const routes = Router();
const authController = new AuthController();

routes.post('/auth', async (req, res) => authController.AuthUser(req, res));

export default routes;
