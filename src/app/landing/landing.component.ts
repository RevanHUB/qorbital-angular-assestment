import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  config : any = [];
  constructor(
    private AppComponent : AppComponent
  ) { 
    this.config = this.AppComponent.config;
  }

  ngOnInit(): void {}

}
