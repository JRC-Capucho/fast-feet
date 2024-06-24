import { IUserRepository } from '@/domain/shipping_company/application/repositories/user-repository';
import { User } from '@/domain/shipping_company/entenprise/entities/user';

export class InMemoryUserRepository implements IUserRepository {
  public items: User[] = [];

  async findByCpf(cpf: string): Promise<User | null> {
    const user = this.items.find((item) => item.cpf === cpf);

    if (!user) {
      return null;
    }

    return user;
  }

  async create(user: User): Promise<void> {
    this.items.push(user);
  }

  async findById(id: string): Promise<User | null> {
    const user = this.items.find((item) => item.id.toString() === id);

    if (!user) {
      return null;
    }

    return user;
  }

  async save(user: User): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === user.id);

    this.items[itemIndex] = user;
  }

  async delete(user: User): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === user.id);

    this.items.splice(itemIndex, 1);
  }
}
