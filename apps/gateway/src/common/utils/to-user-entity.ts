import { User } from '@proto/user';
import { UserEntity } from 'src/common/entities/user.entity';

interface GrpcTimestamp {
  seconds: number;
  nanos: number;
}

export function toUserEntity(protoUser: User): UserEntity {
  const createdAt = protoUser.createdAt as unknown as GrpcTimestamp | undefined;
  const updatedAt = protoUser.updatedAt as unknown as GrpcTimestamp | undefined;

  return {
    ...protoUser,
    createdAt: createdAt
      ? new Date(createdAt.seconds * 1000 + createdAt.nanos / 1e6)
      : new Date(),
    updatedAt: updatedAt
      ? new Date(updatedAt.seconds * 1000 + updatedAt.nanos / 1e6)
      : new Date(),
  } as UserEntity;
}
