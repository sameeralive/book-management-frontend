import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookCreateComponent } from './book-create.component';
import { AuthorService } from '../../services/author.service';
import { BookService } from '../../services/book.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Author } from '../../models/author';
import { of, throwError } from 'rxjs';
import { Book } from '../../models/book';

describe('BookCreateComponent', () => {
  let component: BookCreateComponent;
  let fixture: ComponentFixture<BookCreateComponent>;
  let authorService: jasmine.SpyObj<AuthorService>;
  let bookService: jasmine.SpyObj<BookService>;
  let toastrService: jasmine.SpyObj<ToastrService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    authorService = jasmine.createSpyObj('AuthorService', ['getAuthors']);
    bookService = jasmine.createSpyObj('BookService', ['createBook']);
    toastrService = jasmine.createSpyObj('ToastrService', ['success', 'error']);
    router = jasmine.createSpyObj('Router', ['navigateByUrl']);

    TestBed.configureTestingModule({
      declarations: [BookCreateComponent],
      providers: [
        { provide: AuthorService, useValue: authorService },
        { provide: BookService, useValue: bookService },
        { provide: ToastrService, useValue: toastrService },
        { provide: Router, useValue: router },
      ],
    });
    fixture = TestBed.createComponent(BookCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch authors on initialization', () => {
    const mockAuthors: Author[] = [
      { _id: '1', first_name: 'Author', last_name: 'One' },
      { _id: '2', first_name: 'Author', last_name: 'Two' },
    ];

    authorService.getAuthors.and.returnValue(of(mockAuthors));

    fixture.detectChanges(); // Trigger ngOnInit

    expect(authorService.getAuthors).toHaveBeenCalled();
    expect(component.authorsList).toEqual(mockAuthors);
  });

  it('should handle error when fetching authors', () => {
    const error = 'An error occurred';

    authorService.getAuthors.and.returnValue(throwError(error));

    fixture.detectChanges(); // Trigger ngOnInit

    expect(authorService.getAuthors).toHaveBeenCalled();
    expect(component.authorsList).toEqual([]);
    expect(console.error).toHaveBeenCalledWith('An error occurred:', error);
  });

  it('should submit a new book', () => {
    const mockBook: Book = {
      name: 'Book Name',
      isbn: '1234567890',
      author: '651322f26943d18c2d666c35',
    };

    bookService.createBook.and.returnValue(of(mockBook));

    component.onSubmit();

    expect(component.isLoading).toBe(true);
    expect(bookService.createBook).toHaveBeenCalledWith(component.book);
    expect(toastrService.success).toHaveBeenCalledWith(
      'Saved successfully',
      'Success',
    );
    expect(component.isLoading).toBe(false);
    expect(router.navigateByUrl).toHaveBeenCalledWith('/books/book-list');
  });

  it('should handle error when submitting a new book', () => {
    const error = 'An error occurred';

    bookService.createBook.and.returnValue(throwError(error));

    component.onSubmit();

    expect(component.isLoading).toBe(true);
    expect(bookService.createBook).toHaveBeenCalledWith(component.book);
    expect(console.log).toHaveBeenCalledWith(error);
    expect(toastrService.error).toHaveBeenCalledWith(
      'Something went wrong',
      'Error',
    );
    expect(component.isLoading).toBe(false);
  });
});
