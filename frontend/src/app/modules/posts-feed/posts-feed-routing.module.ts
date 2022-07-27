import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PostListComponent} from "./components/post-list/post-list.component";

const routes: Routes = [{
  path: 'posts',
  component: PostListComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsFeedRoutingModule { }
