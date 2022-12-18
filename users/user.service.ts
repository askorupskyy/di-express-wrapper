import { UserRepository } from './user.repository';
import { Route } from '../lib/decorators/Route';
import { Request, Response } from 'express';
import { Service } from '../lib/decorators/Service';
import { Middleware } from '../lib/decorators/Middleware';

@Service()
export class UserService {
  constructor(private userRepository: UserRepository) { }

  @Middleware((req: Request, _res: Response, next: Function) => {
    console.log(`${req.method} request from ${req.ip}`);
    next();
  })
  @Route('get', '/:id')
  getUser(req: Request, res: Response) {
    const { id } = req.params;
    const user = this.userRepository.getUser(parseInt(id));
    if (user)
      return res.send(user);

    return res.status(404).send({});
  }

  @Route('get', '/')
  getUsers(_req: Request, res: Response) {
    return res.send(this.userRepository.getUsers())
  }
}
