import { ObjectType, Field, ID, HideField } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString, IsOptional } from 'class-validator';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User as IUser } from '@proto/user';
import { TableName } from 'src/infra/constants/TableName';

@ObjectType()
@Entity(TableName.USERS)
export class UserEntity implements IUser {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field()
  @IsEmail()
  @Column({ unique: true })
  email!: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  @Column({ type: 'text', nullable: true })
  name!: string;

  @HideField()
  @IsString()
  @IsNotEmpty()
  @Column({ type: 'text', nullable: true })
  password!: string;

  @Field()
  @IsOptional()
  @Column({ default: '' })
  avatarUrl!: string;

  @Field()
  @CreateDateColumn()
  createdAt!: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt!: Date;

  @Field()
  @IsOptional()
  @Column({ default: '' })
  username?: string;

  @Field()
  @IsOptional()
  @Column({ default: '' })
  createdBy!: string;

  @Field()
  @IsOptional()
  @Column({ default: '' })
  updatedBy!: string;

  //   @Field(() => Boolean)
  //   @IsBoolean()
  //   @Column({ type: 'boolean', default: false, nullable: false })
  //   emailVerified!: boolean;

  //   @Field(() => GraphQLISODateTime, { nullable: true })
  //   @IsOptional()
  //   @Column({ type: 'timestamptz', nullable: true })
  //   emailVerifiedAt!: Date | null;
}
