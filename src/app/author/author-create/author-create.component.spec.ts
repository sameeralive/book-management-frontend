import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';

import { AuthorCreateComponent } from './author-create.component';
import { AuthorService } from '../../services/author.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';

describe('AuthorCreateComponent', () => {
  let component: AuthorCreateComponent;
  let fixture: ComponentFixture<AuthorCreateComponent>;
  let authorService: jasmine.SpyObj<AuthorService>;
  let toastrService: jasmine.SpyObj<ToastrService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    authorService = jasmine.createSpyObj('AuthorService', ['createAuthor']);
    toastrService = jasmine.createSpyObj('ToastrService', ['success', 'error']);
    router = jasmine.createSpyObj('Router', ['navigateByUrl']);

    TestBed.configureTestingModule({
      declarations: [AuthorCreateComponent],
      imports: [FormsModule],
      providers: [
        { provide: AuthorService, useValue: authorService },
        { provide: ToastrService, useValue: toastrService },
        { provide: Router, useValue: router },
      ],
    });
    fixture = TestBed.createComponent(AuthorCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reset isLoading to false after form submission', () => {
    component.isLoading = true;
    component.onSubmit();
    expect(component.isLoading).toBe(false);
  });

  it('should call createAuthor and show success message on successful submit', fakeAsync(() => {
    authorService.createAuthor.and.returnValue(of({}));
    component.author.first_name = 'John';
    component.author.last_name = 'Doe';

    component.onSubmit();
    tick(); // Simulate async operation

    expect(authorService.createAuthor).toHaveBeenCalledWith(component.author);
    expect(toastrService.success).toHaveBeenCalledWith(
      'Saved successfully',
      'Success',
    );
    expect(router.navigateByUrl).toHaveBeenCalledWith('/author/author-list');
  }));

  it('should call createAuthor and show error message on failed submit', fakeAsync(() => {
    const errorMessage = 'Server error';
    authorService.createAuthor.and.returnValue(throwError(errorMessage));
    component.author.first_name = 'John';
    component.author.last_name = 'Doe';

    component.onSubmit();
    tick(); // Simulate async operation

    expect(authorService.createAuthor).toHaveBeenCalledWith(component.author);
    expect(toastrService.error).toHaveBeenCalledWith(
      'Something went wrong',
      'Error',
    );
  }));
});
