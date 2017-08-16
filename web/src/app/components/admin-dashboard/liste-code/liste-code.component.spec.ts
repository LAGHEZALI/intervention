import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeCodeComponent } from './liste-code.component';

describe('ListeCodeComponent', () => {
  let component: ListeCodeComponent;
  let fixture: ComponentFixture<ListeCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
