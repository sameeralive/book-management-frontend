import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book';
import { Author } from '../../models/author';
import { AuthorService } from '../../services/author.service';
import { BookService } from '../../services/book.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.scss'],
})
export class BookCreateComponent implements OnInit {
  book: Book = new Book();
  isLoading: boolean = false;
  authorsList: Author[] = [];

  constructor(
    private authorService: AuthorService,
    private bookService: BookService,
    private toastr: ToastrService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.getAuthors();
  }

  getAuthors() {
    this.authorService.getAuthors().subscribe(
      (data) => {
        this.authorsList = data;
      },
      (error) => {
        console.error('An error occurred:', error);
      },
    );
  }

  onSubmit() {
    this.isLoading = true;
    // @ts-ignore
    delete this.book._id;
    this.bookService.createBook(this.book).subscribe(
      (data: any) => {
        this.toastr.success('Saved successfully', 'Success');
        this.isLoading = false;
        this.router.navigateByUrl('/books/book-list');
      },
      (err: any) => {
        console.log(err);
        this.toastr.error('Something went wrong', 'Error');
        this.isLoading = false;
      },
    );
  }
}
