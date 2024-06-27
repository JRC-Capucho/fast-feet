import { Either, left, right } from '@/core/either';
import { OrderNotFoundError } from './errors/order-not-found-error';
import { IOrderRepository } from '../repositories/order-repository';
import { Order } from '../../entenprise/entities/order';

interface IChangeStatusOrderUseCaseRequest {
  orderId: string;
  status: string;
  isAvaliable: boolean;
}

type IChangeStatusOrderUseCaseResponse = Either<
  OrderNotFoundError,
  { order: Order }
>;

export class ChangeStatusOrderUseCase {
  constructor(private orderRepository: IOrderRepository) {}

  async execute({
    orderId,
    status,
    isAvaliable,
  }: IChangeStatusOrderUseCaseRequest): Promise<IChangeStatusOrderUseCaseResponse> {
    const order = await this.orderRepository.findById(orderId);

    if (!order) {
      return left(new OrderNotFoundError());
    }

    order.status = status;
    order.isAvaliable = isAvaliable;

    await this.orderRepository.save(order);

    return right({ order });
  }
}
