import { Either, left, right } from '@/core/either';
import { Recipient } from '../../entenprise/entities/recipients';
import { IRecipientRepository } from '../repositories/recipient-repository';
import { RecipientNotFoundError } from './errors/recipient-not-found-error';

interface IDeleteRecipientUseCaseRequest {
  recipientId: string;
}

type IDeleteRecipientUseCaseResponse = Either<Error, { recipient: Recipient }>;

export class DeleteRecipientUseCase {
  constructor(private recipientRepository: IRecipientRepository) {}

  async execute({
    recipientId,
  }: IDeleteRecipientUseCaseRequest): Promise<IDeleteRecipientUseCaseResponse> {
    const recipient = await this.recipientRepository.findBydId(recipientId);

    if (!recipient) {
      return left(new RecipientNotFoundError());
    }

    await this.recipientRepository.delete(recipientId);

    return right({ recipient });
  }
}
