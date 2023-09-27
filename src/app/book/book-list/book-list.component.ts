import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book';
import { BookService } from '../../services/book.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BookViewComponent } from '../book-view/book-view.component';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent implements OnInit {
  booksList: Book[] = [];
  selectedBook: any;
  isBookViewOpen: boolean = false;

  constructor(
    private bookService: BookService,
    private modalService: NgbModal,
  ) {}

  ngOnInit() {
    this.getBooks();
  }

  /**
   * description: Gets the list of books
   * */
  getBooks() {
    this.bookService.getBooks().subscribe(
      (data) => {
        this.booksList = data;
      },
      (error) => {
        console.error('An error occurred:', error);
      },
    );
  }

  /**
   * description: Opens the book view modal
   * @param book: Book object
   * */
  openBookViewModal(book: any, content: any) {
    this.selectedBook = book;
    this.isBookViewOpen = true;
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.isBookViewOpen = false;
          this.selectedBook = null;
        },
        (reason) => {
          this.isBookViewOpen = false;
          this.selectedBook = null;
        },
      );
  }
}
