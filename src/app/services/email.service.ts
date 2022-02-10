import { email } from '../email';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  url: string = "http://localhost:52491/api/Email/"
  sende(e: email):Observable<boolean> {
    return this.http.post<boolean>(this.url + "sentmail/", e);
  }
  constructor(private http: HttpClient) { }
}