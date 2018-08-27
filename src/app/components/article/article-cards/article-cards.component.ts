import { Component, OnInit } from '@angular/core';
import { Article } from '../../../interfaces/article.interface';
import { ArticleService } from '../../../services/article.service';
import { ActivatedRoute } from '@angular/router';
import { Page } from '../../../interfaces/page.interface';

@Component({
  selector: 'app-article-cards',
  templateUrl: './article-cards.component.html',
  styleUrls: ['./article-cards.component.css']
})
export class ArticleCardsComponent implements OnInit {
  articles: Article[];
  name: string;
  page: number = 0;
  size: number = 12;
  pages: Array<number>;
  user: any;

  constructor(private articleService: ArticleService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(param => {
      this.name = param.name;
      this.getPublishedArticlesByTagName(this.page, this.size, this.name);
    });
  }

  setPage(page: number, event: any){
    event.preventDefault();
    this.page = page;
    this.getPublishedArticlesByTagName(this.page, this.size, this.name);
  }

  getPublishedArticles(): void{
    this.articleService.getPublishedArticles(this.page, this.size).subscribe((articles: any) => {
      this.articles = articles['content'];
      this.pages = new Array(articles['totalPages']);
      // localStorage.setItem('articles', JSON.stringify(this.articles));
      // console.log(this.articles);
    });
  }

  getPublishedArticlesByTagId(tagId?: number): void{
    if(tagId){
      this.articleService.getPublishedArticlesByTagId(tagId)
        .subscribe((articles: Article[]) => {
          this.articles = articles['content'];
        });
    }else{
      this.getPublishedArticles();
    }
  }

  getPublishedArticlesByTagName(page: number, size: number, tagName?: string): void{
    if(tagName){
      this.articleService.getPublishedArticlesByTagName(this.page, this.size, tagName)
        .subscribe((articles: Article[]) => {
          this.articles = articles['content'];
          this.pages = new Array(articles['totalPages']);
          // localStorage.setItem('articles', JSON.stringify(this.articles));
          // console.log(this.articles);
        });
    }else{
      this.getPublishedArticles();
    }
  }

}
