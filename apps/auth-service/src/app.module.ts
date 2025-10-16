import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [
    PassportModule,
    // TypeOrmModule.forFeature([
    //   UserEntity,
    //   // PasswordResetToken,
    //   // EmailVerificationToken,
    // ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('app.jwtSecret'),
        signOptions: { expiresIn: config.get<number>('app.jwtExpiresIn') },
      }),
    }),
  ],
})
export class AppModule {}
