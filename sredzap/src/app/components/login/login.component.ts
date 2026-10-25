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
    // Redirects directly to the backend to initiate the OAuth flow
    window.location.href = 'http://localhost:3000/api/auth/github';
  }
}
