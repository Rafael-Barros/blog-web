import { Component, OnInit, Input, Output } from '@angular/core';
import { Comment } from '../../../interfaces/comment.interface';
import { CommentService } from '../../../services/comment.service';
import { UserService } from '../../../services/user.service';
import { ArticleService } from '../../../services/article.service';
import { User } from '../../../interfaces/user.interface';
import { ActivatedRoute } from '@angular/router';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {
  @Input() comments: Comment[];
  @Output() commentDeleted = new EventEmitter<Comment>();
  numberOfCommentsShown = 2;


  constructor(private commentService: CommentService, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  onShowMore():void{
    this.numberOfCommentsShown += 3;
  }

  onCommentDelete(event: any, comment: Comment): void{
    this.comments = this.comments.filter(c => c.id !== comment.id);
    this.commentDeleted.emit(comment);
  }

}
