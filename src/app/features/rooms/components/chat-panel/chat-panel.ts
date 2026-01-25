import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgRoomButton } from '@components/atoms/button/button';
import { LucideAngularModule, Menu, SmilePlus } from 'lucide-angular';

@Component({
  selector: 'ngroom-chat-panel',
  imports: [CommonModule, NgRoomButton, LucideAngularModule],
  templateUrl: './chat-panel.html',
  styleUrl: './chat-panel.css',
})
export class ChatPanel {
  menuIcon = Menu;
  smilePlusIcon = SmilePlus;
  messages = [
    { id: 1, user: 'Alice', text: 'Hello everyone', isOwn: false },
    { id: 2, user: 'Bob', text: 'Hi Alice!', isOwn: false },
    {
      id: 3,
      user: 'Hein',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eros leo, sodales ut nisl aliquam, blandit laoreet nulla. Donec viverra diam ante, id fermentum justo faucibus quis. Nullam sed ultricies dui. Ut ac nisi euismod, facilisis purus sed, rutrum felis. Nullam vitae tempor felis. Curabitur dapibus, libero non fermentum tristique, purus nisl efficitur dui, eget lacinia diam est ac est. Maecenas non ex suscipit, molestie ligula eget, tempus erat. Mauris accumsan nulla eget tortor bibendum volutpat. Nunc ac posuere urna. Nulla mattis eget purus et imperdiet. Sed nec nisi ex. Ut nec metus lacus.',
      isOwn: false,
    },
    {
      id: 4,
      user: 'Cesar',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eros leo, sodales ut nisl aliquam, blandit laoreet nulla. Donec viverra diam ante, id fermentum justo faucibus quis. Nullam sed ultricies dui. Ut ac nisi euismod, facilisis purus sed, rutrum felis. Nullam vitae tempor felis. Curabitur dapibus, libero non fermentum tristique, purus nisl efficitur dui, eget lacinia diam est ac est. Maecenas non ex suscipit, molestie ligula eget, tempus erat. Mauris accumsan nulla eget tortor bibendum volutpat. Nunc ac posuere urna. Nulla mattis eget purus et imperdiet. Sed nec nisi ex. Ut nec metus lacus.',
      isOwn: true,
    },
    { id: 5, user: 'Alice', text: 'Hello everyone', isOwn: false },
    { id: 6, user: 'Bob', text: 'Hi Alice!', isOwn: false },
    { id: 7, user: 'Cesar', text: 'Hello everyone', isOwn: true },
    { id: 8, user: 'Bob', text: 'Hi Alice!', isOwn: false },
  ];
}
