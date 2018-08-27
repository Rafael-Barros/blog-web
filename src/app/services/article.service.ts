import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constants } from '../setup/constants';
import { Article } from '../interfaces/article.interface';
import { AuthService } from './auth.service';
import { Tag } from '../interfaces/tag.interface';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  articleUrl = `${Constants.BLOG_URL}/articles`;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  edit(article: Article): Observable<Article>{
    return this.http.put<Article>(
      `${this.articleUrl}`,
      {id: article.id, content: article.content, description: article.description, title: article.title, readTime: article.readTime} as Article,
      {headers: new HttpHeaders({'Authorization':`Bearer ${this.authService.getToken()}`})}
    );
  }

  delete(id: number): Observable<any>{
    return this.http.delete(
      `${this.articleUrl}/${id}`,
      {headers: new HttpHeaders({'Authorization':`Bearer ${this.authService.getToken()}`})}
    );
  }

  getArticle(id: number): Observable<Article>{
    return this.http.get<Article>(`${this.articleUrl}/${id}`);
  }

  getArticles(page: number, size: number, userId?: number): Observable<Article[]>{
    if(userId){
      return this.http.get<Article[]>(
        `${this.articleUrl}/user/?page=${page}&size=${size}&sort=createdAt,desc`,
        {headers: new HttpHeaders({'Authorization':`Bearer ${this.authService.getToken()}`})}
      );
    }
    return this.http.get<Article[]>(
      `${this.articleUrl}?page=${page}&size=${size}&sort=createdAt,desc`,
      {headers: new HttpHeaders({'Authorization':`Bearer ${this.authService.getToken()}`})}
    );
  }

  getPublishedArticles(page: number, size: number): Observable<Article[]>{
    return this.http.get<Article[]>(
      `${this.articleUrl}/published/?page=${page}&size=${size}&sort=createdAt,desc`
    );
  }

  getPublishedArticlesByTagId(tagId: number): Observable<Article[]>{
    return this.http.get<Article[]>(`${this.articleUrl}/by_tag/${tagId}&sort=created_at,desc`);
  }

  getPublishedArticlesByTagName(page: number, size: number, tagName: string): Observable<Article[]>{
    return this.http.get<Article[]>(
      `${this.articleUrl}/by_tag_name/${tagName}/?page=${page}&size=${size}&sort=created_at,desc`
    );
  }

  createArticle(article: Article): Observable<Article>{
    return this.http.post<Article>(
      this.articleUrl, article,
      {headers: new HttpHeaders({'Authorization':`Bearer ${this.authService.getToken()}`})}
    );
  }

  addTags(articleId: number, tags: Tag[]): Observable<Tag>{
    let ids = new Array<number>();
    tags.forEach(value => {
      ids.push(value.id);
    });
    return this.http.post<Tag>(
      `${this.articleUrl}/${articleId}/tags/add`, ids ,
      {headers: new HttpHeaders({'Authorization':`Bearer ${this.authService.getToken()}`})}
    );
  }

  uploadFile(fd: FormData, id: number){
    return this.http.post(
      `${this.articleUrl}/${id}/coverImage`, fd,
      {headers: new HttpHeaders({'Authorization':`Bearer ${this.authService.getToken()}`})}
    );
  }

  publishArticle(id: number): Observable<any>{
    return this.http.post<any>(
      `${this.articleUrl}/${id}/publish`, id,
      {headers: new HttpHeaders({'Authorization':`Bearer ${this.authService.getToken()}`})}
    );
  }

}
