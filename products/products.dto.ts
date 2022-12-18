import { UserDTO } from "../users/user.dto";

export type ProductDTO = {
  id: number;
  name: string;
  price: number;
  description: string;
  status: 'Restocked' | 'Low Stock' | 'Sold Out';
  owner: number | UserDTO;
}
