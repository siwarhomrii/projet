import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SweetListComponent } from './sweet-list.component';

describe('SweetListComponent', () => {
  let component: SweetListComponent;
  let fixture: ComponentFixture<SweetListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SweetListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SweetListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
