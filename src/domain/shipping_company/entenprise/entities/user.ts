import { Entity } from '@/core/entities/Entity';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';

type Role = 'admin' | 'deliveryman';

export interface IUserProps {
  name: string;
  cpf: string;
  password: string;
  roles: Role[];
}

export class User extends Entity<IUserProps> {
  get name() {
    return this.props.name;
  }

  get cpf() {
    return this.props.cpf;
  }

  get password() {
    return this.props.password;
  }

  get roles() {
    return this.props.roles;
  }

  set password(password: string) {
    this.props.password = password;
  }

  set roles(roles: Role[]) {
    this.props.roles = roles;
  }

  set cpf(cpf: string) {
    this.props.cpf = cpf;
  }

  set name(name: string) {
    this.props.name = name;
  }

  static create(props: IUserProps, id?: UniqueEntityId) {
    const user = new User(props, id);

    return user;
  }
}
