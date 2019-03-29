import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowingPagePage } from './following-page.page';

describe('FollowingPagePage', () => {
  let component: FollowingPagePage;
  let fixture: ComponentFixture<FollowingPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FollowingPagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowingPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
