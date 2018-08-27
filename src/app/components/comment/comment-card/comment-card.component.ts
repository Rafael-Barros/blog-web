import { Component, OnInit, Input, Output } from '@angular/core';
import { Comment } from '../../../interfaces/comment.interface';
import { CommentService } from '../../../services/comment.service';
import { UserService } from '../../../services/user.service';
import { ArticleService } from '../../../services/article.service';
import { User } from '../../../interfaces/user.interface';
import { AuthService } from '../../../services/auth.service';
import { EventEmitter } from '@angular/core';
import { Constants } from '../../../setup/constants';
import { Reply } from '../../../interfaces/reply.interface';
import { ReplyService } from '../../../services/reply.service';


@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.css']
})
export class CommentCardComponent implements OnInit {
  @Input() comment: Comment;
  @Output() commentEmitter = new EventEmitter<any>();
  replies: Reply[];
  user: User;
  editing: boolean = false;
  replying: boolean = false;
  public commentText: string;
  imageUrl = Constants.BLOG_URL;

  constructor(
    private commentService: CommentService,
    private articleService: ArticleService,
    private userService: UserService,
    private authService: AuthService,
    private replyService: ReplyService
  ) { }

  ngOnInit() {
    if(this.comment){
      this.getUser(this.comment.user_id);
      this.getReplies();
    }
  }

  getReplies(): void{
    this.replyService.getReplies(this.comment.id).subscribe((replies: Reply[]) => {
      this.replies = replies['content'];
    });
  }

  onReplyCreation(reply: any){
    this.replies.push(reply);
    this.replying = !this.replying;
  }

  onReply(): void{
    this.replying = !this.replying;
  }

  onDeleteReply(id: number){
    this.replies = this.replies.filter((value) => value.id !== id);
  }

  getUser(id: number): void{
    this.userService.getUser(id).subscribe((user: User) => {
      this.user = user;
    });
  }

  onDelete(id: number): void{
    let confirmation = confirm('Are you sure?');
    if(confirmation){
      this.commentService.deleteComment(id).subscribe(
        (comment: any) => {
          this.commentEmitter.emit(comment);
        },
        (error: any) => {

        }
      )
    }
  }

  onEdit(commentId: number): void{
    this.editing = true;
  }

  onSaveEdit(commentId:number, text: string): void{
    this.commentService.updateComment(commentId, text).subscribe((comment: Comment) =>{
      this.comment.text = comment.text;
    });
    this.editing = false;
  }

  onCancel():void{
    this.editing = false;
  }

}
