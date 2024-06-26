import { Either, left, right } from '@/core/either';
import { IUserRepository } from '../repositories/user-repository';
import { Encrypter } from '../cryptography/encrypter';
import { InvalidCredentialsError } from './errors/invalid-credentials-error';

interface IAuthenticateUserUseCaseRequest {
  cpf: string;
  password: string;
}

type IAuthenticateUserUseCaseResponse = Either<
  InvalidCredentialsError,
  { token: string }
>;

export class AuthenticateUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private hash: Encrypter,
  ) {}
  async execute({
    password,
    cpf,
  }: IAuthenticateUserUseCaseRequest): Promise<IAuthenticateUserUseCaseResponse> {
    const user = await this.userRepository.findByCpf(cpf);

    if (!user) {
      return left(new InvalidCredentialsError());
    }

    const isMatchPass = await this.hash.compare(password, user.password);

    if (!isMatchPass) {
      return left(new InvalidCredentialsError());
    }

    const token = await this.hash.encrypt({ sub: user.id.toString() });

    return right({ token });
  }
}
