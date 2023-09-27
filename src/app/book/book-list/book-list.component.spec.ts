import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookListComponent } from './book-list.component';
import { BookService } from '../../services/book.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Book } from '../../models/book';
import { of, throwError } from 'rxjs';

describe('BookListComponent', () => {
  let component: BookListComponent;
  let fixture: ComponentFixture<BookListComponent>;
  let bookService: jasmine.SpyObj<BookService>;
  let modalService: jasmine.SpyObj<NgbModal>;

  beforeEach(() => {
    bookService = jasmine.createSpyObj('BookService', ['getBooks']);
    modalService = jasmine.createSpyObj('NgbModal', ['open']);

    TestBed.configureTestingModule({
      declarations: [BookListComponent],
      providers: [
        { provide: BookService, useValue: bookService },
        { provide: NgbModal, useValue: modalService },
      ],
    });
    fixture = TestBed.createComponent(BookListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch books on initialization', () => {
    const mockBooks: Book[] = [
      {
        _id: '65132de16943d18c2d666c62',
        name: 'Book 1',
        isbn: 'ISBN1',
        author: 'Author 1',
      },
      {
        _id: '65132de16943d18c2d666c63',
        name: 'Book 2',
        isbn: 'ISBN2',
        author: 'Author 2',
      },
    ];

    bookService.getBooks.and.returnValue(of(mockBooks));

    fixture.detectChanges(); // Trigger ngOnInit

    expect(bookService.getBooks).toHaveBeenCalled();
    expect(component.booksList).toEqual(mockBooks);
  });

  it('should handle error when fetching books', () => {
    const error = 'An error occurred';

    bookService.getBooks.and.returnValue(throwError(error));

    fixture.detectChanges(); // Trigger ngOnInit

    expect(bookService.getBooks).toHaveBeenCalled();
    expect(component.booksList).toEqual([]);
    expect(console.error).toHaveBeenCalledWith('An error occurred:', error);
  });

  it('should open book view modal', () => {
    const mockBook: Book = {
      _id: '65132de16943d18c2d666c62',
      name: 'Book 1',
      isbn: 'ISBN1',
      author: 'Author 1',
    };

    component.openBookViewModal(mockBook, 'content');

    expect(component.isBookViewOpen).toBe(true);
    expect(component.selectedBook).toBe(mockBook);

    // Simulate modal closure
    fixture.detectChanges(); // Trigger change detection
    expect(component.isBookViewOpen).toBe(false);
    expect(component.selectedBook).toBeNull();
  });
});
