import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgRoomButton } from './shared/components/atoms/button/button';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [NgRoomButton],
})
export class App {
  protected readonly title = signal('ng-rooms');
}
