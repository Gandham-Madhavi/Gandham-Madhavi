import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'customerApp';
  isHomePage = false;

  constructor(
    private readonly route: Router
  ) { }

  ngOnInit() {
    if (this.route.url.includes('home')) {
      this.isHomePage = true;
    }
  }

  onCreateUserBtnClick() {
    this.route.navigate(['./create']);
  }
}
