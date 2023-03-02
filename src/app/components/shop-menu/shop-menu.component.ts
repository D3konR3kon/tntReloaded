import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../product';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ShopService } from 'src/app/services/shop.service';
import { Shop } from 'src/app/shop';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-shop-menu',
  templateUrl: './shop-menu.component.html',
  styleUrls: ['./shop-menu.component.css']
})

export class ShopMenuComponent {

  isLoggedIn = false
  username?: ""
  public totalItems :any
  products: Product[] = []
  currentProduct= {}
  currentIndex = -1
  name=""
  currentShop :Shop ={
  }
  constructor( private shopService:ShopService, 
               private productService: ProductService, 
               private route: ActivatedRoute, 
               private cartService: CartService,
               private tokenStorage : TokenService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorage.getToken()
    if(this.isLoggedIn){
      const user = this.tokenStorage.getUser()
      this.username = user.username
    }
    this.getAll()
    this.totalItems = this.cartService.getItems()
    this.totalItems.length
    this.getShop(this.route.snapshot.params['id'])
  }
  addToCart(product: Product) {

    this.cartService.addToCart(product);
    
  }

  getAll(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.productService.getAllProducts(id).subscribe({
      next: data => {
        this.products = data
        console.log(data)
      },
      error: e => console.error(e)
    })
  }
  searchName(): void {
    this.currentProduct = {};
    this.currentIndex = -1;

    this.productService.findByTitle(this.name)
      .subscribe({
        next: (data) => {
          this.products = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
  getShop(id: string): void {
    this.shopService.get(id)
      .subscribe({
        next: (data) => {
          this.currentShop = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  logout(): void{
    this.tokenStorage.signOut()
    window.location.reload()
  }
}