import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'books/book-list',
        pathMatch: 'full',
      },
      {
        path: 'books',
        canActivate: [],
        loadChildren: () =>
          import('./book/book.module').then((m) => m.BookModule),
      },
      {
        path: 'authors',
        canActivate: [],
        loadChildren: () =>
          import('./author/author.module').then((m) => m.AuthorModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
