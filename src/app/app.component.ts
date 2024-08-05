import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  template: `
    <nav>
      <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Home</a> | 
      <a routerLink="/employees" routerLinkActive="active">Employees</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  styles: [`
    nav {
      margin-bottom: 20px;
    }
    a {
      text-decoration: none;
      color: #2c3e50;
    }
    a.active {
      font-weight: bold;
      color: #007bff;
    }
    a:hover {
      text-decoration: underline;
    }
  `]
})
export class AppComponent {
  title = 'egghead-ngrx-signal-store';
}
