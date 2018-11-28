import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewOrgFormComponent } from './new-org-form.component';

describe('NewOrgFormComponent', () => {
  let component: NewOrgFormComponent;
  let fixture: ComponentFixture<NewOrgFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewOrgFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewOrgFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
