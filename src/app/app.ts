import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal, computed, effect, linkedSignal, WritableSignal, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ShippingService } from './service/shipping';
import { Timezones } from './service/shipping-data';
import { CartService } from './service/cart';
import { Product } from './service/product';

interface ShippingMethod {
  name: string;
  price: number;
  hasPriceChanged?: boolean
}

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [CurrencyPipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {
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
