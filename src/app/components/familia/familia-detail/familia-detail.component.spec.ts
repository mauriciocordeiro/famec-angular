import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FamiliaDetailComponent } from './familia-detail.component';

describe('FamiliaDetailComponent', () => {
  let component: FamiliaDetailComponent;
  let fixture: ComponentFixture<FamiliaDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FamiliaDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FamiliaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
