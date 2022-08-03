import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'feed',
    loadChildren : () => import('./modules/posts-feed/posts-feed.module').then(m => m.PostsFeedModule)
  },
  {
    path: 'unauthorized',
    loadChildren : () => import('./modules/unauthorized/unauthorized.module').then(m => m.UnauthorizedModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
