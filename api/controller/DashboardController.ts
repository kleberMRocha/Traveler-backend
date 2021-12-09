import { NextFunction, Request, Response } from 'express';
import csv from 'csvtojson';
import { getConnection } from 'typeorm';
import { Place } from '../infra/entity/Place';

class DashboardController {
  constructor() {}
  public async upload(req: Request, res: Response, next: NextFunction) {

    if (!req.file) return res.status(400);
    const stringCsv = req.file.buffer.toString('utf8');

    csv({ noheader: true, output: 'json' })
      .fromString(stringCsv)
      .then(async (response) => {

        const placesList = response.map(p => {
          return { 
           place_name: p.field1, 
           place_desc: p.field2, 
           img_url: '' 
         }
        });

        // Remove a primeira linha do csv
        const importValues = placesList.filter((v,i) => i !== 0);
    
         getConnection()
          .createQueryBuilder()
          .insert()
          .into(Place)
          .values(importValues)
          .execute()
          .then(response => {
            console.log(response);
            return res.status(200)
              .json({message: 'importação concluida com sucesso'})
          })
          .catch(e => {
            console.log(e);
            return res.status(500)
              .json({message: 'Houve um erro na importação'})
          })
          .finally(() => next())

      });

      
  }
}

export default DashboardController;
