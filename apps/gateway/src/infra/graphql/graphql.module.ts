import { Module } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { Request } from 'express';
import { GraphQLModule as NestGraphQLModule } from '@nestjs/graphql';
import { GraphQLFormattedError } from 'graphql';
import { GraphQLError } from 'graphql';

@Module({
  imports: [
    NestGraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      graphiql: true,
      autoSchemaFile: join(process.cwd(), 'src/graphql/schema.gql'),
      formatError: (error: GraphQLError): GraphQLFormattedError => {
        const statusCode =
          (error.extensions?.originalError as { statusCode: number })
            ?.statusCode ?? 500;

        let code: string;

        switch (statusCode) {
          case 400:
            code = 'BAD_REQUEST';
            break;
          case 401:
            code = 'UNAUTHORIZED';
            break;
          case 404:
            code = 'NOT_FOUND';
            break;
          default:
            code = 'INTERNAL_SERVER_ERROR';
        }

        return {
          message: error.message,
          extensions: {
            code,
            status: statusCode,
          },
        };
      },
      sortSchema: true,
      playground: true,
      subscriptions: { 'graphql-ws': true },
      context: ({ req }: { req: Request }) => ({ req }), // attach user later
    }),
  ],
})
export class GqlModule {}
