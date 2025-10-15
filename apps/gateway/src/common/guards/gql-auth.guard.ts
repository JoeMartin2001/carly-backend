// import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
// import { GqlExecutionContext } from '@nestjs/graphql';
// import { AuthServiceClient } from '@proto/auth';
// import { lastValueFrom } from 'rxjs';

// @Injectable()
// export class GqlAuthGuard implements CanActivate {
//   constructor(private readonly authClient: AuthServiceClient) {}

//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const ctx = GqlExecutionContext.create(context);
//     const { req } = ctx.getContext();
//     const token = req.headers.authorization?.split(' ')[1];

//     if (!token) return false;

//     const res = await lastValueFrom(this.authClient.verifyToken({ token }));
//     req.user = res;

//     return res.valid;
//   }
// }
