import { Catch, RpcExceptionFilter } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class AllRpcExceptionsFilter
  implements RpcExceptionFilter<RpcException>
{
  catch(exception: RpcException): Observable<unknown> {
    console.error('[gRPC Exception]', exception.getError());

    return throwError(() => exception.getError() as unknown);
  }
}
