import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Post} from "../models/post";

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private apiUrl = 'http://localhost:8080/feed';

  constructor(private http: HttpClient) { }

  public getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}/posts`);
  }

  public getPost(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrl}/posts/${id}`);
  }

  public createPost(createPost: FormData): Observable<FormData> {
    return this.http.post<FormData>(`${this.apiUrl}/posts`, createPost);
  }

  public updatePost(updatePost: FormData | Post, id: number): Observable<FormData | Post> {
    return this.http.put<FormData | Post>(`${this.apiUrl}/posts/${id}`, updatePost);
  }

  public deletePost(id: number): Observable<Post> {
    return this.http.delete<Post>(`${this.apiUrl}/posts/${id}`);
  }
}
