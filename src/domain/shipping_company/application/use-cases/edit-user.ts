import { Either, left, right } from '@/core/either';
import { IUserRepository } from '../repositories/user-repository';
import { User } from '../../entenprise/entities/user';
import { UserNotFoundError } from './errors/user-not-found-error';

type Role = 'admin' | 'deliveryman';

interface IUpdateUserUseCaseRequest {
  userId: string;
  name?: string;
  cpf?: string;
  password?: string;
  roles?: Role[];
}

type IUpdateUserUserCaseResponse = Either<UserNotFoundError, { user: User }>;

export class UpdateUser {
  constructor(private userRepository: IUserRepository) {}

  async execute({
    userId,
    name,
    cpf,
    password,
    roles,
  }: IUpdateUserUseCaseRequest): Promise<IUpdateUserUserCaseResponse> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      return left(new UserNotFoundError());
    }

    user.password = password;
    user.roles = roles;
    user.cpf = cpf;
    user.name = name;

    await this.userRepository.save(user);

    return right({ user });
  }
}
