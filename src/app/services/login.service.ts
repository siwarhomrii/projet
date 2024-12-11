import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

const API = "http://localhost:3000/admin";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly http: HttpClient = inject(HttpClient);
  getLogin(): Observable<{ userName: string; password: string }> {
    return this.http.get<{ userName: string; password: string }>(API);
  }
  modifyLogin(login: { userName: string; password: string }): Observable<{ userName: string; password: string }> {
    return this.http.put<{ userName: string; password: string }>(API,login);
  }
}