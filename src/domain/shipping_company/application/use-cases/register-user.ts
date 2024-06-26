import { Either, left, right } from '@/core/either';
import { IUserRepository } from '../repositories/user-repository';
import { UserAlreadyError } from './errors/user-already-exists-error';
import { User } from '../../entenprise/entities/user';
import { Encrypter } from '../cryptography/encrypter';

type Role = 'admin' | 'deliveryman';

interface IRegisterUserUseCaseRequest {
  name: string;
  cpf: string;
  password: string;
  roles: Role[];
}

type IRegisterUserUserCaseResponse = Either<UserAlreadyError, { user: User }>;

export class RegisterUser {
  constructor(
    private userRepository: IUserRepository,
    private hash: Encrypter,
  ) {}

  async execute({
    name,
    cpf,
    password,
    roles,
  }: IRegisterUserUseCaseRequest): Promise<IRegisterUserUserCaseResponse> {
    const cpfExists = await this.userRepository.findByCpf(cpf);

    if (cpfExists) {
      return left(new UserAlreadyError());
    }

    const passwordHashed = await this.hash.hash(password);

    const user = User.create({ name, cpf, password: passwordHashed, roles });

    await this.userRepository.create(user);

    return right({ user });
  }
}
