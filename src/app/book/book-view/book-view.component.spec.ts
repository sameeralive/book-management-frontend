import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookViewComponent } from './book-view.component';
import { BookService } from '../../services/book.service';
import { of, throwError } from 'rxjs';

describe('BookViewComponent', () => {
  let component: BookViewComponent;
  let fixture: ComponentFixture<BookViewComponent>;
  let bookService: jasmine.SpyObj<BookService>;

  beforeEach(() => {
    bookService = jasmine.createSpyObj('BookService', ['getBook']);

    TestBed.configureTestingModule({
      declarations: [BookViewComponent],
    });
    fixture = TestBed.createComponent(BookViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set book data when selectedBook input is provided', () => {
    const mockBook = {
      _id: '65132de16943d18c2d666c62',
      name: 'Book 1',
      isbn: 'ISBN1',
      author: '6512e9228a117581de0888d5',
    };

    bookService.getBook.and.returnValue(of(mockBook));

    component.selectedBook = mockBook;

    fixture.detectChanges();

    expect(bookService.getBook).toHaveBeenCalledWith('1'); // Check if it fetches the correct book
    expect(component.book).toEqual(mockBook);
  });

  it('should handle error when fetching book data', () => {
    const error = 'An error occurred';

    bookService.getBook.and.returnValue(throwError(error));

    component.selectedBook = {
      _id: '65132de16943d18c2d666c62',
      name: 'Book 1',
      isbn: 'ISBN1',
      author: '6512e9228a117581de0888d5',
    };

    fixture.detectChanges();

    expect(bookService.getBook).toHaveBeenCalledWith('1'); // Check if it fetches the correct book
    expect(component.book).toBeUndefined(); // The book should be undefined on error
    expect(console.error).toHaveBeenCalledWith('An error occurred:', error);
  });
});
