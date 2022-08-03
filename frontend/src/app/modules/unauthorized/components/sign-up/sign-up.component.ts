import { Component, OnInit } from '@angular/core';
import {SignUpService} from "../../../../core/authentication/api/sign-up.service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private signUpService: SignUpService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.generateForm();
  }

  generateForm() {
    this.form = this.fb.group({
      name: [''],
      password: [''],
      email: [''],
    });
  }

  submitForm() {
    console.log(this.form.value);
    this.signUpService.signUp(this.form.value).subscribe(() => {
      console.log('sign up success');
    }, error => {
      console.log(error);
    }
    );
  }

}
