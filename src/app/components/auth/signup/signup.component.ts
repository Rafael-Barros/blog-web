import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { SignupRequest } from '../../../interfaces/signup-request.interface';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  errorMessages: Array<string>;
  selectedFiles: any = null;
  filenames: Array<string>;
  imagePreview: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
  }

  onSignup(
      firstName: string, lastName: string, username: string, email: string, password: string
    ): void{
    this.authService.signup({firstName, lastName, username, email, password} as SignupRequest)
      .subscribe(
        (res: any) => {
          //this.uploadProfileImage(res.message);
          this.router.navigate(['signin']);
        },
        (error: any) => {
          this.errorMessages = new Array();
          console.log(error);
          if(error.error.errors){
            error.error.errors.forEach(value => this.errorMessages.push(value));
          }else{
            this.errorMessages.push(error.error.error);
          }

        }
    );
  }

  enterPressed(event: any, firstName: string, lastName: string, username: string, email: string, password: string): void{
    if(event.key == 'Enter') this.onSignup(firstName, lastName, username, email, password);
  }

  // onFileSelected(event): void{
  //   this.selectedFiles = <File> event.target.files;
  //   this.imagePreview = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(this.selectedFiles[0]));
  //   this.filenames = new Array();
  //   for(let i = 0; i < this.selectedFiles.length; i++){
  //     this.filenames.push(this.selectedFiles[i].name);
  //   }
  // }
  //
  // uploadProfileImage(id: number): void{
  //   const data = new FormData();
  //   data.append('file', this.selectedFiles[0]);
  //   this.userService.setProfileImage(id, data).subscribe();
  // }

}
