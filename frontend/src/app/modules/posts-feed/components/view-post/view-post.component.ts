import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {PostsService} from "../../../../core/api/posts.service";
import {Post} from "../../../../core/models/post";

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.scss']
})
export class ViewPostComponent implements OnInit {
  serverUrl = 'http://localhost:8080/';
  post: Post | null = null;

  constructor(
    public dialogRef: MatDialogRef<ViewPostComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number,
    private postsService: PostsService
  ) { }

  ngOnInit(): void {
    this.getPost(this.data)
  }

  getPost(id: number) {
    this.postsService.getPost(id).subscribe(post => {
      this.post = post;
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
