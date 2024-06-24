import { InMemoryRecipientRepository } from 'test/repositories/in-memory-recipient-repository';
import { EditRecipientUseCase } from './edit-recipient';
import { makeRecipient } from 'test/factories/make-recipient';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';

let inMemoryRecipientRepository: InMemoryRecipientRepository;
let sut: EditRecipientUseCase;

describe('Edit recipient', () => {
  beforeEach(() => {
    inMemoryRecipientRepository = new InMemoryRecipientRepository();
    sut = new EditRecipientUseCase(inMemoryRecipientRepository);
  });

  it('should be able to update recipient', async () => {
    const recipient = makeRecipient(
      {
        city: 'city',
      },
      new UniqueEntityId('1'),
    );

    await inMemoryRecipientRepository.create(recipient);

    const result = await sut.execute({
      recipientId: recipient.id.toValue(),
      neighborhood: 'neighborhood',
      addressNumber: 20,
      streetName: 'street',
      city: 'new city',
      CEP: 223123,
      complement: 'nice',
    });

    expect(result.isRight).toBeTruthy();
    expect(inMemoryRecipientRepository.items[0].city).toEqual('new city');
  });
});
