import { ProductRepository } from './products.repository';
import { UserRepository } from '../users/user.repository';
import { Route } from '../lib/decorators/Route';
import { Request, Response } from 'express';
import { Service } from '../lib/decorators/Service';
import { Middleware } from '../lib/decorators/Middleware';

@Service()
export class ProductService {
  constructor(private userRepository: UserRepository, private productRepository: ProductRepository) { }

  @Middleware((req: Request, _res: Response, next: Function) => {
    console.log(`${req.method} request from ${req.ip}`);
    next();
  })
  @Route('get', '/:id')
  getProduct(req: Request, res: Response) {
    const { id } = req.params;
    const product = this.productRepository.getProduct(parseInt(id));

    if (product)
      return res.send({ ...product, owner: this.userRepository.getUser(product.owner as number) });

    return res.status(404).send({});
  }
}
