import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'book',
        canActivate: [],
        loadChildren: () =>
          import('./book/book.module').then((m) => m.BookModule),
      },
      {
        path: 'author',
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
