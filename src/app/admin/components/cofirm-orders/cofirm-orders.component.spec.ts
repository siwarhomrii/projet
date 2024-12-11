import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CofirmOrdersComponent } from './cofirm-orders.component';

describe('CofirmOrdersComponent', () => {
  let component: CofirmOrdersComponent;
  let fixture: ComponentFixture<CofirmOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CofirmOrdersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CofirmOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
