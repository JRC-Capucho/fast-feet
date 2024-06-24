import { Either, left, right } from '@/core/either';
import { IUserRepository } from '../repositories/user-repository';
import { User } from '../../entenprise/entities/user';
import { UserNotFoundError } from './errors/user-not-found-error';

type Role = 'admin' | 'deliveryman';

interface IEditUserUseCaseRequest {
  userId: string;
  name?: string;
  cpf?: string;
  password?: string;
  roles?: Role[];
}

type IEditUserUserCaseResponse = Either<UserNotFoundError, { user: User }>;

export class EditUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute({
    userId,
    name,
    cpf,
    password,
    roles,
  }: IEditUserUseCaseRequest): Promise<IEditUserUserCaseResponse> {
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
