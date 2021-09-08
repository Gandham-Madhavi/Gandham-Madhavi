import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CreateUserService {

  constructor(public http: HttpClient) { }
  public url = 'https://jsonplaceholder.typicode.com/users';

  userForm(payload) {
    return this.http.post(this.url, payload).pipe(map(data => data as any));
  }

  getUserDetails() {
    return this.http.get(this.url).pipe(map(data => data as any));
  }

  deleteUserDetails(userId) {
    const url = `https://jsonplaceholder.typicode.com/users?userId=` + userId;
    return this.http.get(url).pipe(map(data => data as any));
  }

  updateUserDetails(userId, payload) {
    const url = `https://jsonplaceholder.typicode.com/users?userId=` + userId;
    return this.http.put(url, payload).pipe(map(data => data as any));
  }

}
