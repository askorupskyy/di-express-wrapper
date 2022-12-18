import express from 'express';
import { UserRepository } from './users/user.repository';
import { UserService } from './users/user.service';
import { UserModule } from './users/user.module';

const app = express();
UserModule(app);

app.listen(3000, () => {
  console.log('Listening on port 3000');
})
