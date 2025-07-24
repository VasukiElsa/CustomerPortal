import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user = '';
  pass = '';
  message = '';

  constructor(private loginService: LoginService, private router: Router) {}

  onLogin(): void {
    this.message = 'Logging in...';

    // ✅ Pad user ID to 10 digits
    const paddedUserId = this.user.padStart(10, '0');

    this.loginService.customerLogin(paddedUserId, this.pass).subscribe({
      next: (response) => {
        console.log(response);
        const result = response?.d?.EvResult;

        if (result === 'Login successful') {
          // ✅ Navigate to dashboard
          this.router.navigate(['/dashboard']);

          // ✅ Save padded ID to local storage for later use
          localStorage.setItem('username', paddedUserId);
        } else {
          this.message = result || 'Invalid credentials';
        }
      },
      error: (error) => {
        console.error(error);
        this.message = 'Login failed. Check credentials.';
      }
    });
  }
}
