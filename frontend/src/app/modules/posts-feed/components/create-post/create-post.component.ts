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

  form!: FormGroup;
  selectedFile: File | null = null;
  post: Post | null = null;

  constructor(
    private dialogRef: MatDialogRef<CreatePostComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number,
    private postsService: PostsService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.generateForm();
    if(this.data) this.getPost(this.data);
  }

  generateForm() {
    this.form = this.fb.group({
      title: [''],
      content: [''],
    });
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

  getPost(id: number) {
    if(!this.data) return;
    this.postsService.getPost(id).subscribe(post => {
      this.post = post;
      this.form.patchValue({
        title: post.title,
        content: post.content,
      });
    });
  }

  createPost() {
    const formData = new FormData();
    if(!this.selectedFile) return;
    formData.append('image', this.selectedFile, this.selectedFile?.name);
    formData.append('title', this.form.value.title);
    formData.append('content', this.form.value.content);

    this.postsService.createPost(formData).subscribe((err) => {

      console.log(err);
      this.dialogRef.close();
    });
  }

  updatePost() {
    const formData = new FormData();
    let updatedPost: Post = {
      title: this.form.value.title,
      content: this.form.value.content,
      image: this.post?.imageUrl,
    };
    if(!this.selectedFile) {
      this.postsService.updatePost(updatedPost, this.data).subscribe((err) => {
        console.log(err);
        this.dialogRef.close();
      });
    } else {
        formData.append('image', this.selectedFile!, this.selectedFile?.name);
        formData.append('title', this.form.value.title);
        formData.append('content', this.form.value.content);

        this.postsService.updatePost(formData, this.data).subscribe((err) => {
          console.log(err);
          this.dialogRef.close();
        });
      }
    }

  closeDialog() {
    this.dialogRef.close();
  }

}
