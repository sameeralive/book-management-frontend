import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorListComponent } from './author-list.component';
import { AuthorService } from '../../services/author.service';
import { of, throwError } from 'rxjs';
import { Author } from '../../models/author';

describe('AuthorListComponent', () => {
  let component: AuthorListComponent;
  let fixture: ComponentFixture<AuthorListComponent>;
  let authorService: jasmine.SpyObj<AuthorService>;

  beforeEach(() => {
    authorService = jasmine.createSpyObj('AuthorService', ['getAuthors']);
    TestBed.configureTestingModule({
      declarations: [AuthorListComponent],
      providers: [{ provide: AuthorService, useValue: authorService }],
    });
    fixture = TestBed.createComponent(AuthorListComponent);
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
});
