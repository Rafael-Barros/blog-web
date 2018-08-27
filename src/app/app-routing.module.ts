import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { TopicsPageComponent } from './pages/topics-page/topics-page.component';
import { AuthorPageComponent } from './pages/author-page/author-page.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { SigninPageComponent } from './pages/signin-page/signin-page.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ArticleNewComponent } from './components/article/article-new/article-new.component';
import { ArticleTableComponent } from './components/article/article-table/article-table.component';
import { UserCardsComponent } from './components/user/user-cards/user-cards.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { ArticleViewComponent } from './components/article/article-view/article-view.component';
import { ArticleCardsComponent } from './components/article/article-cards/article-cards.component';
import { ArticlePageComponent } from './pages/article-page/article-page.component';
import { TagTableComponent } from './components/tag/tag-table/tag-table.component';

import { AuthGuard } from './guards/auth-guard.service';
import { AdminGuard } from './guards/admin-guard.service';
import { AuthorGuard } from './guards/author-guard.service';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomePageComponent},
  {path: 'article/:id', component: ArticlePageComponent},
  {path: 'topics', component: TopicsPageComponent,
    children:[
      {path: ':name', component: ArticleCardsComponent}
    ]
  },
  {path: 'author', component: AuthorPageComponent, canActivate: [AuthorGuard],
    children:[
      {path: 'new-article', component: ArticleNewComponent, canActivate: [AuthorGuard]},
      {path: 'articles', component: ArticleTableComponent, canActivate: [AuthorGuard]}
    ]
  },
  {path: 'admin', component: AdminPageComponent, canActivate: [AdminGuard],
    children:[
      {path: 'users', component: UserCardsComponent, canActivate: [AdminGuard]},
      {path: 'articles', component: ArticleTableComponent, canActivate: [AdminGuard]},
      {path: 'tags', component: TagTableComponent, canActivate: [AdminGuard]}
    ]
  },
  {path: 'about', component: AboutPageComponent},
  {path: 'profile', component: ProfilePageComponent, canActivate: [AuthGuard]},
  {path: 'signin', component: SigninPageComponent},
  {path: 'signup', component: SignupPageComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
//, {useHash: true}
