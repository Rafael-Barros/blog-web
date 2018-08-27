import { Component, OnInit, Input, Output } from '@angular/core';
import { Reply } from '../../../interfaces/reply.interface';
import { ReplyService } from '../../../services/reply.service';
import { User } from '../../../interfaces/user.interface';
import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/user.service';
import { Constants } from '../../../setup/constants';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-reply-cards',
  templateUrl: './reply-cards.component.html',
  styleUrls: ['./reply-cards.component.css']
})
export class ReplyCardsComponent implements OnInit {
  @Input() commentId: number;
  @Input() userId: number;
  @Input() replies: Reply[];
  @Output() replyDeleteEmitter = new EventEmitter<any>();

  constructor(private replyService: ReplyService) { }

  ngOnInit() {

  }

  onReplyDelete(event: any){
    this.replyDeleteEmitter.emit(event);
  }

}
