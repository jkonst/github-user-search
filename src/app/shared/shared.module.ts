import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoaderComponent } from './loader/loader.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RateLimitComponent } from './components/rate-limit/rate-limit.component';

@NgModule({
  declarations: [FooterComponent, NotFoundComponent, LoaderComponent, RateLimitComponent],
  imports: [
    CommonModule,
    MatProgressSpinnerModule
  ],
  exports: [FooterComponent, LoaderComponent]
})
export class SharedModule { }
