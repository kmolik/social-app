import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  private apiUrl = 'http://localhost:8080/auth/signup';

  constructor(private http: HttpClient) { }

  public signUp(signUpRequest: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}`, signUpRequest);
  }
}
