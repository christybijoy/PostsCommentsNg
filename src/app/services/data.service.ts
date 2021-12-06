import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any>{
    return this.http.get("https://jsonplaceholder.typicode.com/users");
  }

  fetchUserPost(id:number): Observable<any>{
    return this.http.get("https://jsonplaceholder.typicode.com/posts/?userId="+id);
  }

  fetchComments(id:number): Observable<any>{
    return this.http.get("https://jsonplaceholder.typicode.com/comments/?postId="+id);
  }
}
