import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthorRoutingModule } from './author-routing.module';
import { AuthorListComponent } from './author-list/author-list.component';
import { AuthorCreateComponent } from './author-create/author-create.component';
import { AuthorUpdateComponent } from './author-update/author-update.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AuthorListComponent,
    AuthorCreateComponent,
    AuthorUpdateComponent,
  ],
  imports: [CommonModule, AuthorRoutingModule, FormsModule],
})
export class AuthorModule {}
