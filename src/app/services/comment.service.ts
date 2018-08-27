import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constants } from '../setup/constants';
import { Comment } from '../interfaces/comment.interface';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  commentUrl = `${Constants.BLOG_URL}/comments`;

  constructor(private http: HttpClient, private authService: AuthService) { }

  getComment(id: number): Observable<Comment>{
    return this.http.get<Comment>(
      `${this.commentUrl}/${id}`,
      {headers: new HttpHeaders({'Authorization':`Bearer ${this.authService.getToken()}`})}
    );
  }

  getComments(): Observable<Comment[]>{
    return this.http.get<Comment[]>(
      `${this.commentUrl}`,
      {headers: new HttpHeaders({'Authorization':`Bearer ${this.authService.getToken()}`})}
    );
  }

  getCommentsByArticleId(articleId: number): Observable<Comment[]>{
    return this.http.get<Comment[]>(
      `${this.commentUrl}/by_article/${articleId}/?sort=createdAt,desc`,
      {headers: new HttpHeaders({'Authorization':`Bearer ${this.authService.getToken()}`})}
    );
  }

  createComment(text: string, articleId: number): Observable<Comment>{
    return this.http.post<Comment>(
      `${this.commentUrl}/${articleId}`, {text: text} as Comment,
      {headers: new HttpHeaders({'Authorization':`Bearer ${this.authService.getToken()}`})}
    );
  }

  deleteComment(id: number): Observable<any>{
    return this.http.delete<any>(
      `${this.commentUrl}/${id}`,
      {headers: new HttpHeaders({'Authorization':`Bearer ${this.authService.getToken()}`})}
    );
  }

  updateComment(id: number, text: string): Observable<Comment>{
    return this.http.put<Comment>(
      `${this.commentUrl}/${id}`, {id:id, text:text} as Comment,
      {headers: new HttpHeaders({'Authorization':`Bearer ${this.authService.getToken()}`})}
    );
  }


}
