import GetRepostitory from './GetRepostitory';
import fs from 'fs';
import { User } from '../infra/entity/User';
import { Request, Response } from 'express';
import csv from 'csvtojson';

class DashboardController {
  constructor(){}
  public async upload(req: Request, res: Response) {
  if(!req.file) return res.status(400);
   const stringCsv = (req.file.buffer.toString('utf8'));
   csv({noheader:true,output:'json'})
   .fromString(stringCsv)
    .then(res => console.log(res))
  }
}

export default DashboardController;
