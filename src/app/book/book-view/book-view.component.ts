import { Component, Input } from '@angular/core';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-book-view',
  templateUrl: './book-view.component.html',
  styleUrls: ['./book-view.component.scss'],
})
export class BookViewComponent {
  book: any;

  @Input()
  set selectedBook(book: any) {
    this.setBookData(book);
  }

  constructor(private bookService: BookService) {}

  setBookData(book: any) {
    this.bookService.getBook(book._id).subscribe(
      (data) => {
        this.book = data;
      },
      (error) => {
        console.error('An error occurred:', error);
      },
    );
  }
}
