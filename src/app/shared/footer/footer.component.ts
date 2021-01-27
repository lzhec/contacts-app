import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  title = ' All rights reserved';
  year = new Date().getFullYear();

  constructor() { }

  ngOnInit(): void {
  }

}
