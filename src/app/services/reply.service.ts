import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constants } from '../setup/constants';
import { Reply } from '../interfaces/reply.interface';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ReplyService {
  replyUrl = `${Constants.BLOG_URL}/comments`;

  constructor(private http: HttpClient, private authService: AuthService) { }

  getReplies(commentId: number): Observable<Reply[]>{
    return this.http.get<Reply[]>(`${this.replyUrl}/${commentId}/replies`);
  }

  update(id: number, text: string): Observable<Reply>{
    console.log(text);
    return this.http.put<Reply>(
      `${this.replyUrl}/0/replies/${id}`,
      {text: text} as Reply,
      {headers: new HttpHeaders({'Authorization':`Bearer ${this.authService.getToken()}`})}
    );
  }

  createReply(commentId: number, text: string): Observable<Reply>{
    return this.http.post<Reply>(
      `${this.replyUrl}/${commentId}/replies`,
      {text: text} as Reply,
      {headers: new HttpHeaders({'Authorization':`Bearer ${this.authService.getToken()}`})}
    );
  }

  delete(id: number): Observable<any>{
    return this.http.delete(
      `${this.replyUrl}/0/replies/${id}`,
      {headers: new HttpHeaders({'Authorization':`Bearer ${this.authService.getToken()}`})}
    );
  }

}
