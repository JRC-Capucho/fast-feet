import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository';
import { makeUser } from 'test/factories/make-user';
import { FakeEncrypt } from 'test/cryptography/FakeEncrypt';
import { AuthenticateUserUseCase } from './authenticate-user';

let inMemoryUserRepository: InMemoryUserRepository;
let fakeEncrypt: FakeEncrypt;
let sut: AuthenticateUserUseCase;

describe('Auth User', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    fakeEncrypt = new FakeEncrypt();
    sut = new AuthenticateUserUseCase(inMemoryUserRepository, fakeEncrypt);
  });

  it('should be able to authenticate user', async () => {
    const user = makeUser({
      cpf: '123',
      password: await fakeEncrypt.hash('123'),
    });

    await inMemoryUserRepository.create(user);

    const result = await sut.execute({
      cpf: '123',
      password: '123',
    });

    expect(result.isRight).toBeTruthy();
    expect(result.value).toEqual({
      token: expect.any(String),
    });
  });
});
