import { User } from '@proto/user';
import { UserEntity } from '../entities/user.entity';

export function toGrpcUser(entity: UserEntity): User {
  return {
    ...entity,
    createdAt: entity.createdAt
      ? {
          seconds: Math.floor(entity.createdAt.getTime() / 1000).toString(),
          nanos: (entity.createdAt.getTime() % 1000) * 1_000_000,
        }
      : undefined,
    updatedAt: entity.updatedAt
      ? {
          seconds: Math.floor(entity.updatedAt.getTime() / 1000).toString(),
          nanos: (entity.updatedAt.getTime() % 1000) * 1_000_000,
        }
      : undefined,
  } as User;
}
