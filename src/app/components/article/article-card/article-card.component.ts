import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../../interfaces/article.interface';
import { ArticleService } from '../../../services/article.service';
import { Constants } from '../../../setup/constants';

@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.css']
})
export class ArticleCardComponent implements OnInit {
  @Input() article: Article;
  coverImageUrl = `${Constants.BLOG_URL}/articles/coverImage`;

  constructor(private articleService: ArticleService) { }

  ngOnInit() {
  }

}
