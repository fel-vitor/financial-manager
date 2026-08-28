import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { SidenavComponent } from './components/sidenav/sidenav.component';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, Header, SidenavComponent],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {}
