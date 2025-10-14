import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'user',
        protoPath: join(process.cwd(), 'libs/proto/user.proto'),
        url: process.env.USER_SERVICE_URL || 'localhost:50051',
      },
    },
  );

  await app.listen();
}

bootstrap()
  .then(() => console.log('User service is listening'))
  .catch((err) => console.error(err));
