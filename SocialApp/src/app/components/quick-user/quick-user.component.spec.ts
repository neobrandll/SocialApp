import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickUserPage } from './quick-user.page';

describe('QuickUserPage', () => {
  let component: QuickUserPage;
  let fixture: ComponentFixture<QuickUserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickUserPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
