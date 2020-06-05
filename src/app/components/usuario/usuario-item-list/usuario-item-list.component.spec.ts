import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioItemListComponent } from './usuario-item-list.component';

describe('UsuarioItemListComponent', () => {
  let component: UsuarioItemListComponent;
  let fixture: ComponentFixture<UsuarioItemListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuarioItemListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
