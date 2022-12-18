import express from 'express';
import { ProductModule } from './products/products.module';
import { UserModule } from './users/user.module';

const app = express();
UserModule(app);
ProductModule(app);

app.listen(3000, () => {
  console.log('Listening on port 3000');
})
