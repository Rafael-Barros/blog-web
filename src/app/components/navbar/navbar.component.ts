import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { TagService } from '../../services/tag.service';
import { Constants } from '../../setup/constants';
import { Tag } from '../../interfaces/tag.interface';
import * as jwt_decode from 'jwt-decode';

declare let $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  username: string;
  userImage: string;
  tags: Array<Tag>;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private tagService: TagService,
  ) { }

  ngOnInit() {
    this.setupNavbar();
    this.getTags();
  }

  hamClicked(ham: any){
    if($(window).width() < 974) ham.click();
  }

  setupNavbar(): void{
    if(this.authService.isLoggedIn()) {
      let a = this.authService.getDecodedToken();
      this.username = a.user.username;
      this.userService.getProfileImage().subscribe((image) => {
          if(image) this.userImage = `${Constants.BLOG_URL}/users/profileImage/${image}`;
      });
    }
  }

  getTags(): void{
    this.tagService.getTags().subscribe((tags: Tag[]) => {
      this.tags = tags['content'];
    });
  }

  onLogout(): void{
    this.authService.logout();
  }

}
