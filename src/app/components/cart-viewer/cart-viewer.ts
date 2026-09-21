import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CartService } from '../../service/cart';
import { Product } from '../../service/product';
import { ShippingService } from '../../service/shipping';
import { ShippingMethod, Timezones } from '../../service/shipping-data';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart-viewer',
  imports: [CommonModule],
  templateUrl: './cart-viewer.html',
  styleUrl: './cart-viewer.scss'
})
export class CartViewer {
  protected readonly shippingService = inject(ShippingService);
  protected readonly productService = inject(Product);
  protected readonly cartService = inject(CartService);

  readonly shippingMethods = this.shippingService.shippingMethods.value;
  readonly cartItems = toSignal(this.cartService.productsPlusQuantity, { initialValue: [] });

  addToCart(id: string) {
    this.cartService.addItemToCart(id);
  }

  updateShippingMethod(method: ShippingMethod) {
    this.shippingService.shippingMethod.set(method);
  }

  changeShippingOptions(timezone: Timezones) {
    this.shippingService.updateShippingMethodIndex(timezone);
  }
}
