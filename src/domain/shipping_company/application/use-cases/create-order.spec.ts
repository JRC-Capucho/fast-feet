import { makeRecipient } from 'test/factories/make-recipient';
import { CreateOrderUseCase } from './create-order';
import { InMemoryOrderRepository } from 'test/repositories/in-memory-order-repository';

let inMemoryOrderRepository: InMemoryOrderRepository;
let sut: CreateOrderUseCase;

describe('Create recipient', () => {
  beforeEach(() => {
    inMemoryOrderRepository = new InMemoryOrderRepository();
    sut = new CreateOrderUseCase(inMemoryOrderRepository);
  });

  it('should be able to create recipient', async () => {
    const destination = makeRecipient();

    const result = await sut.execute({
      item: 'item',
      status: 'pending',
      isAvaliable: false,
      destinatarioId: destination.id.toString(),
    });

    expect(result.isRight).toBeTruthy();
  });
});
