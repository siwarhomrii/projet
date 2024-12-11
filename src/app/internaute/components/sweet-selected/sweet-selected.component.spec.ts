import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SweetSelectedComponent } from './sweet-selected.component';
describe('SweetSelectedComponent', () => {
  let component: SweetSelectedComponent;
  let fixture: ComponentFixture<SweetSelectedComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SweetSelectedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SweetSelectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
