import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { SidenavItemsComponent } from './components/sidenav-items/sidenav-items.component';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, Header, MatSidenavModule, SidenavItemsComponent],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {}
