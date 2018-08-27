import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tag } from '../interfaces/tag.interface';
import { Constants } from '../setup/constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  tagUrl = `${Constants.BLOG_URL}/tags`;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getTags(): Observable<Tag[]>{
    return this.http.get<Tag[]>(`${this.tagUrl}`);
  }

  updateTag(id: number, name: string, color: string): Observable<Tag>{
    return this.http.put<Tag>(`${this.tagUrl}`, {id:id, name:name, color:color} as Tag,
      {headers: new HttpHeaders({'Authorization':`Bearer ${this.authService.getToken()}`})}
    );
  }

  createTag(name: string, color: string): Observable<Tag>{
    return this.http.post<Tag>(`${this.tagUrl}`, {name:name, color:color} as Tag,
      {headers: new HttpHeaders({'Authorization':`Bearer ${this.authService.getToken()}`})}
    );
  }

  deleteTag(id: number): Observable<any>{
    return this.http.delete(`${this.tagUrl}/${id}`,
    {headers: new HttpHeaders({'Authorization':`Bearer ${this.authService.getToken()}`})}
    )
  }

}
