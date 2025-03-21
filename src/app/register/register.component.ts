import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../interfaces/user.interface';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [IonicModule, FormsModule],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  user: User = {
    id: 0,
    email: '',
    password: ''
  };

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  register() {
    // Generate a random ID (in production, this should be handled by the backend)
    this.user.id = Math.floor(Math.random() * 1000);
    
    this.http.post<User>('http://localhost:3000/users', this.user)
      .subscribe({
        next: (response) => {
          console.log('Usuario Registrado', response);
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Registro Erroneo', error);
          alert('Registro erroneo, vuelve intentar nuevamente.');
        }
      });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}