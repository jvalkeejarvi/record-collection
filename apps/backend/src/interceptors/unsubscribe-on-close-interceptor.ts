import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, fromEvent, takeUntil } from 'rxjs';

@Injectable()
export class UnsubscribeOnCloseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    if (context.getType() !== 'http') {
      return next.handle();
    }

    const request = context.switchToHttp().getRequest();
    const close$ = fromEvent(request, 'close');
    return next.handle().pipe(takeUntil(close$));
  }
}
