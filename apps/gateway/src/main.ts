import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllRpcExceptionsFilter } from './common/filters/rpc-exception-filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new AllRpcExceptionsFilter());

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap()
  .then(() => console.log('Gateway is up and running...'))
  .catch((e) => console.error(`Failed to start the gateway: ${e}`));
