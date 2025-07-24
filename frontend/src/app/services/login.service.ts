import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:3000/customer-login';

  constructor(private http: HttpClient) {}

  customerLogin(user: string, pass: string): Observable<any> {
    const url = `${this.apiUrl}?user=${user}&pass=${pass}`;
    return this.http.get(url);
  }
}
