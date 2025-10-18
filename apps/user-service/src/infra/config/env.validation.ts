import { plainToInstance } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsString,
  IsBooleanString,
  Max,
  Min,
  validateSync,
} from 'class-validator';

export enum Environment {
  Development = 'development',
  Local = 'local',
  Production = 'production',
  Test = 'test',
  Provision = 'provision',
}

class EnvironmentVariables {
  // ───── Core App Config ─────
  @IsEnum(Environment)
  NODE_ENV!: Environment;

  @IsNumber()
  @Min(0)
  @Max(65535)
  PORT!: number;

  // ───── Database ─────

  @IsString()
  DB_HOST!: string;

  @IsString()
  POSTGRES_DB!: string;

  @IsNumber()
  DB_PORT!: number;

  @IsString()
  POSTGRES_USER!: string;

  @IsString()
  POSTGRES_PASSWORD!: string;

  @IsString()
  DB_NAME!: string;

  @IsBooleanString()
  DB_SSL!: string; // "true" | "false"
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true, // converts strings → numbers/booleans
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false, // fail if anything required is missing
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validatedConfig;
}
