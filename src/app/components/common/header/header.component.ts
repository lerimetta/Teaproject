import { Component, OnInit } from '@angular/core';
import { AppRoutingModule } from "src/app/app-routing.module";

@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  // imports: [AppRoutingModule]
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
