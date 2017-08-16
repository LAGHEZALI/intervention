import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionSystemesComponent } from './gestion-systemes.component';

describe('GestionSystemesComponent', () => {
  let component: GestionSystemesComponent;
  let fixture: ComponentFixture<GestionSystemesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionSystemesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionSystemesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
