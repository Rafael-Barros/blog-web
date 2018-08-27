import { Component, OnInit } from '@angular/core';
import { Article } from '../../../interfaces/article.interface';
import { ArticleService } from '../../../services/article.service';
import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/user.service';
import { User } from '../../../interfaces/user.interface';
import { Tag } from '../../../interfaces/tag.interface';
import { TagService } from '../../../services/tag.service';

@Component({
  selector: 'app-article-table',
  templateUrl: './article-table.component.html',
  styleUrls: ['./article-table.component.css']
})
export class ArticleTableComponent implements OnInit {
  articles: Article[];
  page: number = 0;
  size: number = 8;
  pages: Array<number>;
  editing: boolean = false;

  tags: Tag[];
  selectedTags = new Array<Tag>();
  coverImage: File;
  imagePreview: any;
  articleEdit: Article;

  users: User[];

  constructor(
    private articleService: ArticleService,
    private authService: AuthService,
    private userService: UserService,
    private tagService: TagService
  ) { }

  ngOnInit() {
    this.getArticles();
    this.getUsers();
    this.getTags();
  }

  onEdit(article: Article): void{
    this.articleEdit = article;
    this.selectedTags = this.articleEdit.tags;
    this.editing = !this.editing;
  }

  removeSelectedTag(tag: Tag): void{
    if(this.selectedTags.includes(tag)){
      this.selectedTags = this.selectedTags.filter(element => tag != element);
    }
  }

  onSave(title: string, description: string, readTime: number, content: string): void{
    this.articleEdit.content = content;
    this.articleEdit.description = description;
    this.articleEdit.readTime = readTime;
    this.articleEdit.title = title;
    this.articleService.edit(this.articleEdit).subscribe((a: Article) => {
      this.articleEdit = a;
      console.log(a);
      this.editing = !this.editing;
    });
  }

  onCancelEditing(): void{
    this.editing = !this.editing;
  }

  addSelectedTag(tag: Tag): void{
    if(!this.selectedTags.includes(tag)){
      this.selectedTags.push(tag);
    }
  }

  getTags(): void{
    this.tagService.getTags().subscribe((tags: Tag[]) => {
      this.tags = tags['content'];
    });
  }

  onDelete(id: number): void{
    this.articleService.delete(id).subscribe((res: any) => {
      this.articles = this.articles.filter((value) => value.id !== id);
    });
  }

  setPage(page: number, event: any){
    event.preventDefault();
    this.page = page;
    this.getArticles();
    this.getUsers();
  }

  getUsers(): void{
    this.userService.getUsers('').subscribe((users: User[]) => {
      this.users = users['content'];
    });
  }

  getArticles(): void{
    if(location.pathname == '/admin/articles'){
      this.articleService.getArticles(this.page, this.size).subscribe(
        (articles: Article[]) => {
          this.articles = articles['content'];
          this.pages = new Array(articles['totalPages']);
        }
      );
    }else{
      this.articleService.getArticles(this.page, this.size, this.authService.getAuthUserId()).subscribe(
        (articles: Article[]) => {
          this.articles = articles['content'];
          this.pages = new Array(articles['totalPages']);
        }
      );
    }
  }

  publishArticle(id: number): void{
    this.articleService.publishArticle(id).subscribe(
      (res: any) => {
        this.articles.forEach(value => {
          if(value.id == id) value.published = !value.published
        });
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  getUsername(userId: number): string{
    for(let i = 0; i < this.users.length; i++){
      if(this.users[i].id == userId) return this.users[i].firstName
    }
    return "Unknown";
  }

}
