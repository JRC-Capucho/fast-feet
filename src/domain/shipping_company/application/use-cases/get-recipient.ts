import { Either, left, right } from '@/core/either';
import { Recipient } from '../../entenprise/entities/recipients';
import { IRecipientRepository } from '../repositories/recipient-repository';
import { RecipientNotFoundError } from './errors/recipient-not-found-error';

interface IGetRecipientUseCaseRequest {
  recipientId: string;
}

type IGetRecipientUseCaseResponse = Either<Error, { recipient: Recipient }>;

export class GetRecipientUseCase {
  constructor(private recipientRepository: IRecipientRepository) {}

  async execute({
    recipientId,
  }: IGetRecipientUseCaseRequest): Promise<IGetRecipientUseCaseResponse> {
    const recipient = await this.recipientRepository.findBydId(recipientId);

    if (!recipient) {
      return left(new RecipientNotFoundError());
    }

    return right({ recipient });
  }
}
