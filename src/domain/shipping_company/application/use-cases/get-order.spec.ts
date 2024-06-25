import { InMemoryOrderRepository } from 'test/repositories/in-memory-order-repository';
import { GetOrderUseCase } from './get-order';
import { makeOrder } from 'test/factories/make-order';

let inMemoryOrderRepository: InMemoryOrderRepository;
let sut: GetOrderUseCase;

describe('Get order', () => {
  beforeEach(() => {
    inMemoryOrderRepository = new InMemoryOrderRepository();
    sut = new GetOrderUseCase(inMemoryOrderRepository);
  });

  it('should be able to get a order', async () => {
    const order = makeOrder();

    await inMemoryOrderRepository.create(order);

    const result = await sut.execute({
      orderId: order.id.toValue(),
    });

    expect(result.value).toEqual({
      order: inMemoryOrderRepository.items[0],
    });
  });

  it('should not be able to get order with non exits', async () => {
    const result = await sut.execute({
      orderId: '1',
    });

    expect(result.isLeft).toBeTruthy();
  });
});
