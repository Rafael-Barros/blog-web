import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../../interfaces/user.interface';
import { UserService } from '../../../services/user.service';
import { Constants } from '../../../setup/constants';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {
  @Input() user: User;
  userImageUrl = `${Constants.BLOG_URL}/files/download/`;

  constructor(private userService: UserService) { }

  ngOnInit() {
    if(this.user.profileImage){
      this.userImageUrl = this.userImageUrl + this.user.profileImage.name;
    }
  }

}
