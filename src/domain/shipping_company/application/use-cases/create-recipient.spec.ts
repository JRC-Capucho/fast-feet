import { InMemoryRecipientRepository } from 'test/repositories/in-memory-recipient-repository';
import { CreateRecipientUseCase } from './create-recipient';

let inMemoryRecipientRepository: InMemoryRecipientRepository;
let sut: CreateRecipientUseCase;

describe('Create recipient', () => {
  beforeEach(() => {
    inMemoryRecipientRepository = new InMemoryRecipientRepository();
    sut = new CreateRecipientUseCase(inMemoryRecipientRepository);
  });

  it('should be able to create recipient', async () => {
    const result = await sut.execute({
      neighborhood: 'neighborhood',
      addressNumber: 20,
      streetName: 'street',
      city: 'city',
      CEP: 223123,
      complement: 'nice',
    });

    expect(result.isRight).toBeTruthy();
    expect(result.value).toEqual({
      recipient: inMemoryRecipientRepository.items[0],
    });
  });
});
