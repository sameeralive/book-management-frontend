import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthorService {
  private apiUrl = `${environment.apiUrl}/authors`;
  constructor(private http: HttpClient) {}

  getAuthors(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getAuthor(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createAuthor(author: any): Observable<any> {
    return this.http.post(this.apiUrl, author);
  }

  updateAuthor(id: string, author: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, author);
  }
}
