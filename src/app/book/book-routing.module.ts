import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookCreateComponent } from './book-create/book-create.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookUpdateComponent } from './book-update/book-update.component';
import { BookViewComponent } from './book-view/book-view.component';
const routes: Routes = [
  {
    path: 'book-list',
    component: BookListComponent,
  },
  {
    path: 'book-create',
    component: BookCreateComponent,
  },
  {
    path: 'book-update/:id',
    component: BookUpdateComponent,
  },
  {
    path: 'book-view/:id',
    component: BookViewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookRoutingModule {}
