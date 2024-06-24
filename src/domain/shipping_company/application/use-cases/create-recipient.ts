import { Either, right } from '@/core/either';
import { Recipient } from '../../entenprise/entities/recipients';
import { IRecipientRepository } from '../repositories/recipient-repository';

interface ICreateRecipientUseCaseRequest {
  addressNumber: number;
  streetName: string;
  city: string;
  neighborhood: string;
  complement: string;
  CEP: number;
}

type ICreateRecipientUseCaseResponse = Either<Error, { recipient: Recipient }>;

export class CreateRecipientUseCase {
  constructor(private recipientRepository: IRecipientRepository) {}

  async execute({
    complement,
    CEP,
    city,
    streetName,
    addressNumber,
    neighborhood,
  }: ICreateRecipientUseCaseRequest): Promise<ICreateRecipientUseCaseResponse> {
    const recipient = Recipient.create({
      complement,
      CEP,
      city,
      streetName,
      addressNumber,
      neighborhood,
    });

    await this.recipientRepository.create(recipient);

    return right({ recipient });
  }
}
