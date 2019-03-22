import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualTuitPage } from './individual-tuit.page';

describe('IndividualTuitPage', () => {
  let component: IndividualTuitPage;
  let fixture: ComponentFixture<IndividualTuitPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndividualTuitPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualTuitPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
