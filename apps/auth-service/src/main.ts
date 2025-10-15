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
  const protoPath = join(process.cwd(), 'libs/proto/auth.proto');

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'auth',
        protoPath: [healthCheckProtoPath, protoPath],
        url: process.env.GRPC_BIND_URL || '0.0.0.0:50052',
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
      `✅ Auth microservice running on gRPC://${process.env.GRPC_BIND_URL || '0.0.0.0:50052'}`,
    ),
  )
  .catch((err) => console.error(err));
