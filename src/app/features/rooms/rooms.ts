import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { Sidebar } from './components/sidebar/sidebar';

@Component({
  selector: 'ngroom-rooms',
  imports: [CommonModule, RouterOutlet, LucideAngularModule, Sidebar],
  templateUrl: './rooms.html',
  styleUrl: './rooms.css',
})
export default class Rooms {
  


}
