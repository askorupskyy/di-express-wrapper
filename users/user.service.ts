import { UserRepository } from './user.repository';
import { Route } from '../lib/decorators/Route';
import { Request, Response } from 'express';
import { Service } from '../lib/decorators/Service';

@Service()
export class UserService {
  constructor(private userRepository: UserRepository) { }

  @Route('get', '/:id')
  getUsers(_req: Request, res: Response) {
    return res.send(this.userRepository.getUsers());
  }
}
