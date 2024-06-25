import { Entity } from '@/core/entities/Entity';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';

export interface IOrderProps {
  item: string;
  status: string;
  recipientId: string;
}

export class Order extends Entity<IOrderProps> {
  get item() {
    return this.props.item;
  }

  get status() {
    return this.props.status;
  }

  get recipientId() {
    return this.props.recipientId;
  }

  set status(status: string) {
    this.props.status = status;
  }

  set item(item: string) {
    this.props.item = item;
  }

  set recipientId(recipientId: string) {
    this.props.recipientId = recipientId;
  }

  static create(props: IOrderProps, id?: UniqueEntityId) {
    const order = new Order(props, id);

    return order;
  }
}
