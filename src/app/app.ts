import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal, computed, effect, linkedSignal, WritableSignal, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ShippingService } from './service/shipping';
import { Timezones } from './service/shipping-data';

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
  public shippingService = inject(ShippingService)

  readonly shippingMethods = toSignal(this.shippingService.getShippingMethods(), {
    initialValue: []
  });
  protected shippingMethod = linkedSignal<ShippingMethod[], ShippingMethod>({
    source: this.shippingMethods,
    computation: (newOptions, previous) => {
      console.log("I am Resetting every time if my derived signal changes");
      const selected = newOptions.find((opt) => opt.name === previous?.value?.name)
      if (selected && previous?.value.price !== selected.price) {
        selected.hasPriceChanged = true;
      }
      return selected ?? newOptions[0];
    }
  });

  protected shippedMethod2 = linkedSignal<any, any>({
    source: this.shippingMethod,
    computation: (newOptions, previous) => {
      return newOptions[0]
    }
  })

  protected quantity = signal<number>(1);

  protected item = {
    name: 'Super Cool Item',
    price: 19.99
  };

  protected itemTotal = computed(() => +(this.quantity() * this.item.price).toFixed(2))
  protected subtotal = computed(() => this.itemTotal());
  protected tax = computed(() => +(this.subtotal() * 0.07).toFixed(2));
  protected shipping = computed(() => this.shippingMethod()?.price || 0);
  protected total = computed(() => +(this.subtotal() + this.tax() + this.shipping()).toFixed(2));


  constructor() {
    effect(() => {
      console.log("Count is ", this.quantity());
    })
  }

  addToCart() {
    this.quantity.update((prev) => prev + 1);
  }

  updateShippingMethod(method: ShippingMethod) {
    this.shippingMethod.set({
      ...method,
      hasPriceChanged: false
    });
  }

  changeShippingOptions(timezone: Timezones) {
    this.shippingService.updateShippingMethodIndex(timezone)
  }
}
