import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingDelevaryComponent } from './shipping-delevary.component';

describe('ShippingDelevaryComponent', () => {
  let component: ShippingDelevaryComponent;
  let fixture: ComponentFixture<ShippingDelevaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShippingDelevaryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShippingDelevaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
