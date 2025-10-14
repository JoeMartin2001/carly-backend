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
        protoPath: join(__dirname, '../../../libs/proto/user.proto'),
        url: '0.0.0.0:50051',
      },
    },
  );

  await app.listen();
}

bootstrap()
  .then(() => console.log('User service is listening'))
  .catch((err) => console.error(err));
