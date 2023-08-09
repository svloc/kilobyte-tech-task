import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  host: string = '';
  token: any = '';
  public clientData:any='';

  constructor(private http: HttpClient) {
    this.host = environment.apiUrl;
    this.token = localStorage.getItem('token');
  }
  private createAuthHeaders(): HttpHeaders {
    return new HttpHeaders({ Authorization: `Bearer ${this.token}` });
  }

  viewAll(): Observable<any> {
    try {
      const headers = this.createAuthHeaders();
      console.log(headers);
      return this.http.get(this.host, { headers });
    } catch (error) {
      return throwError('Something went wrong. Please try again later.');
    }
  }
  

}
