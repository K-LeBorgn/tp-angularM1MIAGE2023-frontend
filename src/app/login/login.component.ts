import { Component, OnInit } from '@angular/core';
import {AuthService} from "../shared/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService : AuthService, private router : Router) { }

  username : string = "";
  password : string = "";

  ngOnInit(): void {
  }

  handleUsernameChange(event : any){
    this.username = event.target.value;
  }

  handlePasswordChange(event : any){
    this.password = event.target.value;
  }

  login(){
    console.log(this.username, " / ", this.password);
    this.authService.logIn(this.username, this.password);
    this.router.navigate(['/home'])
  }

}
