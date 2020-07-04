import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from './shared/shared.module';
import { MatTableModule } from '@angular/material/table';
import { CdkTableModule } from '@angular/cdk/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { UserSearchComponent } from './user-search/user-search.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserSearchComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    MatTableModule,
    CdkTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
