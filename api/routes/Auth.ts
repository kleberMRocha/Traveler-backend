import { Router } from 'express';

const routes = Router();

routes.post('/auth', (req, res) => {
    res.send('Bom dia');
});

export default routes;