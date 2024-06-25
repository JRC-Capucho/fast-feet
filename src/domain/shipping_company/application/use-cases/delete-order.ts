import { Either, left, right } from '@/core/either';
import { Order } from '../../entenprise/entities/order';
import { IOrderRepository } from '../repositories/order-repository';
import { OrderNotFoundError } from './errors/order-not-found-error';

interface IDeleteOrderUseCaseRequest {
  orderId: string;
}

type IDeleteOrderUseCaseResponse = Either<Error, { order: Order }>;

export class DeleteOrderUseCase {
  constructor(private orderRepository: IOrderRepository) { }

  async execute({
    orderId,
  }: IDeleteOrderUseCaseRequest): Promise<IDeleteOrderUseCaseResponse> {
    const order = await this.orderRepository.findById(orderId);

    if (!order) {
      return left(new OrderNotFoundError());
    }

    await this.orderRepository.delete(order);

    return right({ order });
  }
}
