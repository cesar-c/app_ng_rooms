import { Component, inject } from '@angular/core';
import { LucideAngularModule, MessageCircleMore } from 'lucide-angular';
import { NgRoomButton } from '@components/atoms/button/button';
import { AuthService } from '@core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngroom-login',
  imports: [LucideAngularModule, NgRoomButton],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export default class Login {
  private authService = inject(AuthService);
  private router = inject(Router);
  readonly messageCircleMore = MessageCircleMore;

  signIn() {
    this.authService.signInWithGoogle().subscribe((user) => {
      if (user) this.router.navigate(['/room']);
    });
  }
}
