import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import {
  IUserProps,
  User,
} from '@/domain/shipping_company/entenprise/entities/user';
import { faker } from '@faker-js/faker';

export function makeUser(
  override: Partial<IUserProps> = {},
  id?: UniqueEntityId,
) {
  const user = User.create(
    {
      name: faker.person.fullName(),
      cpf: faker.string.numeric(11),
      roles: [faker.helpers.arrayElement(['admin', 'deliveryman'])],
      password: faker.internet.password(),
      ...override,
    },
    id,
  );

  return user;
}
