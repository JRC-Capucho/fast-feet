import { Either, left, right } from '@/core/either';
import { Order } from '../../entenprise/entities/order';
import { IOrderRepository } from '../repositories/order-repository';
import { OrderNotFoundError } from './errors/order-not-found-error';

interface IEditOrderUseCaseRequest {
  orderId: string;
  status: string;
  recipientId: string;
  item: string;
  isAvaliable: boolean;
}

type IEditOrderUseCaseResponse = Either<Error, { order: Order }>;

export class EditOrderUseCase {
  constructor(private orderRepository: IOrderRepository) {}

  async execute({
    orderId,
    isAvaliable,
    recipientId,
    item,
    status,
  }: IEditOrderUseCaseRequest): Promise<IEditOrderUseCaseResponse> {
    const order = await this.orderRepository.findById(orderId);

    if (!order) {
      return left(new OrderNotFoundError());
    }

    order.status = status;
    order.recipientId = recipientId;
    order.item = item;
    order.isAvaliable = isAvaliable;

    await this.orderRepository.save(order);

    return right({ order });
  }
}
