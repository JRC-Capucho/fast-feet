import { Either, left, right } from '@/core/either';
import { IUserRepository } from '../repositories/user-repository';
import { User } from '../../entenprise/entities/user';
import { UserNotFoundError } from './errors/user-not-found-error';

interface IGetUserUseCaseRequest {
  userId: string;
}

type IGetUserUserCaseResponse = Either<UserNotFoundError, { user: User }>;

export class GetUser {
  constructor(private userRepository: IUserRepository) {}

  async execute({
    userId,
  }: IGetUserUseCaseRequest): Promise<IGetUserUserCaseResponse> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      return left(new UserNotFoundError());
    }

    return right({ user });
  }
}
