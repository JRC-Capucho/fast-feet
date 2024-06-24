import { UseCaseError } from '@/core/error/use-case-error';

export class UserAlreadyError extends Error implements UseCaseError {
  constructor() {
    super('User already exists.');
  }
}
