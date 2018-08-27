import { Component, OnInit, Input, Output } from '@angular/core';
import { User } from '../../../interfaces/user.interface';
import { Constants } from '../../../setup/constants';
import { ReplyService } from '../../../services/reply.service';
import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../services/auth.service';
import { Reply } from '../../../interfaces/reply.interface';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-reply-new',
  templateUrl: './reply-new.component.html',
  styleUrls: ['./reply-new.component.css']
})
export class ReplyNewComponent implements OnInit {
  user: User;
  @Input() commentId: number;
  @Output() replyEmitter = new EventEmitter<Reply>();
  imageUrl = Constants.BLOG_URL;


  constructor(
    private replyService: ReplyService,
    private userService: UserService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.userService.getUser(this.authService.getAuthUserId()).subscribe((user: User) => {
      this.user = user;
    });
  }

  onCreate(text: string): void{
    this.replyService.createReply(this.commentId, text).subscribe((reply: Reply) => {
      this.replyEmitter.emit(reply);
    });
  }

}
