import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { ToastService } from '../../services/toast.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @ViewChild('menuNav', { static: true })
  menuNavRef!: ElementRef;
  isHomePage: boolean = false;

  public constructor(
    private loginService: LoginService,
    private toastService: ToastService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isHomePage = this.router.url === '/';
      }
    });
  }

  public toggleMenu(): void {
    const menuNav = this.menuNavRef.nativeElement;
    if (menuNav) {
      menuNav.classList.toggle('active');
    }
  }

  public logout(): void {
    this.loginService.logout();
    this.toastService.showMessage('Deslogado com sucesso!');
    this.router.navigate(['/']);
  }

  public get isAuthenticated(): boolean {
    return this.loginService.isAuthenticated;
  }
}
