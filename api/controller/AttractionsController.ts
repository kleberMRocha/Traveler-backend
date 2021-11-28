import { Request, Response } from 'express';
import dotenv from 'dotenv';
import GetRepostitory from './GetRepostitory';

import { Attractions } from '../infra/entity/attractions';

dotenv.config();

class AttractionsController {
  public async create(req: Request, res: Response) {
    if (!req.body) return res.status(400).json({ message: 'Informações insuficientes' });
    const attraction = GetRepostitory.repostitory(Attractions);
    const newAttraction = attraction.create(req.body);
    let result;

    try {
      result = await attraction.save(newAttraction);
    } catch (error) {
      console.log(error);
      return res.status(500)
        .json({ message: 'Houve um erro' });
    }

    return res.status(200)
      .json(result);
  }

  public async index(req: Request, res: Response) {
    const attraction = GetRepostitory.repostitory(Attractions);
    let result;

    try {
      result = await attraction.find({
        relations: ['place'],
      });
    } catch (error) {
      return res.status(500)
        .json({ message: 'Houve um erro' });
    }

    return res.status(200)
      .json(result);
  }

  public async indexById(req: Request, res: Response) {
    if (!req.params) return res.status(400);
    const attraction = GetRepostitory.repostitory(Attractions);
    let result;

    try {
      result = await attraction.findOne(req.params);
    } catch (error) {
      return res.status(500)
        .json({ message: 'Houve um erro' });
    }

    if (!result) {
      return res.status(204)
        .json({
          message: 'Nada encontrado',
        });
    }

    return res.status(200)
      .json(result);
  }

  public async update(req: Request, res: Response) {
    if (!req.params) return res.status(400);
    if (!req.body) {
      return res.status(400)
        .json({ message: 'Informações insuficientes' });
    }
    const attraction = GetRepostitory.repostitory(Attractions);

    const isattractionExist = await attraction.findOne(req.params);
    if (!isattractionExist) return res.status(400).json({ message: 'Registro não existe' });

    try {
      await attraction.update(req.params, req.body);
      return res.status(200).json({ message: 'registro atualizado' });
    } catch (error) {
      return res.status(500)
        .json({ message: 'Houve um erro' });
    }
  }

  public async updateImg(req: Request, res: Response) {
    if (!req.params) return res.status(400);
    if (!req.body) {
      return res.status(400)
        .json({ message: 'Informações insuficientes' });
    }

    const {img_url} = req.body;
    const attraction = GetRepostitory.repostitory(Attractions);
  
    const isattractionExist = await attraction.findOne(req.params);
    if (!isattractionExist) return res.status(400).json({ message: 'Registro não existe' });


    try {
      await attraction.update(req.params, {...isattractionExist, img_url});
      return res.status(200).json({ message: 'registro atualizado' });
    } catch (error) {
      console.log(error);
      return res.status(500)
        .json({ message: 'Houve um erro' });
    }
  }


  public async delete(req: Request, res: Response) {
    if (!req.params) return res.status(400);

    const attraction = GetRepostitory.repostitory(Attractions);

    const isattractionExist = await attraction.findOne(req.params);
    if (!isattractionExist) return res.status(400).json({ message: 'Registro não existe' });

    try {
      await attraction.delete(req.params);
      return res.status(200).json({ message: 'registro excluido' });
    } catch (error) {
      return res.status(500)
        .json({ message: 'Houve um erro' });
    }
  }
}

export default AttractionsController;
