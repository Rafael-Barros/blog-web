import { Component, OnInit, Input, Output } from '@angular/core';
import { Reply } from '../../../interfaces/reply.interface';
import { ReplyService } from '../../../services/reply.service';
import { User } from '../../../interfaces/user.interface';
import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/user.service';
import { Constants } from '../../../setup/constants';
import { EventEmitter} from '@angular/core';

@Component({
  selector: 'app-reply-card',
  templateUrl: './reply-card.component.html',
  styleUrls: ['./reply-card.component.css']
})
export class ReplyCardComponent implements OnInit {
  @Input() reply: Reply;
  @Input() commentId: number;
  @Input() userId: number;
  @Output() replyDeleteEmitter = new EventEmitter<any>();
  user: User;
  imageUrl = Constants.BLOG_URL;
  editing: boolean = false;

  constructor(
    private replyService: ReplyService,
    private authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.getUser(this.reply.user_id);
  }

  getUser(id: number): void{
    this.userService.getUser(id).subscribe((user: User) => {
      this.user = user;
    });
  }

  onSaveEdit(id: number, text: string):void {
    this.replyService.update(id, text).subscribe((reply: Reply) => {
      this.editing = !this.editing;
      this.reply = reply;
    });
  }

  onEdit(replyId: number): void{
    this.editing = !this.editing;
  }

  onCancel():void{
    this.editing = !this.editing;
  }

  onDelete(id: number){
    let confirmation = confirm("Are you sure?");
    if(confirmation){
      this.replyService.delete(id).subscribe((res: any) => {
        this.replyDeleteEmitter.emit(id);
      });
    }
  }

}
