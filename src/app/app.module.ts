import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ArticleViewComponent } from './components/article/article-view/article-view.component';
import { ArticleCardComponent } from './components/article/article-card/article-card.component';
import { ArticleCardsComponent } from './components/article/article-cards/article-cards.component';
import { ArticleNewComponent } from './components/article/article-new/article-new.component';
import { SigninComponent } from './components/auth/signin/signin.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UserCardComponent } from './components/user/user-card/user-card.component';
import { UserCardsComponent } from './components/user/user-cards/user-cards.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { AuthorPageComponent } from './pages/author-page/author-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SigninPageComponent } from './pages/signin-page/signin-page.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { TopicsPageComponent } from './pages/topics-page/topics-page.component';
import { GithubUserComponent } from './components/user/github-user/github-user.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ArticleTableComponent } from './components/article/article-table/article-table.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { UserProfileComponent } from './components/user/user-profile/user-profile.component';
import { CommentCardComponent } from './components/comment/comment-card/comment-card.component';
import { CommentListComponent } from './components/comment/comment-list/comment-list.component';
import { ArticlePageComponent } from './pages/article-page/article-page.component';
import { CommentNewComponent } from './components/comment/comment-new/comment-new.component';
import { TagTableComponent } from './components/tag/tag-table/tag-table.component';
import { TagNewComponent } from './components/tag/tag-new/tag-new.component';
import { ReplyNewComponent } from './components/reply/reply-new/reply-new.component';
import { ReplyCardComponent } from './components/reply/reply-card/reply-card.component';
import { ReplyCardsComponent } from './components/reply/reply-cards/reply-cards.component';

import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { GithubService } from './services/github.service';

import { AuthGuard } from './guards/auth-guard.service';
import { AdminGuard } from './guards/admin-guard.service';
import { AuthorGuard } from './guards/author-guard.service';


@NgModule({
  declarations: [
    AppComponent,
    ArticleViewComponent,
    ArticleCardComponent,
    ArticleCardsComponent,
    ArticleNewComponent,
    SigninComponent,
    SignupComponent,
    NavbarComponent,
    UserCardComponent,
    UserCardsComponent,
    AboutPageComponent,
    AdminPageComponent,
    AuthorPageComponent,
    HomePageComponent,
    SigninPageComponent,
    SignupPageComponent,
    TopicsPageComponent,
    GithubUserComponent,
    PageNotFoundComponent,
    ArticleTableComponent,
    ProfilePageComponent,
    UserProfileComponent,
    CommentCardComponent,
    CommentListComponent,
    ArticlePageComponent,
    CommentNewComponent,
    TagTableComponent,
    TagNewComponent,
    ReplyNewComponent,
    ReplyCardComponent,
    ReplyCardsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    AuthService,
    GithubService,
    AuthGuard,
    AdminGuard,
    AuthorGuard,
    UserService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
