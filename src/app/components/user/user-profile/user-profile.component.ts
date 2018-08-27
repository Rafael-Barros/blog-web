import { Component, OnInit } from '@angular/core';
import { User } from '../../../interfaces/user.interface';
import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../services/auth.service';
import { Constants } from '../../../setup/constants';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: User;
  userImage = Constants.BLOG_URL;
  imageNotFound = `${Constants.BLOG_URL}/files/download/1532633335633_user-icon.png`;

  constructor(private userService: UserService, private authService: AuthService) { }

  ngOnInit() {
    this.getUser();
  }

  getUser(): void{
    this.userService.getUser(this.authService.getAuthUserId())
    .subscribe((user: User) => {
      this.user = user;
      if(this.user.profileImage){
        this.userImage = `${Constants.BLOG_URL}/files/download/${this.user.profileImage.name}`;
      }
    });
  }

  onChangeImage(event: any): void{
    const data = new FormData();
    data.append('file', <File> event.target.files[0]);
    this.userService.setProfileImage(this.user.id, data).subscribe(res => {
      this.userImage = res.fileDownloadUri;
      location.reload();
    });
  }

}
// uploadProfileImage(id: number): void{
//   const data = new FormData();
//   data.append('file', this.selectedFiles[0]);
//   this.userService.setProfileImage(id, data).subscribe();
// }
