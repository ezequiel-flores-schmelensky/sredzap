import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'sredzap';

  loginWithGithub() {
    // Redirige directamente al backend para iniciar el flujo OAuth
    window.location.href = 'http://localhost:3000/api/auth/github';
  }
}
