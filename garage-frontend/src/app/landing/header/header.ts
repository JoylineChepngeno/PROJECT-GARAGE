import { Component } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButton } from '@angular/material/button';
import { MatMenu } from '@angular/material/menu';
// { MatCardAvatar } from "@angular/material/card";
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
//import { MatSidenavContainer } from '@angular/material/sidenav';
//import { MatNavList } from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';
import { MatMenuItem, MatMenuTrigger } from "@angular/material/menu";
import { MatToolbar } from '@angular/material/toolbar';
import { RouterLink } from "@angular/router";
//import { MatIconButton } from "@angular/material/button";


@Component({
  selector: 'app-header',
  imports: [MatExpansionModule, MatButton, MatIcon, MatMenu,
    // MatSidenavContent,
     //MatSidenav,
    //MatSidenavContainer,
    MatMenuItem, MatMenuTrigger, MatToolbar, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {

  menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }



}
