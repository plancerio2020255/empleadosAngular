import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaPrincipallComponent } from './pagina-principall.component';

describe('PaginaPrincipallComponent', () => {
  let component: PaginaPrincipallComponent;
  let fixture: ComponentFixture<PaginaPrincipallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginaPrincipallComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaPrincipallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
