import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppModule } from './app.module';
import {
  HealthImplementation,
  protoPath as healthCheckProtoPath,
} from 'grpc-health-check';
import { Server } from '@grpc/grpc-js';

async function bootstrap() {
  const protoPath = join(process.cwd(), 'libs/proto/user.proto');

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'user',
        protoPath: [healthCheckProtoPath, protoPath],
        url: process.env.GRPC_BIND_URL || '0.0.0.0:50051',
        onLoadPackageDefinition: (_pkg, server: Server) => {
          const healthImpl = new HealthImplementation({
            '': 'UNKNOWN',
          });

          healthImpl.addToServer(server);
          healthImpl.setStatus('', 'SERVING');
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
