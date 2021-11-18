import { Router } from 'express';

const routes = Router();

routes.get('/', (req, res) => {
    console.log(req)
    res.send('Bom dia');
});

export default routes;