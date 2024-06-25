import { Either, left, right } from '@/core/either';
import { Recipient } from '../../entenprise/entities/recipients';
import { IRecipientRepository } from '../repositories/recipient-repository';
import { RecipientNotFoundError } from './errors/recipient-not-found-error';

interface IEditRecipientUseCaseRequest {
  recipientId: string;
  addressNumber: number;
  streetName: string;
  city: string;
  neighborhood: string;
  complement: string;
  CEP: number;
}

type IEditRecipientUseCaseResponse = Either<Error, { recipient: Recipient }>;

export class EditRecipientUseCase {
  constructor(private recipientRepository: IRecipientRepository) {}

  async execute({
    recipientId,
    complement,
    CEP,
    city,
    streetName,
    addressNumber,
    neighborhood,
  }: IEditRecipientUseCaseRequest): Promise<IEditRecipientUseCaseResponse> {
    const recipient = await this.recipientRepository.findBydId(recipientId);

    if (!recipient) {
      return left(new RecipientNotFoundError());
    }

    recipient.CEP = CEP;
    recipient.complement = complement;
    recipient.city = city;
    recipient.streetName = streetName;
    recipient.addressNumber = addressNumber;
    recipient.neighborhood = neighborhood;

    await this.recipientRepository.save(recipient);

    return right({ recipient });
  }
}
