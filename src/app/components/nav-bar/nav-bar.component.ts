import { NgClass } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AppRoutesEnum } from '../../enums/routes.enum';
import { filter } from 'rxjs';
@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [NgClass],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent {
  scrolled = false;
  appRoutesEnum = AppRoutesEnum;
  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Detect scroll > 50px
    if(this.router.url === "/"){
      this.scrolled = window.pageYOffset > 50;
    }
  }

  constructor(
    public router: Router
  ) { }

  ngOnInit() {
    this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(() => {
      this.scrolled = this.router.url !== "/";
    });
  }

  redirectToUrl(url: string){
    this.router.navigate([url]);
  }
}
