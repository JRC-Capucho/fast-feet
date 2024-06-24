import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { GetRecipientUseCase } from './get-recipient';
import { InMemoryRecipientRepository } from 'test/repositories/in-memory-recipient-repository';
import { makeRecipient } from 'test/factories/make-recipient';

let inMemoryRecipientRepository: InMemoryRecipientRepository;
let sut: GetRecipientUseCase;

describe('Get recipient', () => {
  beforeEach(() => {
    inMemoryRecipientRepository = new InMemoryRecipientRepository();
    sut = new GetRecipientUseCase(inMemoryRecipientRepository);
  });

  it('should be able to get a recipient', async () => {
    const recipient = makeRecipient();

    await inMemoryRecipientRepository.create(recipient);

    const result = await sut.execute({
      recipientId: recipient.id.toValue(),
    });

    expect(result.value).toEqual({
      recipient: inMemoryRecipientRepository.items[0],
    });
  });

  it('should not be able to get recipint with non exists', async () => {
    const result = await sut.execute({
      recipientId: '1',
    });

    expect(result.isLeft).toBeTruthy();
  });
});
