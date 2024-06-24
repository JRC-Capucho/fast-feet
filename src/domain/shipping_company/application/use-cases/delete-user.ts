import { Either, left, right } from '@/core/either';
import { IUserRepository } from '../repositories/user-repository';
import { User } from '../../entenprise/entities/user';
import { UserNotFoundError } from './errors/user-not-found-error';

interface IDeleteUserUseCaseRequest {
  userId: string;
}

type IDeleteUserUserCaseResponse = Either<UserNotFoundError, { user: User }>;

export class DeleteUser {
  constructor(private userRepository: IUserRepository) {}

  async execute({
    userId,
  }: IDeleteUserUseCaseRequest): Promise<IDeleteUserUserCaseResponse> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      return left(new UserNotFoundError());
    }

    await this.userRepository.delete(user);

    return right({ user });
  }
}
