import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefundAndCancellationPolicyComponent } from './refund-and-cancellation-policy.component';

describe('RefundAndCancellationPolicyComponent', () => {
  let component: RefundAndCancellationPolicyComponent;
  let fixture: ComponentFixture<RefundAndCancellationPolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RefundAndCancellationPolicyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RefundAndCancellationPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
