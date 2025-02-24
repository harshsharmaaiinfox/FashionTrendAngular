import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnExchangeComponent } from './return-exchange.component';

describe('ReturnExchangeComponent', () => {
  let component: ReturnExchangeComponent;
  let fixture: ComponentFixture<ReturnExchangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReturnExchangeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReturnExchangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
