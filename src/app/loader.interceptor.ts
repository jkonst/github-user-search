import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpEvent, HttpRequest } from '@angular/common/http';
import { LoaderService } from './shared/loader/loader.service';
import { Observable } from 'rxjs';
import { finalize, delay } from 'rxjs/operators';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
    constructor(public loaderService: LoaderService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.loaderService.show();
        return next.handle(req).pipe(
            delay(2000),
            finalize(() => this.loaderService.hide())
        );
    }
}
