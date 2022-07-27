import { Component, OnInit } from '@angular/core';
import {PostsService} from "../../../../core/api/posts.service";
import {Post} from "../../../../core/models/post";
import {MatDialog} from "@angular/material/dialog";
import {CreatePostComponent} from "../create-post/create-post.component";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  serverUrl = 'http://localhost:8080/';
  posts: Post[] = [];

  constructor(
    public dialog: MatDialog,
    private postsService: PostsService,
  ) {}


  ngOnInit(): void {
    this.getPosts();
  }

  getPosts() {
    this.postsService.getPosts().pipe().subscribe(posts => {
      this.posts = posts;
    });
  }

  createPost() {
    this.dialog
      .open(CreatePostComponent, {
        width: '500px',
    })
      .afterClosed()
      .subscribe(() => {
        this.getPosts();
      });
  }

  getPost(id: number) {
    this.postsService.getPost(id).subscribe(post => {
      console.log(post);
    });
  }
}
