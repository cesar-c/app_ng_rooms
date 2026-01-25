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
  readonly authService = inject(AuthService);
  readonly router = inject(Router);
  readonly messageCircleMore = MessageCircleMore;
}
