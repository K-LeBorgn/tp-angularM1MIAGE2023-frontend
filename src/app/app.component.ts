import {Component, OnInit} from '@angular/core';
import {AuthService} from "./shared/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'assignment-app';
  sideBarOpen = false;

  constructor(private authService:AuthService, private router : Router) {  }

  isLogged() {
    return this.authService.loggedIn;
  }

  logOut(){
    this.authService.logOut();
    this.router.navigate(['/home']);
  }

}
