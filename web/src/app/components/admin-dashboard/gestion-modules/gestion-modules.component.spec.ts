import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionModulesComponent } from './gestion-modules.component';

describe('GestionModulesComponent', () => {
  let component: GestionModulesComponent;
  let fixture: ComponentFixture<GestionModulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionModulesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionModulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
