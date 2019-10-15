import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IqComponent } from './iq.component';

describe('IqComponent', () => {
  let component: IqComponent;
  let fixture: ComponentFixture<IqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
