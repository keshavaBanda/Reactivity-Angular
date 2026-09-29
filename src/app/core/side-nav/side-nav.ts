import { Component, inject } from '@angular/core';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { Product } from '../../service/product';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  imports: [RouterModule],
  templateUrl: './side-nav.html',
  styleUrl: './side-nav.scss'
})
export class SideNav {
  protected readonly productService = inject(Product);
  readonly products = toSignal(this.productService.getProducts(), { initialValue: [] });

  // productData = toObservable(this.products);

  // ngOnInit(){
  //   this.getProductData();
  // }

  // getProductData(){
  //   this.productData.subscribe({
  //     next: (data)=> console.log(data),
  //     error: (err)=> console.log(err)
  //   })
  // }


}
