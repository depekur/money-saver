import { Component, OnInit } from '@angular/core';
import { CONFIG } from '../../CONFIG';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  title: string = CONFIG.appTitle;

  constructor() { }

  ngOnInit() {
  }

}
