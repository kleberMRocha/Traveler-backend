import { Request, Response } from 'express';
import dotenv from 'dotenv';
import GetRepostitory from './GetRepostitory';

import { Place } from '../infra/entity/Place';

dotenv.config();

class PlaceController {
  public async create(req: Request, res: Response) {
    if (!req.body) return res.status(400).json({ message: 'Informações insuficientes' });
    const place = GetRepostitory.repostitory(Place);
    const newPlace = place.create(req.body);
    let result;

    try {
      result = await place.save(newPlace);
    } catch (error) {
      return res.status(500)
        .json({ message: 'Houve um erro' });
    }

    return res.status(200)
      .json(result);
  }

  public async index(req: Request, res: Response) {
    const place = GetRepostitory.repostitory(Place);
    let result;

    try {
      result = await place.findAndCount();
    } catch (error) {
      return res.status(500)
        .json({ message: 'Houve um erro' });
    }

    return res.status(200)
      .json(result);
  }

  public async indexById(req: Request, res: Response) {
    if (!req.params) return res.status(400);
    const place = GetRepostitory.repostitory(Place);
    let result;

    try {
      result = await place.findOne(req.params);
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
    const place = GetRepostitory.repostitory(Place);

    const isPlaceExist = await place.findOne(req.params);
    if (!isPlaceExist) return res.status(400).json({ message: 'Registro não existe' });

    try {
      await place.update(req.params, req.body);
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

    const {place_name, place_desc, img_url} = req.body;
    const place = GetRepostitory.repostitory(Place);

    const isPlaceExist = await place.findOne(req.params);
    if (!isPlaceExist) return res.status(400).json({ message: 'Registro não existe' });

    try {

      // await place.update(req.params, {place_name, place_desc, img_url});
      return res.status(200).json({ message: 'registro atualizado' });
    } catch (error) {
      console.log(error);
      return res.status(500)
        .json({ message: 'Houve um erro' });
    }
  }


  public async delete(req: Request, res: Response) {
    if (!req.params) return res.status(400);

    const place = GetRepostitory.repostitory(Place);

    const isPlaceExist = await place.findOne(req.params);
    if (!isPlaceExist) return res.status(400).json({ message: 'Registro não existe' });

    try {
      await place.delete(req.params);
      return res.status(200).json({ message: 'registro excluido' });
    } catch (error) {
      return res.status(500)
        .json({ message: 'Houve um erro' });
    }
  }
}

export default PlaceController;
