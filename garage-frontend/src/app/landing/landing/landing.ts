import { Component } from '@angular/core';
import { Header } from "../header/header";
import { HeroSection } from "../hero-section/hero-section";
import { Guide } from "../guide/guide";
import { Footer } from "../footer/footer";



@Component({
  selector: 'app-landing',
  imports: [Header, HeroSection, Guide, Footer],
  templateUrl: './landing.html',
  styleUrl: './landing.css'
})
export class Landing {

  
}
