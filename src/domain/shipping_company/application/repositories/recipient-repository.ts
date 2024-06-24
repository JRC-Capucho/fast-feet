import { Recipient } from '../../entenprise/entities/recipients';

export abstract class IRecipientRepository {
  abstract findBydId(id: string): Promise<Recipient | null>;

  abstract create(recipient: Recipient): Promise<void>;
  abstract save(recipient: Recipient): Promise<void>;
  abstract delete(id: string): Promise<void>;
}
