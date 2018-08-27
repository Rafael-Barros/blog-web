import { Component, OnInit } from '@angular/core';
import { GithubUser } from '../../../interfaces/github-user.interface';
import { GithubService } from '../../../services/github.service';

@Component({
  selector: 'app-github-user',
  templateUrl: './github-user.component.html',
  styleUrls: ['./github-user.component.css']
})
export class GithubUserComponent implements OnInit {
  githubUser: GithubUser;

  constructor(private githubService: GithubService) { }

  ngOnInit() {
    this.githubService.getGithubUser('Rafael-Barros').subscribe((user: GithubUser) => {
      this.githubUser = user;
    });

  }

}
