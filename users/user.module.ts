import { Application } from 'express';
import { ModuleFactory } from '../lib/module-processor';

import { UserService } from './user.service';
import { UserRepository } from './user.repository';

export const UserModule = (app: Application) => {
  new ModuleFactory(app, '/api/users').create([UserService], [UserRepository]);
}
