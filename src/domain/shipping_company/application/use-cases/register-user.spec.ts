import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository';
import { RegisterUser } from './register-user';
import { makeUser } from 'test/factories/make-user';
import { FakeEncrypt } from 'test/cryptography/FakeEncrypt';

let inMemoryUserRepository: InMemoryUserRepository;
let fakeEncrypt: FakeEncrypt;
let sut: RegisterUser;

describe('Register User', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    fakeEncrypt = new FakeEncrypt();
    sut = new RegisterUser(inMemoryUserRepository, fakeEncrypt);
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
    makeUser({
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

  it('should hashed password', async () => {
    const result = await sut.execute({
      cpf: '123',
      name: 'joao',
      roles: ['deliveryman'],
      password: '123',
    });

    const hashedPassword = await fakeEncrypt.hash('123');

    expect(result.isRight).toBeTruthy();
    expect(inMemoryUserRepository.items[0].password).toEqual(hashedPassword);
  });
});
