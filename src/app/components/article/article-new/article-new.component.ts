import { Component, OnInit } from '@angular/core';
import { Article } from '../../../interfaces/article.interface';
import { ArticleService } from '../../../services/article.service';
import { Tag } from '../../../interfaces/tag.interface';
import { TagService } from '../../../services/tag.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

declare let CKEDITOR: any;

@Component({
  selector: 'app-article-new',
  templateUrl: './article-new.component.html',
  styleUrls: ['./article-new.component.css']
})
export class ArticleNewComponent implements OnInit {
  tags: Tag[];
  selectedTags = new Array<Tag>();
  coverImage: File;
  imagePreview: any;

  constructor(
    private tagService: TagService,
    private articleService: ArticleService,
    private sanitizer: DomSanitizer,
    private router: Router
  ) { }

  ngOnInit() {
    this.getTags();
    CKEDITOR.replace( 'editor1' );
  }

  getTags(): void{
    this.tagService.getTags().subscribe((tags: Tag[]) => {
      this.tags = tags['content'];
    });
  }

  addSelectedTag(tag: Tag): void{
    if(!this.selectedTags.includes(tag)){
      this.selectedTags.push(tag);
    }
  }

  removeSelectedTag(tag: Tag): void{
    if(this.selectedTags.includes(tag)){
      this.selectedTags = this.selectedTags.filter(element => tag != element);
    }
  }

  onCreate(title: string, description: string, readTime: number, content: string): void{
    content = CKEDITOR.instances.editor1.getData();
    this.articleService.createArticle({title, description, readTime, content} as Article)
      .subscribe(res => {
        if(this.selectedTags.length > 0) this.setTags(res.id, this.selectedTags)
        if(this.coverImage) this.onUpload(res.id)
        setTimeout(() => {
          this.router.navigate(['author/articles']);
        },1000);

      });
  }

  setTags(articleId: number, tags: any): void{
    this.articleService.addTags(articleId, tags).subscribe();
  }

  onFileSelected(event): void{
    this.coverImage = <File> event.target.files[0];
    this.imagePreview = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(this.coverImage));
  }

  onUpload(id: number): void{
    const fd = new FormData();
    fd.append('file', this.coverImage);
    this.articleService.uploadFile(fd, id).subscribe();
  }

}
