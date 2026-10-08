import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { isActive, Router, RouterLink } from '@angular/router';
import { LoggedInUserStoreService } from '@core/auth/stores/logged-in-user-store.service';
import { SidenavVisibilityStore } from '@core/layout/stores/sidenav-visibility.store';
import { LogoutDirective } from './directives/logout.directive';

function isRouterActive(route: string) {
  const router = inject(Router);
  return isActive(route, router, { paths: 'exact' });
}

function createSidenavItems({ label, url }: { label: string; url: string }) {
  return {
    label: label,
    url: url,
    isActive: isRouterActive(url),
  };
}

@Component({
  selector: 'app-sidenav-items',
  imports: [RouterLink, MatListModule, LogoutDirective],
  templateUrl: './sidenav-items.component.html',
  styleUrl: './sidenav-items.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavItemsComponent {
  private readonly loggedInUserStoreService = inject(LoggedInUserStoreService);
  private readonly sidenavVisibilityStore = inject(SidenavVisibilityStore);

  links = signal([
    createSidenavItems({ label: 'Home', url: '/' }),
    createSidenavItems({ label: 'Transações', url: '/transactions' }),
  ]);

  isLoggedIn = computed(() => this.loggedInUserStoreService.isLoggedIn());

  closeSidenav() {
    this.sidenavVisibilityStore.close();
  }
}
