import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Loader } from '@components/atoms/loader/loader';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [Loader],
})
export class App {
  private router = inject(Router);

  ngOnInit() {}
}
