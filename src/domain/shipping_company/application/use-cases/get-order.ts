import { Either, left, right } from '@/core/either';
import { Order } from '../../entenprise/entities/order';
import { IOrderRepository } from '../repositories/order-repository';
import { OrderNotFoundError } from './errors/order-not-found-error';

interface IGetOrderUseCaseRequest {
  orderId: string;
}

type IGetOrderUseCaseResponse = Either<Error, { order: Order }>;

export class GetOrderUseCase {
  constructor(private orderRepository: IOrderRepository) { }

  async execute({
    orderId,
  }: IGetOrderUseCaseRequest): Promise<IGetOrderUseCaseResponse> {
    const order = await this.orderRepository.findById(orderId);

    if (!order) {
      return left(new OrderNotFoundError());
    }

    return right({ order });
  }
}
