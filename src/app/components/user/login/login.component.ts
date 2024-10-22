import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/core/services/login.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { User } from 'src/app/shared/interfaces/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm = new FormGroup({
    login: new FormControl('', [Validators.required]),
    senha: new FormControl('', [Validators.required]),
  });

  constructor(
    private loginService: LoginService,
    private router: Router,
    private toastService: ToastService
  ) {}

  onSubmit() {
    if (this.loginForm.valid) {
      const data: User = {
        login: this.loginForm.get('login')!.value!,
        senha: this.loginForm.get('senha')!.value!,
      };

      this.loginService.login(data).subscribe({
        next: () => this.router.navigate(['lista']),
        error: () =>
          console.error(
            this.toastService.showMessage(
              'Login error: Login ou Senha incorreta tente novamente!'
            )
          ),
      });
    }
  }
}
