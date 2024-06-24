import { Entity } from '@/core/entities/Entity';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';

export interface IOrderProps {
  item: string;
  status: string;
  destinatarioId: string;
}

export class Order extends Entity<IOrderProps> {
  get item() {
    return this.props.item;
  }

  get status() {
    return this.props.status;
  }

  get destinatarioId() {
    return this.props.destinatarioId;
  }

  set status(status: string) {
    this.props.status = status;
  }

  static create(props: IOrderProps, id?: UniqueEntityId) {
    const order = new Order(props, id);

    return order;
  }
}
