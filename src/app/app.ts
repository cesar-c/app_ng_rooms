import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Loader } from '@components/atoms/loader/loader';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [Loader, RouterOutlet],
})
export class App {}
