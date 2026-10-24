import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginWithGithub() {
    // Redirige directamente al backend para iniciar el flujo OAuth
    window.location.href = 'http://localhost:3000/api/auth/github';
  }
}
