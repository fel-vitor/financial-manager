import { Component, computed, inject, signal } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LogoutDirective } from './directives/logout.directive';
import { LoggedInUserStoreService } from '@core/auth/stores/logged-in-user-store.service';

@Component({
  selector: 'app-sidenav-items',
  imports: [RouterLink, RouterLinkActive, MatListModule, LogoutDirective],
  templateUrl: './sidenav-items.component.html',
  styleUrl: './sidenav-items.component.scss',
})
export class SidenavItemsComponent {
  private readonly loggedInUserStoreService = inject(LoggedInUserStoreService);

  links = signal([
    {
      label: 'Home',
      url: '/',
    },
  ]);

  isLoggedIn = computed(() => this.loggedInUserStoreService.isLoggedIn());
}
