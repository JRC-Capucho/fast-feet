import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import {
  IRecipientProps,
  Recipient,
} from '@/domain/shipping_company/entenprise/entities/recipients';
import { faker } from '@faker-js/faker';

export function makeRecipient(
  override: Partial<IRecipientProps> = {},
  id?: UniqueEntityId,
) {
  const recipient = Recipient.create(
    {
      city: faker.location.city(),
      streetName: faker.location.street(),
      addressNumber: faker.number.int(),
      complement: faker.location.secondaryAddress(),
      neighborhood: faker.person.lastName(),
      CEP: parseInt(faker.location.countryCode('numeric')),
      ...override,
    },
    id,
  );

  return recipient;
}
