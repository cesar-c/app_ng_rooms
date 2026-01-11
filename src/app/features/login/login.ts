import { Component } from '@angular/core';
import { LucideAngularModule, MessageCircleMore } from 'lucide-angular';
import { NgRoomButton } from '../../shared/components/atoms/button/button';

@Component({
  selector: 'ngroom-login',
  imports: [LucideAngularModule, NgRoomButton],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export default class Login {
  readonly messageCircleMore = MessageCircleMore;
}
