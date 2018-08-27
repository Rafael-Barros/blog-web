import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constants } from '../setup/constants';
import { SignupRequest } from '../interfaces/signup-request.interface';
import { SigninRequest } from '../interfaces/signin-request.interface';
import * as jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authUser: User;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  signup(signupRequest: SignupRequest): Observable<any>{
    return this.http.post(`${Constants.BLOG_URL}/auth/signup`, signupRequest);
  }

  signin(signinRequest: SigninRequest): Observable<any>{
    return this.http.post(`${Constants.BLOG_URL}/auth/signin`, signinRequest).pipe(
      map((token: any) =>{
        localStorage.setItem('rbsToken', JSON.stringify(token));
        window.location.reload();
        return token;
      })
    );
  }

  logout(): void{
    localStorage.removeItem('rbsToken');
    this.router.navigate(['home']);
  }

  isLoggedIn(): boolean{
    if(localStorage.getItem('rbsToken')) return true;
    return false;
  }

  getToken(): string{
    if(localStorage.getItem('rbsToken')){
      let token = JSON.parse(localStorage.getItem('rbsToken'));
      return token.accessToken;
    }
    return null;
  }

  getDecodedToken(): any{
    if(localStorage.getItem('rbsToken')) return jwt_decode(localStorage.getItem('rbsToken'));
    return null;
  }

  getAuthUserId(): number{
    if(!this.isLoggedIn()) return 0;
    return this.getDecodedToken().user.id;
  }

  getAuthUser(): User{
    if(!this.isLoggedIn()) return null
    return this.getDecodedToken().userComplete;
  }

  isAdmin(): boolean{
    if(this.isLoggedIn()) {
      for(let i = 0; i < this.getDecodedToken().user.authorities.length; i++){
        if(this.getDecodedToken().user.authorities[i].authority == 'ROLE_ADMIN') return true;
      }
    }
    return false;
  }

  isAuthor(): boolean{
    if(this.isLoggedIn()) {
      for(let i = 0; i < this.getDecodedToken().user.authorities.length; i++){
        if(this.getDecodedToken().user.authorities[i].authority == 'ROLE_AUTHOR') return true;
      }
    }
    return false;
  }

  isUser(): boolean{
    if(this.isLoggedIn()) {
      for(let i = 0; i < this.getDecodedToken().user.authorities.length; i++){
        if(this.getDecodedToken().user.authorities[i].authority == 'ROLE_USER') return true;
      }
    }
    return false;
  }

}
