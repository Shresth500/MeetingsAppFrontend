import { provideRouter, Routes } from '@angular/router';
import { routes as UserRoutes } from './User/user.routes';
import { routes as MenuRoutes } from './Meeting/menu.routes';
import { HomeComponent } from './Meeting/home/home.component';
import { authGuard } from './common/auth/auth.guard';

export const routes: Routes = [];
