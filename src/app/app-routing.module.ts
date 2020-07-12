import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { UserSearchComponent } from './search/components/user-search/user-search.component';
import { RateLimitComponent } from './shared/components/rate-limit/rate-limit.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'search',
    component: UserSearchComponent
  },
  {
    path: 'rate-exceeded',
    component: RateLimitComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
