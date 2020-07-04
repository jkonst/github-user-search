import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { NotFoundComponent } from './components/not-found/not-found.component';



@NgModule({
  declarations: [FooterComponent, NotFoundComponent],
  imports: [
    CommonModule
  ],
  exports: [FooterComponent]
})
export class SharedModule { }
