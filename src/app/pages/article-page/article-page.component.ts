import { Component, OnInit } from '@angular/core';
import { Comment } from '../../interfaces/comment.interface';
import { CommentService } from '../../services/comment.service';
import { UserService } from '../../services/user.service';
import { ArticleService } from '../../services/article.service';
import { User } from '../../interfaces/user.interface';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../../interfaces/article.interface';
import { Constants } from '../../setup/constants';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-article-page',
  templateUrl: './article-page.component.html',
  styleUrls: ['./article-page.component.css']
})
export class ArticlePageComponent implements OnInit {
  comments: Comment[];
  
  articleId: number;
  article: Article;
  coverImageUrl: string;

  constructor(
    private articleService: ArticleService,
    private userService: UserService,
    private commentService: CommentService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {  }

  ngOnInit() {
    if(this.route.snapshot.paramMap.get('id')){
      this.articleId = +this.route.snapshot.paramMap.get('id');
      this.getArticle();
      this.getCommentsByArticleId(this.articleId);
    }
  }

  onComment(event: any): void{
    this.comments.unshift(event);
  }

  getComments(): void{
    this.commentService.getComments().subscribe((comments: Comment[]) => this.comments = comments['content']);
  }

  getCommentsByArticleId(articleId?: number): void{
    if(articleId){
      this.commentService.getCommentsByArticleId(articleId)
        .subscribe((comments: Comment[]) => {
          this.comments = comments['content'];
        });
    }else{
      this.getComments();
    }
  }

  getArticle(): void{
    this.articleService.getArticle(+this.route.snapshot.paramMap.get('id'))
      .subscribe((article: Article) => {
        this.article = article;
        this.article.content = this.sanitizer.bypassSecurityTrustHtml(this.article.content);
        if(this.article.coverImage){
          this.coverImageUrl = `${Constants.BLOG_URL}/files/download/${this.article.coverImage.name}`;
        }
      });
  }

  onCommentDelete(comment: any): void{
    this.comments = this.comments.filter(c => c.id !== comment.id);
  }

}
