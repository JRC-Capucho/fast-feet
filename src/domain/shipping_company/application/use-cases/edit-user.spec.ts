import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository';
import { UpdateUser } from './edit-user';
import { makeUser } from 'test/factories/make-user';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';

let inMemoryUserRepository: InMemoryUserRepository;
let sut: UpdateUser;

describe('Edit User', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    sut = new UpdateUser(inMemoryUserRepository);
  });

  it('should be able to update user', async () => {
    const user = makeUser(
      {
        name: 'John Doe',
      },
      new UniqueEntityId('1'),
    );

    await inMemoryUserRepository.create(user);

    await sut.execute({
      name: 'John Doe Test',
      password: '123123',
      userId: user.id.toValue(),
      cpf: '1312123',
      roles: ['deliveryman'],
    });

    expect(inMemoryUserRepository.items[0].name).toEqual('John Doe Test');
  });

  it('should be able to update user', async () => {
    const user = makeUser(
      {
        name: 'John Doe',
      },
      new UniqueEntityId('1'),
    );

    await inMemoryUserRepository.create(user);

    const result = await sut.execute({
      name: 'John Doe Test',
      password: '123123',
      userId: '2',
      cpf: '1312123',
      roles: ['deliveryman'],
    });

    expect(result.isLeft).toBeTruthy();
  });
});
