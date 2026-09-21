import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartViewer } from './cart-viewer';

describe('CartViewer', () => {
  let component: CartViewer;
  let fixture: ComponentFixture<CartViewer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartViewer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartViewer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
