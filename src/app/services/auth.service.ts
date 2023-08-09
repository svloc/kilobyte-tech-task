import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public api_auth: string = '';
  constructor(private http: HttpClient) {
    this.api_auth = environment.loginUrl;
  }
  login(user: any): Observable<any> {
    return this.http.post(this.api_auth, user);
  }
}
