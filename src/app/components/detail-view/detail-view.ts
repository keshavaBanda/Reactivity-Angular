import { rxResource } from '@angular/core/rxjs-interop';
import { ITEMS } from '../../service/product-data';
import { CartService } from './../../service/cart';
import {
  Component,
  inject,
  Input,
  signal,
  WritableSignal
} from '@angular/core';

@Component({
  selector: 'app-detail-view',
  imports: [],
  templateUrl: './detail-view.html',
  styleUrl: './detail-view.scss'
})
export class DetailView {
  @Input()
  set productId(value: string) {
    this.id.set(value);
  }

  readonly id: WritableSignal<string> = signal<string>('');
  protected readonly cartService = inject(CartService);
  protected readonly selectedProduct = rxResource({
    params: () => ({ id: this.id() }),
    stream: ({ params }) => this.cartService.getProductById(params.id),
  });



  // TODO: use RxResource to make this reactive
  // toSignal(this.cartService.getProductById(this.id()));



  addToCart(id: string) {
    this.cartService.addItemToCart(id);
  }
}
