import {EntityTarget, getRepository, Repository} from 'typeorm';

class GetRepostitory{
   constructor(){}
   static repostitory(repository:EntityTarget<any>):Repository<any>{
        return getRepository(repository);
    }
}

export default GetRepostitory;

