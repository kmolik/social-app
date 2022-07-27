import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import { FormControl, FormGroup } from "@angular/forms";
import {PostsService} from "../../../../core/api/posts.service";

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  postForm!: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<CreatePostComponent>,
    private postsService: PostsService,
  ) { }

  ngOnInit(): void {
    this.postForm = new FormGroup({
      title: new FormControl(''),
      content: new FormControl(''),

    });
  }

  submitForm() {
    this.postsService.createPost(this.postForm.value).subscribe(() => {
      this.closeDialog();
    })
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
