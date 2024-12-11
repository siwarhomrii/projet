import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SweetItemComponent } from './sweet-item.component';

describe('SweetItemComponent', () => {
  let component: SweetItemComponent;
  let fixture: ComponentFixture<SweetItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SweetItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SweetItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
