import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Login} from "../models/login";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'http://localhost:8080/auth/login';

  constructor(private http: HttpClient) { }

  public login(signInRequest: Login): Observable<Login> {
    return this.http.post<Login>(`${this.apiUrl}`, signInRequest);
  }

}
