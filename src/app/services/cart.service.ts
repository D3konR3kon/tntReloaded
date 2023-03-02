import { Injectable } from '@angular/core';
import { Product } from '../product';

@Injectable({
  providedIn: 'root'
})

export class CartService {
  quant: number = 0;
  items: Product[] = [];
  totalAmount = 0;
  orderItems = "";
  constructor() { }
  addToCart(product: Product) {
      
   const productExistInCart = this.items.find(({name}) => name === product.name); // find product by name
   if (!productExistInCart) {
   this.items.push({...product}); // enhance "porduct" opject with "num" property
   this.items.length;
   return;
  }
  productExistInCart.qty! += 1;
  
  this.quant++;
  console.log(this.quant);
  
  }

  getItems(): Product[] {
    return this.items;
  }
}