import { InMemoryRecipientRepository } from 'test/repositories/in-memory-recipient-repository';
import { makeRecipient } from 'test/factories/make-recipient';
import { DeleteRecipientUseCase } from './delete-recipient';

let inMemoryRecipientRepository: InMemoryRecipientRepository;
let sut: DeleteRecipientUseCase;

describe('Get recipient', () => {
  beforeEach(() => {
    inMemoryRecipientRepository = new InMemoryRecipientRepository();
    sut = new DeleteRecipientUseCase(inMemoryRecipientRepository);
  });

  it('should be able to get a recipient', async () => {
    const recipient = makeRecipient();

    await inMemoryRecipientRepository.create(recipient);

    const result = await sut.execute({
      recipientId: recipient.id.toValue(),
    });

    expect(result.isRight).toBeTruthy();
    expect(inMemoryRecipientRepository.items).toHaveLength(0);
  });

  it('should not be able to get recipint with non exists', async () => {
    const result = await sut.execute({
      recipientId: '1',
    });

    expect(result.isLeft).toBeTruthy();
  });
});
