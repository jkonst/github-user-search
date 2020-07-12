import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpEvent, HttpRequest } from '@angular/common/http';
import { LoaderService } from './shared/loader/loader.service';
import { Observable, throwError } from 'rxjs';
import { finalize, delay, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
    constructor(private router: Router, public loaderService: LoaderService) {}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.loaderService.show();
        return next.handle(req).pipe(
            catchError((err) => {
                console.log(err);
                if (err.status === 403 && err.statusText === 'rate limit exceeded') {
                    this.router.navigate(['/rate-exceeded']);
                }
                return throwError(err);
            }),
            delay(2000),
            finalize(() => this.loaderService.hide())
        );
    }
}
