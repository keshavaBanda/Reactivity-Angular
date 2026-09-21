import { Routes } from '@angular/router';
import { CartViewer } from './components/cart-viewer/cart-viewer';
import { DetailView } from './components/detail-view/detail-view';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'cart',
    pathMatch: 'full'
  },
  {
    path: 'cart',
    component: CartViewer 
  },
  {
    path: 'details',
    component: DetailView
  }
];
