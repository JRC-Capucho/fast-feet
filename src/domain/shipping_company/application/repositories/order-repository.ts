import { Order } from '../../entenprise/entities/order';

export abstract class IOrderRepository {
  abstract findById(id: string): Promise<Order | null>;

  abstract create(order: Order): Promise<void>;
  abstract save(order: Order): Promise<void>;
  abstract delete(order: Order): Promise<void>;
}
