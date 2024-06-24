import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository';
import { makeUser } from 'test/factories/make-user';
import { GetUser } from './get-user';

let inMemoryUserRepository: InMemoryUserRepository;
let sut: GetUser;

describe('Get User', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    sut = new GetUser(inMemoryUserRepository);
  });

  it('should be able to get a user', async () => {
    const user = makeUser();

    await inMemoryUserRepository.create(user);

    const result = await sut.execute({
      userId: user.id.toValue(),
    });

    expect(result.value).toEqual({
      user: inMemoryUserRepository.items[0],
    });
  });

  it('should not be able to get user with non exits', async () => {
    const result = await sut.execute({
      userId: '1',
    });

    expect(result.isLeft).toBeTruthy();
  });
});
