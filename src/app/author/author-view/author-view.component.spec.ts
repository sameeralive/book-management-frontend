import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorViewComponent } from './author-view.component';

describe('AuthorViewComponent', () => {
  let component: AuthorViewComponent;
  let fixture: ComponentFixture<AuthorViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthorViewComponent]
    });
    fixture = TestBed.createComponent(AuthorViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
