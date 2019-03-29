import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPostPage } from './user-post.page';

describe('UserPostPage', () => {
  let component: UserPostPage;
  let fixture: ComponentFixture<UserPostPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserPostPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPostPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
