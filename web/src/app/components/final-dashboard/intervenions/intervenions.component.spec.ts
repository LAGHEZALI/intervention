import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntervenionsComponent } from './intervenions.component';

describe('IntervenionsComponent', () => {
  let component: IntervenionsComponent;
  let fixture: ComponentFixture<IntervenionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntervenionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntervenionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
