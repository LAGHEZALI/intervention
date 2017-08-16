import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerationCodeComponent } from './generation-code.component';

describe('GenerationCodeComponent', () => {
  let component: GenerationCodeComponent;
  let fixture: ComponentFixture<GenerationCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerationCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerationCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
