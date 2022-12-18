import { Application } from 'express';
import { ModuleFactory } from '../lib/module-processor';

import { ProductService } from './products.service';
import { ProductRepository } from './products.repository';
import { UserRepository } from '../users/user.repository';

export const ProductModule = (app: Application) => {
  new ModuleFactory(app, '/api/products').create([ProductService], [UserRepository, ProductRepository]);
}
