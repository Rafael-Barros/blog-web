import { Component, OnInit } from '@angular/core';
import { User } from '../../../interfaces/user.interface';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user-cards',
  templateUrl: './user-cards.component.html',
  styleUrls: ['./user-cards.component.css']
})
export class UserCardsComponent implements OnInit {
  users: User[];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers():void{
    this.userService.getUsers('?sort=firstName,asc').subscribe((users: User[]) => {
      this.users = users['content'];
    });
  }

}
