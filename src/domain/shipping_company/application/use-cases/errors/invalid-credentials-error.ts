import { UseCaseError } from '@/core/error/use-case-error';

export class InvalidCredentialsError extends Error implements UseCaseError {
  constructor() {
    super('Credentials is invalid.');
  }
}
