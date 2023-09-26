import { Component } from '@angular/core';
import { Author } from '../../models/author';
import { AuthorService } from '../../services/author.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-author-create',
  templateUrl: './author-create.component.html',
  styleUrls: ['./author-create.component.scss'],
})
export class AuthorCreateComponent {
  author: Author = new Author();
  isLoading: boolean = false;

  constructor(
    private authorService: AuthorService,
    private toastr: ToastrService,
    private router: Router,
  ) {}

  onSubmit() {
    this.isLoading = true;
    // @ts-ignore
    delete this.author._id;
    this.authorService.createAuthor(this.author).subscribe(
      (data: any) => {
        this.toastr.success('Saved successfully', 'Success');
        this.isLoading = false;
        this.router.navigateByUrl('/author/author-list');
      },
      (err: any) => {
        console.log(err);
        this.toastr.error('Something went wrong', 'Error');
        this.isLoading = false;
      },
    );
  }
}
