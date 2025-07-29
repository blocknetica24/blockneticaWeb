import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  callGetMiddleware(url: string) {
    return this.http
      .get(`${environment.baseURL}` + url, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      })
      .pipe(
        map((response: any) => {
        })
      );
  }
  callPostMiddleware(url: string, form: any) {
    return this.http
      .post(`${environment.baseURL}` + url, form, {
        withCredentials: true,
      })
      .pipe(
        map((response: any) => {
        })
      );
  }

  callPutMiddleware(url: string, form: any) {
    return this.http
      .put(`${environment.baseURL}` + url, form, {
        withCredentials: true,
      })
      .pipe(
        map((response: any) => {
        })
      );
  }

  callPatchMiddleware(url: string, form: any) {
    return this.http.patch(`${environment.baseURL}` + url, form).pipe(
      map((response: any) => {
      })
    );
  }

  callDeleteMiddleware(url: string, body: any) {
    return this.http.delete(`${environment.baseURL}` + url, body).pipe(
      map((response: any) => {
      })
    );
  }
}

