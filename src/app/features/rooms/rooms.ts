import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { Sidebar } from './components/sidebar/sidebar';
import { ChatPanel } from './components/chat-panel/chat-panel';

@Component({
  selector: 'ngroom-rooms',
  imports: [CommonModule, LucideAngularModule, ChatPanel, Sidebar],
  templateUrl: './rooms.html',
  styleUrl: './rooms.css',
})
export default class Rooms {
  


}
