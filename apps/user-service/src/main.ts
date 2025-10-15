import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppModule } from './app.module';
import { ReflectionService } from '@grpc/reflection';

async function bootstrap() {
  const protoPath = join(process.cwd(), 'libs/proto/user.proto');

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'user',
        protoPath: protoPath,
        url: process.env.GRPC_BIND_URL || '0.0.0.0:50051',
        onLoadPackageDefinition: (pkg, server) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          new ReflectionService(pkg).addToServer(server);
        },
      },
    },
  );

  await app.listen();

  console.log(`Protos: ${protoPath}`);
}

bootstrap()
  .then(() =>
    console.log(
      `✅ User microservice running on gRPC://${process.env.GRPC_BIND_URL || '0.0.0.0:50051'}`,
    ),
  )
  .catch((err) => console.error(err));
