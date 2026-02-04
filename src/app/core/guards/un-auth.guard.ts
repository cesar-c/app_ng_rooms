import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, take, tap } from 'rxjs/operators';
import { LoaderService } from '@core/services/loader.service';
import { AuthService } from '@core/services/auth.service';

export const unAuthGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const loaderService = inject(LoaderService);
  const router = inject(Router);
  console.log('unAuthGuard invoked');
  loaderService.show();

  return authService.authState$.pipe(
    take(1),
    map((user) => {
      if (user) {
        router.navigate(['/room']);
        return false;
      }
      return true;
    }),
    tap(() => loaderService.hide()),
  );
};
