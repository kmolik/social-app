import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Login} from "../models/login";
import {User} from "../models/user";
const AUTH_API = 'http://localhost:8080/auth';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient ) { }

  login(credentials: Login): Observable<any> {
    return this.http.post(AUTH_API + '/login', {
      email: credentials.email,
      password: credentials.password
    }, httpOptions);
  }

  register(user: User): Observable<any> {
    return this.http.post(AUTH_API + '/signup', {
      name: user.name,
      email: user.email,
      password: user.password
    }, httpOptions);
  }
}
