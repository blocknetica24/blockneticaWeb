import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(
     private http: HttpClient
   ) { }

    getBlogs(): Observable<any> {
    return this.http.get('assets/data/blogs.json');
  }

   getBlogBySlug(slug: string): Observable<any | undefined> {
    return this.getBlogs().pipe(
      map((blogs) => blogs.find((blog: any) => blog.slug === slug))
    );
  }
}
