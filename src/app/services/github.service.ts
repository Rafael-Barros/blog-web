import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GithubUser } from '../interfaces/github-user.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  githubUrl = 'https://api.github.com';


  constructor(private http: HttpClient) { }

  getGithubUser(login: string): Observable<GithubUser>{
    return this.http.get<GithubUser>(`${this.githubUrl}/users/${login}`).pipe(map(
      (user: any) => {
        return {
          'name': user.name,
          'location': user.location,
          'html_url': user.html_url,
          'avatar_url': user.avatar_url
        }
      }
    ));
  }

}
