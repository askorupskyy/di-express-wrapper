import { UserDTO } from './user.dto';

export class UserRepository {
  private users: UserDTO[] = [];
  constructor() {
    this.users = [{
      id: 1,
      name: 'John Doe',
      email: '',
      password: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    }];
  }

  getUsers() {
    return this.users;
  }

  getUser(id: number): UserDTO | undefined {
    return this.users.find(user => user.id === id);
  }

  createUser(user: UserDTO) {
    this.users.push(user);
  }
}
