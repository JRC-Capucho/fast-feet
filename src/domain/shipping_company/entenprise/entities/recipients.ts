import { Entity } from '@/core/entities/Entity';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';

export interface IRecipientProps {
  addressNumber: number;
  streetName: string;
  city: string;
  neighborhood: string;
  complement: string;
  CEP: number;
}

export class Recipient extends Entity<IRecipientProps> {
  get addressNumber() {
    return this.props.addressNumber;
  }

  get streetName() {
    return this.props.streetName;
  }

  get city() {
    return this.props.city;
  }

  get CEP() {
    return this.props.CEP;
  }

  get neighborhood() {
    return this.props.neighborhood;
  }

  get complement() {
    return this.props.complement;
  }

  set addressNumber(addressNumber: number) {
    this.props.addressNumber = addressNumber;
  }

  set streetName(streetName: string) {
    this.props.streetName = streetName;
  }

  set city(city: string) {
    this.props.city = city;
  }

  set CEP(CEP: number) {
    this.props.CEP = CEP;
  }

  set neighborhood(neighborhood: string) {
    this.props.neighborhood = neighborhood;
  }

  set complement(complement: string) {
    this.props.complement = complement;
  }

  static create(props: IRecipientProps, id?: UniqueEntityId) {
    const recipient = new Recipient(props, id);

    return recipient;
  }
}
