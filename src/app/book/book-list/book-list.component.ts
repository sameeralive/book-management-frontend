import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent implements OnInit {
  booksList: Book[] = [];

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.getAuthors();
  }

  getAuthors() {
    this.bookService.getBooks().subscribe(
      (data) => {
        this.booksList = data;
      },
      (error) => {
        console.error('An error occurred:', error);
      },
    );
  }
}
