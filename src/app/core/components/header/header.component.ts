import { Component, ElementRef, ViewChild } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @ViewChild('menuNav', { static: true })
  menuNavRef!: ElementRef;

  public constructor(private loginService: LoginService) {}

  public toggleMenu() {
    const menuNav = this.menuNavRef.nativeElement;
    if (menuNav) {
      menuNav.classList.toggle('active');
    }
  }

  public logout(): void {
    this.loginService.logout();
  }

  public get isAuthenticated(): boolean {
    return this.loginService.isAuthenticated;
  }
}
