import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { AccessToken } from 'src/app/shared/interfaces/acess-token';
import { User } from 'src/app/shared/interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private baseUrl = environment.API_URL;

  private readonly TOKEN_KEY: string = 'token';

  public constructor(private http: HttpClient, private router: Router) {}

  public login(userData: User): Observable<AccessToken> {
    return this.http.post<AccessToken>(`${this.baseUrl}login`, userData).pipe(
      tap(({ token }: AccessToken) => {
        this.token = token;
      })
    );
  }

  public logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.router.navigateByUrl('/entrar');
  }

  public get isAuthenticated(): boolean {
    return !!this.token;
  }

  public get token(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  public set token(authToken: string | null) {
    if (authToken) {
      localStorage.setItem(this.TOKEN_KEY, authToken);
    } else {
      localStorage.removeItem(this.TOKEN_KEY);
    }
  }
}
