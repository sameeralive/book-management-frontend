import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorListComponent } from './author-list/author-list.component';
import { AuthorCreateComponent } from './author-create/author-create.component';
import { AuthorUpdateComponent } from './author-update/author-update.component';

const routes: Routes = [
  {
    path: 'author-list',
    component: AuthorListComponent,
  },
  {
    path: 'author-create',
    component: AuthorCreateComponent,
  },
  {
    path: 'author-update/:id',
    component: AuthorUpdateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthorRoutingModule {}
