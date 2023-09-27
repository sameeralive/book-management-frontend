import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';

import { AuthorUpdateComponent } from './author-update.component';
import { AuthorService } from '../../services/author.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Author } from '../../models/author';
import { of, throwError } from 'rxjs';

describe('AuthorUpdateComponent', () => {
  let component: AuthorUpdateComponent;
  let fixture: ComponentFixture<AuthorUpdateComponent>;
  let authorService: jasmine.SpyObj<AuthorService>;
  let toastrService: jasmine.SpyObj<ToastrService>;
  let router: jasmine.SpyObj<Router>;
  let route: ActivatedRoute;

  beforeEach(() => {
    authorService = jasmine.createSpyObj('AuthorService', [
      'getAuthor',
      'updateAuthor',
    ]);
    toastrService = jasmine.createSpyObj('ToastrService', ['success', 'error']);
    router = jasmine.createSpyObj('Router', ['navigateByUrl']);

    TestBed.configureTestingModule({
      declarations: [AuthorUpdateComponent],
      imports: [FormsModule],
      providers: [
        { provide: AuthorService, useValue: authorService },
        { provide: ToastrService, useValue: toastrService },
        { provide: Router, useValue: router },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { params: { id: '6512e9228a117581de0888d5' } },
          },
        },
      ],
    });
    fixture = TestBed.createComponent(AuthorUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get author data on initialization', () => {
    const authorData: Author = {
      _id: '6512e9228a117581de0888d5',
      first_name: 'John',
      last_name: 'Doe',
    };
    authorService.getAuthor.and.returnValue(of(authorData));

    component.ngOnInit();

    expect(component.author).toEqual(authorData);
  });

  it('should call updateAuthor and show success message on successful submit', fakeAsync(() => {
    authorService.updateAuthor.and.returnValue(of({}));
    component.author = {
      _id: '6512e9228a117581de0888d5',
      first_name: 'John',
      last_name: 'Doe',
    };

    component.onSubmit();
    tick(); // Simulate async operation

    expect(authorService.updateAuthor).toHaveBeenCalledWith(
      '123',
      component.author,
    );
    expect(toastrService.success).toHaveBeenCalledWith(
      'Updated successfully',
      'Success',
    );
    expect(router.navigateByUrl).toHaveBeenCalledWith('/authors/author-list');
  }));

  it('should call updateAuthor and show error message on failed submit', fakeAsync(() => {
    const errorMessage = 'Server error';
    authorService.updateAuthor.and.returnValue(throwError(errorMessage));
    component.author = { _id: '123', first_name: 'John', last_name: 'Doe' };

    component.onSubmit();
    tick(); // Simulate async operation

    expect(authorService.updateAuthor).toHaveBeenCalledWith(
      '123',
      component.author,
    );
    expect(toastrService.error).toHaveBeenCalledWith(
      'Something went wrong',
      'Error',
    );
  }));
});
