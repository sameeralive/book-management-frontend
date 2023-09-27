import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-book-view',
  templateUrl: './book-view.component.html',
  styleUrls: ['./book-view.component.scss'],
})
export class BookViewComponent {
  book: any;
  bookId: string = '';

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
  ) {
    this.getBookData();
  }

  setBookData(book: any) {
    this.book = book;
  }

  getBookData() {
    this.bookId = this.route.snapshot.params['id'];
    this.bookService.getBook(this.bookId).subscribe(
      (data) => {
        this.book = data;
      },
      (error) => {
        console.error('An error occurred:', error);
      },
    );
  }
}
