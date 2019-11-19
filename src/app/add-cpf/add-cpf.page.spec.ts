import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCpfPage } from './add-cpf.page';

describe('AddCpfPage', () => {
  let component: AddCpfPage;
  let fixture: ComponentFixture<AddCpfPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCpfPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCpfPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
