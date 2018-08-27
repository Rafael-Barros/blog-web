import { Component, OnInit, Output, Input } from '@angular/core';
import { User } from '../../../interfaces/user.interface';
import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/user.service';
import { CommentService } from '../../../services/comment.service';
import { Comment } from '../../../interfaces/comment.interface';
import { Constants } from '../../../setup/constants';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-comment-new',
  templateUrl: './comment-new.component.html',
  styleUrls: ['./comment-new.component.css']
})
export class CommentNewComponent implements OnInit {
  userId: number;
  user: any;
  @Output() comment = new EventEmitter<Comment>();
  @Input() articleId:number;
  imageUrl = Constants.BLOG_URL;


  constructor(
    private authService: AuthService,
    private userService: UserService,
    private commentService: CommentService
  ) { }

  ngOnInit() {
    this.getUser();
  }

  getUser(){
    if(this.authService.getAuthUserId()){
      this.userId = this.authService.getAuthUserId();
      this.userService.getUser(this.userId).subscribe((user: User) => {
        this.user = user;
      });
    }
  }

  onCreate(text: string): void{
    this.commentService.createComment(text, this.articleId).subscribe((comment: Comment) => {
      this.comment.emit(comment);
    });
  }

}
