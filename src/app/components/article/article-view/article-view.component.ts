import { Component, OnInit, Input } from '@angular/core';
import { ArticleService } from '../../../services/article.service';
import { Article } from '../../../interfaces/article.interface';
import { Constants } from '../../../setup/constants';

declare var hljs: any;
declare var $: any;

@Component({
  selector: 'app-article-view',
  templateUrl: './article-view.component.html',
  styleUrls: ['./article-view.component.css']
})
export class ArticleViewComponent implements OnInit{
  @Input() article: Article;
  @Input() coverImageUrl: string;
  imageUrl = Constants.BLOG_URL;

  constructor( ) { }

  ngOnInit() {
    this.highlightCode();
  }

  highlightCode(): void{
    setTimeout(() => {
      $(document).ready(() => {
        $('pre code').each((i, block) => hljs.highlightBlock(block));
      });
    }, 300);
  }

}
