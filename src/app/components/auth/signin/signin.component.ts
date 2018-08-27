import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { SigninRequest } from '../../../interfaces/signin-request.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  errorMessages: Array<string>;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onSignin(usernameOrEmail: string, password: string): void{
    this.authService.signin({usernameOrEmail, password} as SigninRequest).subscribe(
      (res: any) => {
        this.router.navigate(['home']);
      },
      (error: any) => {
        if(error.error.errors){
          this.errorMessages = new Array();
          error.error.errors.forEach(value => this.errorMessages.push(value));
        }else{
          this.errorMessages = new Array();
          this.errorMessages.push(error.error.message);
        }

      }
    );
  }

  enterPressed(event: any, usernameOrEmail: string, password: string): void{
    if(event.key == 'Enter') this.onSignin(usernameOrEmail, password);
  }

}
