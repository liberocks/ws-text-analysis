import 'dotenv/config';

import { Injectable } from '@nestjs/common';

import { ConfigJoiSchema } from './config.schema';
import { Env } from './config.type';

@Injectable()
export class ConfigService {
  private readonly env: Env;

  constructor() {
    const env = process.env as Env;

    this.env = this.validate(env);
  }

  public get(key: string, defaultValue?: string): string {
    return this.env[key] || defaultValue;
  }

  public setEnvKey(k: string, value: string): void {
    this.env[k] = value;
  }

  private validate(env: Env): Env {
    const { error } = ConfigJoiSchema.validate(env);

    if (error) throw error;

    return env;
  }
}
