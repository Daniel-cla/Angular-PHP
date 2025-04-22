import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  async onSubmit(): Promise<void> {
    const success = await this.authService.login(this.username, this.password);
    if (success) {
      this.router.navigate(['/home']); 
    } else {
      this.errorMessage = 'Credenciales inválidas. Intenta de nuevo.';
    }
  }
}
