import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookUpdateComponent } from './book-update.component';
import { AuthorService } from '../../services/author.service';
import { BookService } from '../../services/book.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { Book } from '../../models/book';
import { Author } from '../../models/author';

describe('BookUpdateComponent', () => {
  let component: BookUpdateComponent;
  let fixture: ComponentFixture<BookUpdateComponent>;
  let authorService: jasmine.SpyObj<AuthorService>;
  let bookService: jasmine.SpyObj<BookService>;
  let toastrService: jasmine.SpyObj<ToastrService>;
  let router: jasmine.SpyObj<Router>;
  let route: ActivatedRoute;

  beforeEach(() => {
    authorService = jasmine.createSpyObj('AuthorService', ['getAuthors']);
    bookService = jasmine.createSpyObj('BookService', [
      'getBook',
      'updateBook',
    ]);
    toastrService = jasmine.createSpyObj('ToastrService', ['success', 'error']);
    router = jasmine.createSpyObj('Router', ['navigateByUrl']);

    TestBed.configureTestingModule({
      declarations: [BookUpdateComponent],
      providers: [
        { provide: AuthorService, useValue: authorService },
        { provide: BookService, useValue: bookService },
        { provide: ToastrService, useValue: toastrService },
        { provide: Router, useValue: router },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: {
                id: '65132de16943d18c2d666c62', // Mocking the route parameter 'id'
              },
            },
          },
        },
      ],
    });
    fixture = TestBed.createComponent(BookUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch authors on initialization', () => {
    const mockAuthors: Author[] = [
      {
        _id: '6512e9228a117581de0888d5',
        first_name: 'Author',
        last_name: 'One',
      },
      {
        _id: '651322f26943d18c2d666c35',
        first_name: 'Author',
        last_name: 'Two',
      },
    ];

    authorService.getAuthors.and.returnValue(of(mockAuthors));

    fixture.detectChanges(); // Trigger ngOnInit

    expect(authorService.getAuthors).toHaveBeenCalled();
    expect(component.authorsList).toEqual(mockAuthors);
  });

  it('should handle error when fetching authors', () => {
    const error = 'An error occurred';

    authorService.getAuthors.and.returnValue(throwError(error));

    fixture.detectChanges();

    expect(authorService.getAuthors).toHaveBeenCalled();
    expect(component.authorsList).toEqual([]);
    expect(console.error).toHaveBeenCalledWith('An error occurred:', error);
  });

  it('should fetch book data on initialization', () => {
    const mockBook: Book = {
      _id: '65132de16943d18c2d666c62',
      name: 'Book 1',
      isbn: 'ISBN1',
      author: '6512e9228a117581de0888d5',
    };

    bookService.getBook.and.returnValue(of(mockBook));

    fixture.detectChanges(); // Trigger ngOnInit

    expect(bookService.getBook).toHaveBeenCalledWith(
      '65132de16943d18c2d666c62',
    ); // Check if it fetches the correct book
    expect(component.book).toEqual(mockBook);
  });

  it('should handle error when fetching book data', () => {
    const error = 'An error occurred';

    bookService.getBook.and.returnValue(throwError(error));

    fixture.detectChanges();

    expect(bookService.getBook).toHaveBeenCalledWith(
      '65132de16943d18c2d666c62',
    );
    expect(component.book).toEqual(new Book());
    expect(console.error).toHaveBeenCalledWith('An error occurred:', error);
  });

  it('should submit book update', () => {
    const mockBook: Book = {
      name: 'Updated Book',
      isbn: 'Updated ISBN',
      author: '6512e9228a117581de0888d5',
    };

    bookService.updateBook.and.returnValue(of(mockBook));

    component.onSubmit();

    expect(component.isLoading).toBe(true);
    expect(bookService.updateBook).toHaveBeenCalledWith(
      '65132de16943d18c2d666c62',
      component.book,
    );
    expect(toastrService.success).toHaveBeenCalledWith(
      'Updated successfully',
      'Success',
    );
    expect(component.isLoading).toBe(false);
    expect(router.navigateByUrl).toHaveBeenCalledWith('/books/book-list');
  });

  it('should handle error when submitting book update', () => {
    const error = 'An error occurred';

    bookService.updateBook.and.returnValue(throwError(error));

    component.onSubmit();

    expect(component.isLoading).toBe(true);
    expect(bookService.updateBook).toHaveBeenCalledWith(
      '65132de16943d18c2d666c62',
      component.book,
    );
    expect(console.log).toHaveBeenCalledWith(error);
    expect(toastrService.error).toHaveBeenCalledWith(
      'Something went wrong',
      'Error',
    );
    expect(component.isLoading).toBe(false);
  });
});
