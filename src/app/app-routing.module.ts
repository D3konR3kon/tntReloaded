import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ErrorComponent } from './components/error/error.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { ItemdetailComponent } from './components/itemdetail/itemdetail.component';
import { NavComponent } from './components/nav/nav.component';
import { ProductlistComponent } from './components/productlist/productlist.component';
import { RegisterComponent } from './components/register/register.component';
import { ShopMenuComponent } from './components/shop-menu/shop-menu.component';
import { SigninComponent } from './components/signin/signin.component';
import { ThankyouComponent } from './components/thankyou/thankyou.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  { path: 'shop-menu/:id', component: ShopMenuComponent },
  { path: 'dashboard/:id', component: DashboardComponent },
  { path: 'productlist', component: ProductlistComponent },
  { path: 'error', component: ErrorComponent },
  { path: 'footer', component: FooterComponent },
  { path: 'itemdetail', component: ItemdetailComponent },
  { path: 'nav', component: NavComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'cart', component: CartComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'checkout', component: CheckoutComponent},
  { path: 'thankyou', component: ThankyouComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
