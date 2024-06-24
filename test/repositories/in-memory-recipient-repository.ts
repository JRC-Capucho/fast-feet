import { IRecipientRepository } from '@/domain/shipping_company/application/repositories/recipient-repository';
import { Recipient } from '@/domain/shipping_company/entenprise/entities/recipients';

export class InMemoryRecipientRepository implements IRecipientRepository {
  public items: Recipient[] = [];

  async findBydId(id: string): Promise<Recipient | null> {
    const recipient = this.items.find((item) => item.id.toString() === id);

    if (!recipient) {
      return null;
    }

    return recipient;
  }

  async save(recipient: Recipient): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === recipient.id);

    this.items[itemIndex] = recipient;
  }

  async create(recipient: Recipient): Promise<void> {
    this.items.push(recipient);
  }

  async delete(id: string): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id.toString() === id);

    this.items.splice(itemIndex, 1);
  }
}
