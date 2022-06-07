import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  url = 'https://reqres.in/api/users?page=';
  userUrl = 'https://reqres.in/api/';
  constructor(private http: HttpClient) {}
  getUsers(page = 1) {
    return this.http.get(this.url + page);
  }

  userDetail(id: string) {
    let userData$ = this.http.get(this.userUrl + 'users/' + id);
    let userResource$ = this.http.get(this.userUrl + 'unknown/' + id);
    return forkJoin({
      userData$,
      userResource$,
    });
  }
}
