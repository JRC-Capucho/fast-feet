import { InMemoryOrderRepository } from 'test/repositories/in-memory-order-repository';
import { EditOrderUseCase } from './edit-order';
import { makeOrder } from 'test/factories/make-order';

let inMemoryOrderRepository: InMemoryOrderRepository;
let sut: EditOrderUseCase;

describe('Edit order', () => {
  beforeEach(() => {
    inMemoryOrderRepository = new InMemoryOrderRepository();
    sut = new EditOrderUseCase(inMemoryOrderRepository);
  });

  it('should be able to update order', async () => {
    const order = makeOrder({
      item: 'Glove80',
    });

    await inMemoryOrderRepository.create(order);

    const result = await sut.execute({
      orderId: order.id.toValue(),
      item: 'LTT Kinesis',
      status: order.status,
      recipientId: order.recipientId,
    });

    expect(result.isRight).toBeTruthy();
    expect(inMemoryOrderRepository.items[0].item).toEqual('LTT Kinesis');
  });

  it('should not be able to update recipient', async () => {
    const result = await sut.execute({
      orderId: '1',
      item: 'LTT Kinesis',
      status: 'delivered',
      recipientId: '1',
    });

    expect(result.isLeft).toBeTruthy();
  });
});
