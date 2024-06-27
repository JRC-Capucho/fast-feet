import { Either, right } from '@/core/either';
import { Order } from '../../entenprise/entities/order';
import { IOrderRepository } from '../repositories/order-repository';

interface ICreateOrderUseCaseRequest {
  item: string;
  status: string;
  isAvaliable: boolean;
  destinatarioId: string;
}

type ICreateOrderUseCaseResponse = Either<Error, { order: Order }>;

export class CreateOrderUseCase {
  constructor(private orderRepository: IOrderRepository) {}
  async execute({
    item,
    status,
    destinatarioId,
    isAvaliable,
  }: ICreateOrderUseCaseRequest): Promise<ICreateOrderUseCaseResponse> {
    const order = Order.create({
      recipientId: destinatarioId,
      isAvaliable,
      status,
      item,
    });

    await this.orderRepository.create(order);

    return right({ order });
  }
}
