import { Encrypter } from '@/domain/shipping_company/application/cryptography/encrypter';

export class FakeEncrypt implements Encrypter {
  async encrypt(payload: Record<string, unknown>): Promise<string> {
    return JSON.stringify(payload);
  }

  async compare(plain: string, hash: string): Promise<boolean> {
    return plain.concat('-hashed') === hash;
  }

  async hash(plain: string): Promise<string> {
    return plain.concat('-hashed');
  }
}
