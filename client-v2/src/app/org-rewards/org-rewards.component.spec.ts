import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgRewardsComponent } from './org-rewards.component';

describe('OrgRewardsComponent', () => {
  let component: OrgRewardsComponent;
  let fixture: ComponentFixture<OrgRewardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgRewardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgRewardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
