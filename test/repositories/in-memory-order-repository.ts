import {
  IFindManyNearbyParams,
  IOrderRepository,
} from '@/domain/shipping_company/application/repositories/order-repository';
import { Order } from '@/domain/shipping_company/entenprise/entities/order';
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordenates';

export class InMemoryOrderRepository implements IOrderRepository {
  public items: Order[] = [];

  async findById(id: string): Promise<Order | null> {
    const order = this.items.find((item) => item.id.toString() === id);

    if (!order) {
      return null;
    }

    return order;
  }

  async create(order: Order): Promise<void> {
    this.items.push(order);
  }

  async save(order: Order): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === order.id);

    this.items[itemIndex] = order;
  }

  async delete(order: Order): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === order.id);

    this.items.splice(itemIndex, 1);
  }

  async findManyNearby(params: IFindManyNearbyParams) {
    return this.items.filter((item) => {
      const distance = getDistanceBetweenCoordinates(
        { latitude: params.latitude, longitude: params.longitude },
        {
          latitude: item.latitude,
          longitude: item.longitude,
        },
      );

      return distance < 10;
    });
  }
}
