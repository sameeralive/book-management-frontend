import { Component } from '@angular/core';
import { Book } from '../../models/book';
import { Author } from '../../models/author';
import { AuthorService } from '../../services/author.service';
import { BookService } from '../../services/book.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-book-update',
  templateUrl: './book-update.component.html',
  styleUrls: ['./book-update.component.scss'],
})
export class BookUpdateComponent {
  book: Book = new Book();
  isLoading: boolean = false;
  authorsList: Author[] = [];
  bookId: string = '';

  constructor(
    private authorService: AuthorService,
    private bookService: BookService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.getAuthors();
    this.getBookData();
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

  getBookData() {
    this.bookId = this.route.snapshot.params['id'];
    this.bookService.getBook(this.bookId).subscribe(
      (data) => {
        this.book = {
          _id: data._id,
          name: data.name,
          isbn: data.isbn,
          author: data.author._id,
        };
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
    this.bookService.updateBook(this.bookId, this.book).subscribe(
      (data: any) => {
        this.toastr.success('Updated successfully', 'Success');
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
