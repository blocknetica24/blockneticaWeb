import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../../../services/blog.service';

@Component({
  selector: 'app-view-blog',
  standalone: true,
  imports: [],
  templateUrl: './view-blog.component.html',
  styleUrl: './view-blog.component.scss'
})
export class ViewBlogComponent {
   slug!: string;
   blogDetails: any;

   constructor(
    private route: ActivatedRoute,
    private blogService: BlogService
  ) {}

  ngOnInit() {
    this.slug = this.route.snapshot.paramMap.get('slug') || '';
    this.blogService.getBlogBySlug(this.slug).subscribe((data) => {
      this.blogDetails = data;
    });
  }

}
