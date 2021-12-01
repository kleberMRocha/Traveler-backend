import { Express } from 'express';
import Auth from './Auth';
import Place from './Place';
import Attractions from './Attractions';
import Review from './Review';

const app = (App: Express) => App.use(
    Auth, 
    Place, 
    Attractions, 
    Review
);

export default app;
