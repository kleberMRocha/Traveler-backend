import { Request, Response } from 'express';
import dotenv from 'dotenv';
import GetRepostitory from './GetRepostitory';

import { Review } from '../infra/entity/Review';

dotenv.config();

class ReviewController {
  public async create(req: Request, res: Response) {
    if (!req.body) return res.status(400).json({ message: 'Informações insuficientes' });
    const review = GetRepostitory.repostitory(Review);
    const newReview = review.create(req.body);
    let result;

    try {
      result = await review.save(newReview);
    } catch (error) {
      return res.status(500)
        .json({ message: 'Houve um erro' });
    }

    return res.status(200)
      .json(result);
  }
  public async index(req: Request, res: Response) {
    const review = GetRepostitory.repostitory(Review);
    let result;

    try {
      result = await review.find({
        relations: ['attraction'],
      });
    } catch (error) {
      console.log(error);
      return res.status(500)
        .json({ message: 'Houve um erro' });
    }

    return res.status(200)
      .json(result);
  }
  public async publish(req: Request, res: Response) {
    if (!req.params) return res.status(400);
    if (!req.body) {
      return res.status(400)
        .json({ message: 'Informações insuficientes' });
    }

    const review = GetRepostitory.repostitory(Review);
  
    const isRviewExist = await review.findOne(req.params);
    if (!isRviewExist) return res.status(400).json({ message: 'Registro não existe' });

    try {
      await review.update(req.params, {...isRviewExist, isPublished: !isRviewExist.isPublished});
      return res.status(200).json({ message: isRviewExist.isPublished ? 'Review publicação revertida' :'Review aprovada' });
    } catch (error) {
      console.log(error);
      return res.status(500)
        .json({ message: 'Houve um erro' });
    }


  }

 

}

export default ReviewController;
