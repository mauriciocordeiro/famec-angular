import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FamiliaItemComponent } from './familia-item.component';

describe('FamiliaItemComponent', () => {
  let component: FamiliaItemComponent;
  let fixture: ComponentFixture<FamiliaItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FamiliaItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FamiliaItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
