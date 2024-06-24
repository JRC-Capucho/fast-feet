import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository';
import { RegisterUser } from './register-user';
import { makeUser } from 'test/factories/make-user';

let inMemoryUserRepository: InMemoryUserRepository;
let sut: RegisterUser;

describe('Register User', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    sut = new RegisterUser(inMemoryUserRepository);
  });

  it('should be able to create user', async () => {
    const result = await sut.execute({
      cpf: '123',
      name: 'joao',
      roles: ['deliveryman'],
      password: '123',
    });

    expect(result.isRight).toBeTruthy();
    expect(result.value).toEqual({
      user: inMemoryUserRepository.items[0],
    });
  });

  it('should not be able to create user with same cpf', async () => {
    const sameUser = makeUser({
      cpf: '123',
    });

    const result = await sut.execute({
      cpf: '123',
      name: 'joao',
      roles: ['deliveryman'],
      password: '123',
    });

    expect(result.isLeft).toBeTruthy();
  });
});
