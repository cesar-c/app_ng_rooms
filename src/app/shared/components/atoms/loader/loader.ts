import { Component, inject } from '@angular/core';
import { LoaderService } from '@core/services/loader.service';

@Component({
  selector: 'ngroom-loader',
  imports: [],
  templateUrl: './loader.html',
  styleUrl: './loader.css',
})
export class Loader {
  loaderService = inject(LoaderService);
}
