import { EntityTarget, getRepository, Repository } from 'typeorm';

class GetRepostitory {
  static repostitory(repository:EntityTarget<any>):Repository<any> {
    return getRepository(repository);
  }
}

export default GetRepostitory;
