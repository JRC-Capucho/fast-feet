import { InMemoryOrderRepository } from 'test/repositories/in-memory-order-repository';
import { ChangeStatusOrderUseCase } from './change-status-order';
import { makeOrder } from 'test/factories/make-order';

let inMemoryUserRepository: InMemoryOrderRepository;
let sut: ChangeStatusOrderUseCase;

describe('Register User', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryOrderRepository();
    sut = new ChangeStatusOrderUseCase(inMemoryUserRepository);
  });

  it('should be able to create user', async () => {
    const order = makeOrder();

    await inMemoryUserRepository.create(order);

    const result = await sut.execute({
      status: 'delived',
      orderId: order.id.toString(),
      isAvaliable: true,
    });

    expect(result.isRight).toBeTruthy();
  });
});
