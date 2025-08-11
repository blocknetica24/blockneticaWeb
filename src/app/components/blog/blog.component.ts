import { Component } from '@angular/core';
import { TruncatePipe } from '../../pipes/truncate.pipe';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { AppRoutesEnum } from '../../enums/routes.enum';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [
    NgClass,
    TruncatePipe
  ],
  providers: [TruncatePipe],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export class BlogComponent {
 blogsList: any[] = [];
  constructor(
    private router: Router,
    private blogService: BlogService
  ) {}

  ngOnInit() {
    this.blogService.getBlogs().subscribe((data) => {
      this.blogsList = data;
    });
  }

  viewBlogDetails(blog: any) {
    window.scrollTo(0, 0);
    this.router.navigate([`${AppRoutesEnum.BLOGS}/${blog.slug}`]);
  }

}
