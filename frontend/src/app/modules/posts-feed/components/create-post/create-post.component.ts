import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup} from "@angular/forms";
import {PostsService} from "../../../../core/api/posts.service";
import {Post} from "../../../../core/models/post";

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  form: FormGroup;
  selectedFile: File | null = null;
  post: Post | null = null;

  constructor(
    private dialogRef: MatDialogRef<CreatePostComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number,
    private postsService: PostsService,
    private fb: FormBuilder,
  ) {
    this.form = this.generateForm();
  }

  ngOnInit(): void {
    if(this.data) this.getPost(this.data);
  }

  submitForm() {
    if(this.data) this.updatePost();
    else this.createPost();
  }

  onFileSelect(event: Event) {
    const target = event.target as HTMLInputElement;
    if(!target.files) return;
    if (target.files.length > 0) {
      this.selectedFile = target.files[0];
    }
  }

  createPost() {
    this.postsService.createPost(this.createPostFormData()).subscribe(() => {
      this.closeDialog()
    });
  }

  updatePost() {
    const postData = this.selectedFile ? this.createPostFormData() : this.createUpdatePost();

    this.postsService.updatePost(postData, this.data).subscribe(() => {
      this.closeDialog()
    });
    }

  closeDialog() {
    this.dialogRef.close();
  }

  private createPostFormData(): FormData {
    const formData = new FormData();
    formData.append('image', this.selectedFile!, this.selectedFile?.name);
    formData.append('title', this.form.value.title);
    formData.append('content', this.form.value.content);
    return formData;
  }

  private createUpdatePost(): Post {
    return {
      title: this.form.value.title,
      content: this.form.value.content,
      image: this.post?.imageUrl,
    };
  }

  private getPost(id: number) {
    if(!this.data) return;
    this.postsService.getPost(id).subscribe(post => {
      this.post = post;
      this.form.patchValue({
        title: post.title,
        content: post.content,
      });
    });
  }

  private generateForm(): FormGroup {
    return  this.fb.group({
      title: [''],
      content: [''],
    });
  }
}
