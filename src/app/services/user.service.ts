import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constants } from '../setup/constants';
import { AuthService } from './auth.service';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userUrl = `${Constants.BLOG_URL}/users`

  constructor(private http: HttpClient, private authService: AuthService) { }

  getUsers(param: string): Observable<User[]>{
    return this.http.get<User[]>(`${this.userUrl}/${param}`);
  }

  getUser(id: number): Observable<User>{
    return this.http.get<User>(`${this.userUrl}/${id}`);
  }

  getProfileImage(): Observable<any>{
    return this.http.get<any>(`${this.userUrl}/profileImage`, {headers: new HttpHeaders({'Authorization':`Bearer ${this.authService.getToken()}`})}).pipe(map(image => {
      if(image){
        return image.name;
      }
      return null;
    }));
  }

  setProfileImage(id: number, data: FormData): Observable<any>{
    return this.http.post(`${this.userUrl}/${id}/profileImage`, data, {headers: new HttpHeaders({'Authorization':`Bearer ${this.authService.getToken()}`})});
  }
}
