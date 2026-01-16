import { Component, computed } from '@angular/core';

@Component({
  selector: 'ngroom-rooms',
  imports: [],
  templateUrl: './rooms.html',
  styleUrl: './rooms.css',
})
export default class Rooms {
  totalItems = 16;

  items = computed(() =>
    Array.from({ length: this.totalItems }, (_, i) => ({ id: i + 1, name: `Room ${i + 1}` }))
  );

  messages = [
    { user: 'Alice', text: 'Hello everyone' },
    { user: 'Bob', text: 'Hi Alice!' },
  ];
}
