import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost/api_php_angular/backend/controllers/Auth.php'; // Ruta a la API de autenticación
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor() {}

  // Método para iniciar sesión
  async login(username: string, password: string): Promise<boolean> {
    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        if (data.message === 'Login successful') {
          this.isAuthenticatedSubject.next(true); // El usuario está autenticado
          return true;
        }
      }

      return false;
    } catch (error) {
      console.error('Error en la autenticación:', error);
      return false;
    }
  }

  // Método para cerrar sesión
  logout(): void {
    this.isAuthenticatedSubject.next(false);
  }
}
