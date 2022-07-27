import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsFeedRoutingModule } from './posts-feed-routing.module';
import { PostListComponent } from './components/post-list/post-list.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import {CoreModule} from "../../core/core.module";
import {ReactiveFormsModule} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";


@NgModule({
  providers: [
    {
      provide: MatDialogRef,
      useValue: {}
    }
  ],
  declarations: [
    PostListComponent,
    CreatePostComponent
  ],
  imports: [
    CommonModule,
    PostsFeedRoutingModule,
    CoreModule,
    ReactiveFormsModule
  ],
  exports: [
    PostListComponent
  ]
})
export class PostsFeedModule { }