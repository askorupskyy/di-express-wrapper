import { ProductDTO } from './products.dto';

export class ProductRepository {
  private products: ProductDTO[] = [];
  constructor() {
    this.products = [{
      id: 1,
      name: 'Shoes',
      price: 20.0,
      description: "New fancy shoes",
      status: 'Restocked',
      owner: 1,
    }];
  }

  getProducts() {
    return this.products.map;
  }

  getProduct(id: number): ProductDTO | undefined {
    return this.products.find(product => product.id === id);
  }
}
