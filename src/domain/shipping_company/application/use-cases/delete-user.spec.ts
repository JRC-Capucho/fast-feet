import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository';
import { makeUser } from 'test/factories/make-user';
import { DeleteUser } from './delete-user';

let inMemoryUserRepository: InMemoryUserRepository;
let sut: DeleteUser;

describe('Delete User', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    sut = new DeleteUser(inMemoryUserRepository);
  });

  it('should be able to delete a user', async () => {
    const user = makeUser();

    await inMemoryUserRepository.create(user);

    await sut.execute({
      userId: user.id.toValue(),
    });

    expect(inMemoryUserRepository.items).toHaveLength(0);
  });

  it('should not be able to delete a user', async () => {
    const result = await sut.execute({
      userId: '1',
    });

    expect(result.isLeft).toBeTruthy();
  });
});
