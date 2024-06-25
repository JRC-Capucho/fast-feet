import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import {
  IOrderProps,
  Order,
} from '@/domain/shipping_company/entenprise/entities/order';
import { faker } from '@faker-js/faker';

export function makeOrder(
  override: Partial<IOrderProps> = {},
  id?: UniqueEntityId,
) {
  const order = Order.create(
    {
      item: faker.commerce.product(),
      status: faker.helpers.arrayElement([
        'pending',
        'delivered',
        'available_for_pickup',
        'returned',
      ]),
      recipientId: faker.string.uuid(),
      ...override,
    },
    id,
  );

  return order;
}
